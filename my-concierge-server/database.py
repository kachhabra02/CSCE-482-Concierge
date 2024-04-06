import os
from sqlalchemy import create_engine, text
from Restaurant import Restaurant

db_connection_string = "mysql+pymysql://admin:arpankumar@my-concierge-db.cpm2kguqmqy7.us-east-1.rds.amazonaws.com:3306/myconcierge_v2"

engine = create_engine(db_connection_string, connect_args={})

def getCategories():
  with engine.connect() as conn:
    sql_query = """
      SELECT *
      FROM Categories
      ORDER BY category_id ASC;
    """
    result = conn.execute(text(sql_query))
    output = []
    for row in result.all():
      output.append(row[1])
    return output

def getAttributes():
  with engine.connect() as conn:
    sql_query = """
      SELECT *
      FROM Attributes
      ORDER BY attribute_id ASC;
    """
    result = conn.execute(text(sql_query))
    output = []
    for row in result.all():
      output.append(row[1])
    return output

def getRestaurants(metro_area):
  with engine.connect() as conn:
    sql_query = """
      SELECT *
      FROM Restaurants
    """
    sql_query += f'WHERE metro_area="{metro_area}";'
    result = conn.execute(text(sql_query))
    output = []
    for row in result.all():
      restaurant = {
        "name": row[1],
        "address": row[2],
        "city": row[6],
        "state": row[4],
        "zip_code": row[5],
        "metro_area": row[3],
        "latitude": float(row[7]),
        "longitude": float(row[8]),
        "stars": float(row[9]),
        "num_reviews": row[10],
        "attribute_sum": row[12],
        "category_sum": row[11],
        "hours": row[13],
        "base_image_url": row[14],
        "num_images": row[15],
        "yelp_url": None if row[16] == '' else row[16],
        "phone": None if row[17] == '' else row[17]
      }
      output.append(restaurant)
    return output
