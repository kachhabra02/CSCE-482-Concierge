import json

class Restaurant:
    def __init__(self, name=None, category1=None, category2=None, category3=None, image_url=None,
                 review_count=None, rating=None, latitude=None, longitude=None,
                 address1=None, address2=None, address3=None, city=None, zipcode=None,
                 country=None, state=None, phone=None, display_phone=None):
        self.name = name
        self.category1 = category1
        self.category2 = category2
        self.category3 = category3
        self.image_url = image_url
        self.review_count = review_count
        self.rating = rating
        self.latitude = latitude
        self.longitude = longitude
        self.address1 = address1
        self.address2 = address2
        self.address3 = address3
        self.city = city
        self.zipcode = zipcode
        self.country = country
        self.state = state
        self.phone = phone
        self.display_phone = display_phone

# Load JSON data from file
with open('restaurants.json') as f:
    data = json.load(f)

restaurants = []

# Iterate through each business entry
for business in data['businesses']:
    # Extract relevant attributes
    categories = [category['title'] for category in business['categories']]
    category1 = categories[0] if len(categories) >= 1 else None
    category2 = categories[1] if len(categories) >= 2 else None
    category3 = categories[2] if len(categories) >= 3 else None

    restaurant = Restaurant(
        name=business['name'],
        category1=category1,
        category2=category2,
        category3=category3,
        image_url=business['image_url'],
        review_count=business['review_count'],
        rating=business['rating'],
        latitude=business['coordinates']['latitude'],
        longitude=business['coordinates']['longitude'],
        address1=business['location']['address1'],
        address2=business['location']['address2'],
        address3=business['location']['address3'],
        city=business['location']['city'],
        zipcode=business['location']['zip_code'],
        country=business['location']['country'],
        state=business['location']['state'],
        phone=business['phone'],
        display_phone=business['display_phone']
    )
    
    restaurants.append(restaurant)

# Now, restaurants list contains instances of Restaurant objects.
