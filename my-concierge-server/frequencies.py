import json
from collections import defaultdict

# Load JSON data
with open('restaurants.json', 'r') as file:
    data = json.load(file)

# Dictionary to store all attributes and their frequencies
all_attributes_freq = defaultdict(int)

# Function to extract all attributes and update frequencies
def extract_all_attributes(business):
    for key, value in business.items():
        if isinstance(value, dict):
            extract_all_attributes(value)
        elif isinstance(value, list):
            for item in value:
                if isinstance(item, dict):
                    extract_all_attributes(item)
        else:
            all_attributes_freq[key] += 1

# Loop through each business
for business in data["businesses"]:
    extract_all_attributes(business)

# Display all attributes and their frequencies
print("All Attributes and Frequencies:")
for attribute, frequency in all_attributes_freq.items():
    print(f"{attribute}: {frequency}")
