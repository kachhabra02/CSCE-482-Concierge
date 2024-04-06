import database

# Recommendations Function
def getRecommendations(location, user_preference_vector):
    # Get Restaurants in City
    restaurants = database.getRestaurants(location)

    # Construct Restaurant Category Matrix
        # Convert Restaurant Category Sum Into Array of {0,1}
        # Merge Arrays Into Matrix in Order of Restaurant List
    
    # Optional: Update UPV based on category relationships

    # Perform Product to Get Restaurant Scores

    # Order Restaurants by Score (desc)

    return "Taco Bell"