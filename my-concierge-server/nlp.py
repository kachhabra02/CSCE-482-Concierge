from openai import OpenAI
import os
from dotenv import load_dotenv
import time
import json
import random

load_dotenv()

client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

vector_items = 'American, Fast Food, Italian, Breakfast and Brunch, Mexican, Dessert, Cafe, Seafood, Chinese, Asian, Healthy Eating, Japanese, Mediterranean, Vegetarian and Vegan, Thai, Latin American, Vietnamese, Gluten-Free, South Asian, Middle Eastern, Korean, Local Flavor, French, Halal, Irish, African, German, European, Kosher, Price Level, Good for Groups, Good for Kids' 

example_json = '{"American": "<score>", "Fast Food": "<score>", "Italian": "<score>", "Breakfast and Brunch": "<score>", "Mexican": "<score>", "Dessert": "<score>", "Cafe": "<score>", "Seafood": "<score>", "Chinese": "<score>", "Asian": "<score>", "Healthy Eating": "<score>", "Japanese": "<score>", "Mediterranean": "<score>", "Vegetarian and Vegan": "<score>", "Thai": "<score>", "Latin American": "<score>", "Vietnamese": "<score>", "Gluten-Free": "<score>", "South Asian": "<score>", "Middle Eastern": "<score>", "Korean": "<score>", "Local Flavor": "<score>", "French": "<score>", "Halal": "<score>", "Irish": "<score>", "African": "<score>", "German": "<score>", "European": "<score>", "Kosher": "<score>", "Price Level": "<score>", "Good for Groups": "<score>", "Good for Kids": "<score>"}'

price_level_map = {
    0: [0, 0, 0, 0],
    1: [1, 0, 0, 0],
    2: [0, 1, 0, 0],
    3: [0, 0, 1, 0],
    4: [0, 0, 0, 1],
    5: [0, 0, 0, 1]
}

chat_response_templates = json.load(open('response_templates.json'))

def getChatResponse(vector_int_scores):
    max_liking = max(vector_int_scores)
    if (max_liking == 0):
        return "Hmmm. I'm sorry, but I don't think I quite understood what you asked for. Could you try rephrasing it?"

    max_liking_idx = random.choice([i for i in range(len(vector_int_scores)) if vector_int_scores[i] == max_liking])
    possible_templates = chat_response_templates[str(max_liking_idx)]
    return random.choice(possible_templates)

def getUserPreferenceVector(user_prompt, prev_vector):
    time_before_call = time.perf_counter()
    expanded = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You provide a maximum of two sentences as a response that expands upon the prompt to provide more insight into the desired cuisine. Provide details on the origin of the cuisine and other similar cuisines if possible."},
            {"role": "user", "content": user_prompt}
        ]
    )
    print(expanded.choices[0].message.content)
    completion = client.chat.completions.create(
      model="gpt-3.5-turbo",
      messages=[
            {"role": "system", "content": "You analyze text provided by a group of people to populate a json object which will indicate how much the group wants the different items in the json object. Each entry in the json object will have a score for that particular item; the integers will only range from 0 to 5 (0 is the default). When assigning these scores take into account how many people like something; the more people that like it, the higher the score should be. Also use the wording to adjust the score; for example, 'I love Korean food' should get a higher score than 'I like Korean food'. You should also update similar cuisines/items. For example, if the group likes Japanese and Korean you should also increase the Asian score since it is related. However, you should only update things that are very similar. The json object shows how much the group likes each cuisine/item. Here is the json object that should populate by replacing the <score> tags with your score: " + example_json + ". Keep in mind that South Asian includes Indian food. For the Price Level, 0 is if you did not find price info, 1 is really cheap, 2 is cheap, 3 is moderate, and 4-5 is expensive. The 'Good for Groups' should be a 0 or a 1; 0 means that you think the number of people is less than 4, and a 1 if you think there are more than 4. The 'Good for Kids' should also be a 0 or a 1. You shouldn't always associate fast food with American cuisine, rather you should score fast food based on desired speed; for example, if they mention 'sit-down', 'sit down', 'slow', etc. the fast food score should be 0. I want you to return the json object after modifying the values. You should strictly follow the json format provided and populate every field with at least a 0."},
        {"role": "user", "content": user_prompt + '.' + expanded.choices[0].message.content}
      ]
    )
    time_after_call = time.perf_counter()

    total_time = time_after_call - time_before_call

    vector_items_list = vector_items.split(", ")
    vector_int_scores = [0 for i in range(len(vector_items_list))]

    print('GPT API took {}\n\n'.format(total_time))
    print(completion.choices[0].message.content)

    json_obj = json.loads(completion.choices[0].message.content)
    for idx, item in enumerate(vector_items_list):
        score = int(json_obj[item])
        vector_int_scores[idx] = score

    # Split Price Level into 4 different levels (Price Level $, Price Level $$, Price Level $$$, Price Level $$$$)
    price_level_ind = vector_items_list.index('Price Level')
    vector_int_scores = vector_int_scores[:price_level_ind] + price_level_map.get(vector_int_scores[price_level_ind], [0, 0, 0, 0]) + vector_int_scores[(price_level_ind + 1):]

    # Get chat response
    chat_response = getChatResponse(vector_int_scores)

    for idx, val in enumerate(prev_vector):
        vector_int_scores[idx] = max(vector_int_scores[idx], val)

    return vector_int_scores, chat_response

if __name__ == "__main__":
    user_vector = [0 for i in range(32)]
    while(True):
        user_text = input('Enter prompt: ')

        vec = getUserPreferenceVector(user_text, user_vector) 
        print(vec)

    


