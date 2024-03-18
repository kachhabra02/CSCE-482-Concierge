# import os
# from sqlalchemy import create_engine, text
# from Restaurant import Restaurant

# db_connection_string = os.environ['DB_CONNECT_STRING']

# engine = create_engine(db_connection_string, connect_args={})

# def load_jobs_from_db(specific_name='Pizza Hut', specific_city='City1', specific_cuisine='Pizza', specific_dietary_restrictions='None', max_price=1000, min_rating=0):
#   with engine.connect() as conn:
#     sql_query = text(f"""
#       SELECT *
#       FROM Restaurants
#       WHERE Name = :name
#         AND City = :city
#         AND Cuisine = :cuisine
#         AND DietaryRestrictions = :dietary_restrictions
#         AND Price <= :max_price
#         AND Ratings >= :min_rating
#     """)
#     result = conn.execute(sql_query, {
#       'name': specific_name,
#       'city': specific_city,
#       'cuisine': specific_cuisine,
#       'dietary_restrictions': specific_dietary_restrictions,
#       'max_price': max_price,
#       'min_rating': min_rating
#     })
#     # result = conn.execute(text("select * from Restaurants;"))
#     restaurants = []
#     for row in result.all():
#       [id, Name, City, Cuisine, DietaryRestrictions, Price, Ratings, Link] = row
#       restaurant = Restaurant(
#         id=id,
#         name=Name,
#         city=City,
#         cuisine=Cuisine,
#         dietary_restrictions=DietaryRestrictions,
#         price=Price,
#         ratings=Ratings,
#         link=Link
#       )
#       restaurants.append(restaurant)
#     return restaurants


import os
from sqlalchemy import create_engine, text
from Restaurant import Restaurant

db_connection_string = os.environ['DB_CONNECT_STRING']

engine = create_engine(db_connection_string, connect_args={})

def get_restaurants(
        name='',
        city='',
        cuisine='',
        dietary_restrictions='',
        max_price=1000,
        min_rating=0):
  with engine.connect() as conn:
    sql_query = """
      SELECT *
      FROM Restaurants
    """

    conditions = []
    if name:
      conditions.append("Name = :name")
    if city:
      conditions.append("City = :city")
    if cuisine:
      conditions.append("Cuisine = :cuisine")
    if dietary_restrictions:
      conditions.append("DietaryRestrictions = :dietary_restrictions")

    conditions.extend([
      "Price <= :max_price",
      "Ratings >= :min_rating"
    ])

    sql_query += " WHERE " + " AND ".join(conditions)

    result = conn.execute(text(sql_query), {
      'name': name,
      'city': city,
      'cuisine': cuisine,
      'dietary_restrictions': dietary_restrictions,
      'max_price': max_price,
      'min_rating': min_rating
    })

    restaurants = []
    for row in result.all():
      [id, name, city, cuisine, dietary_restrictions, price, ratings, link] = row
      restaurant = Restaurant(
        id=id,
        name=name,
        city=city,
        cuisine=cuisine,
        dietary_restrictions=dietary_restrictions,
        price=price,
        ratings=ratings,
        link=link
      )
      restaurants.append(restaurant)
    
    return restaurants
