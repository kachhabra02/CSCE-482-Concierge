import database
import numpy as np

# Constants
num_recommendations = 15

# Recommendations Function
def getRecommendations(location, user_preference_vector):
    # Get Restaurants in City
    restaurants = database.getRestaurants(location)

    # Get Categories and Attributes
    categories = database.getCategories()
    # print(categories)
    num_cat = len(categories)
    attributes = database.getAttributes()
    # print(attributes)
    num_att = len(attributes)

    # Construct Restaurant Category Matrix
    cat_arrs = [[1 if digit == '1' else 0 for digit in bin(restaurant['category_sum'])[2:].zfill(num_cat)] for restaurant in restaurants]
    cat_mat = np.array(cat_arrs)
    # print(cat_mat.shape)

    
    # Optional: Update UPV based on category relationships

    # Perform Product to Get Restaurant Scores
    user_preference_vector = np.array(user_preference_vector[::-1])
    # print(user_preference_vector.shape)
    scores = np.dot(cat_mat, user_preference_vector)

    # Order Restaurants by Score (Descending)
    randomizer = np.random.random(scores.size)
    order = np.lexsort((randomizer, scores))[::-1]
    order = order[:num_recommendations]
    # scores = scores[order]    # Don't need actual scores (for now, at least)

    # Retrieve Recommendations
    recommendations = []
    for rank in range(order.size):
        # Get Restaurant
        recommendation = restaurants[order[rank]]
        recommendation['rank'] = rank

        if recommendation['num_images'] <= 0:
            for restaurant in restaurants:
                if restaurant['name'] == recommendation['name'] and restaurant['num_images'] > 0:
                    recommendation['base_image_url'] = restaurant['base_image_url']
                    recommendation['num_images'] = restaurant['num_images']

        # print(recommendation['num_images'])

        # Extract Categories
        # print(recommendation['category_sum'])
        recommendation['categories'] = [categories[i] for i, digit in enumerate(bin(recommendation['category_sum'])[2:].zfill(num_cat)) if digit == '1']
        # print(recommendation['categories'])
        del recommendation['category_sum']

        # Extract Categories
        # print(recommendation['attribute_sum'])
        recommendation['attributes'] = [attributes[i] for i, digit in enumerate(bin(recommendation['attribute_sum'])[2:].zfill(num_att)) if digit == '1']
        # print(recommendation['attributes'])e
        del recommendation['attribute_sum']

        recommendations.append(recommendation)

    return recommendations

if __name__ == '__main__':
    recs = getRecommendations('Tampa', [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    # print(recs)