from openai import OpenAI
import os
from dotenv import load_dotenv
import time

load_dotenv()

client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

#Genre-Vector: <Provide a rating for each item in the genres list using the scheme described in the ratings list. Do not provide the genre name, and prioritize pleasing the most people>

template = """
Anything between <> should be a comma separated list in the format genre-count where count is number of appearances in the text
If for you can't find anything, put N/A
bonus list: take-out, kid-friendly, romantic, light-atmosphere
food genre list: American, Chinese, Cuban, Greek, Indian, Italian, Japanese, Korean, Mexican, Thai, Vietnamese
ratings: won't eat: -3, hate: -2, dislike: -1, default: 0, like: 1, love: 2, must eat: 3 
Likes: <liked genres selected from the genres list only>
Dislikes: <disliked genres selected from the genres list only>
Genre-Vector: (provide an integer rating for how well each of the food genres in the food genre list fit the group ranging from -5 to 5 with -5 being the group would hate that food and 5 being the group would love that food) 
Price: (pick one from: cheap, pricey, expensive)
Restrictions: <dietary restrictions>
Speed: (pick one from: fast, sit-down)
Other: (comma separated list of items from the provided bonus list)
"""

template_2 = """
Here are the possible cuisines that you should look for American, Chinese, Cuban, Greek, Indian, Italian, Japanese, Korean, Mexican, Thai, Vietnamese.
If you cannot find anything put N/A.

For each sentence in the text, provide the following and nothing else:
Likes: (A comma seperated list of cuisines that people liked alongside the sentiment for each cuisine in the form <cuisine-sentiment>, <cuisine-sentiment>, ...)
Dislikes: (A comma seperated list of cuisines that people did not like alongside the sentiment for each cuisine in the form <cuisine-sentiment>, <cuisine-sentiment>, ...)
"""

user_text = "I want something on the cheaper side that still fits everyone's needs. I love Korean food, but John likes Japanese food. My mom likes mexican food and Korean food. However, my dad hates Korean food, but he likes everything else. It doesn't have to be fast. It would be great if my kids like it too. We all hate Mediterranean food. I don't like Thai food."

print('Input:\n' + user_text)
print()

time_before_call = time.perf_counter()
completion = client.chat.completions.create(
  model="gpt-3.5-turbo",
  messages=[
    {"role": "system", "content": "You analyze text to populate the given template. You never provide anything outside the provided template. Here is the template: " + template_2},
    {"role": "user", "content": user_text}
  ]
)
time_after_call = time.perf_counter()

total_time = time_after_call - time_before_call

print('GPT API took {}\n\n'.format(total_time))
print(completion.choices[0].message.content)
