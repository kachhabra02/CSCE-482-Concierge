import os
import json
import requests
from Restaurant import Restaurant
from sqlalchemy import create_engine, text

# db_connection_string = os.environ['DB_CONNECT_STRING']
db_connection_string = "mysql+pymysql://admin:arpankumar@my-concierge-db.cpm2kguqmqy7.us-east-1.rds.amazonaws.com:3306/myconcierge"
engine = create_engine(db_connection_string, connect_args={})

def insert_restaurant_to_db(restaurant_obj, engine):
    """
    Insert a Restaurant object into the Restaurants table in MySQL database.

    Args:
        restaurant_obj (Restaurant): The Restaurant object to insert.
        engine (sqlalchemy.engine.base.Engine): SQLAlchemy engine for database connection.
    """
    restaurant_data = {
        'name': restaurant_obj.name,
        'category1': restaurant_obj.category1,
        'category2': restaurant_obj.category2,
        'category3': restaurant_obj.category3,
        'image_url': restaurant_obj.image_url,
        'review_count': restaurant_obj.review_count,
        'rating': restaurant_obj.rating,
        'latitude': restaurant_obj.latitude,
        'longitude': restaurant_obj.longitude,
        'address1': restaurant_obj.address1,
        'address2': restaurant_obj.address2,
        'address3': restaurant_obj.address3,
        'city': restaurant_obj.city,
        'zipcode': restaurant_obj.zipcode,
        'country': restaurant_obj.country,
        'state': restaurant_obj.state,
        'phone': restaurant_obj.phone,
        'display_phone': restaurant_obj.display_phone
    }

    insert_query = """
    INSERT INTO Restaurants (name, category1, category2, category3, image_url, review_count, rating,
                             latitude, longitude, address1, address2, address3, city, zipcode,
                             country, state, phone, display_phone)
    VALUES (:name, :category1, :category2, :category3, :image_url, :review_count, :rating,
            :latitude, :longitude, :address1, :address2, :address3, :city, :zipcode,
            :country, :state, :phone, :display_phone)
    """

    with engine.connect() as connection:
        try:
            connection.execute(text(insert_query), restaurant_data)
            connection.commit()  # Commit the transaction
            print("Restaurant inserted successfully.")
        except Exception as e:
            print(f"Error inserting restaurant: {e}")
            connection.rollback()  # Rollback the transaction in case of an error

def get_data_with_bearer_token(url):
    token = "JdPhr3RgwA4ddMZZuGk8PgocR3lbSa0-jiWXzyFbnbkUVrvtoVpzW0gq0lgZYlAnRuCBjJZA1wBnNveG2YENyYUgiPBeErIFfVHCowjTHZGTjYTAty0mF1DBYWYAZnYx"
    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    }
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Failed to fetch data. Status code: {response.status_code}")
        return None

# cities = ["Boston", "College Station", "Omaha", "Raleigh", "Seattle", "Sunnyvale", "Chicago"]
# cities = ["Sunnyvale", "Chicago"]
cities = ["Chicago"]

for city in cities:
    for offset in range(0, 1000, 50):
        url = f"https://api.yelp.com/v3/businesses/search?location={city}&limit=50&offset={offset}"
        data = get_data_with_bearer_token(url)
        
        restaurants = []
        for business in data['businesses']:
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

        for restaurant in restaurants:
            insert_restaurant_to_db(restaurant, engine)