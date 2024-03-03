class Restaurant:
    def __init__(self, id=None, name=None, city=None, cuisine=None, dietary_restrictions=None,
                 price=None, ratings=None, link=None):
        self.id = id
        self.name = name
        self.city = city
        self.cuisine = cuisine
        self.dietary_restrictions = dietary_restrictions
        self.price = price
        self.ratings = ratings
        self.link = link

    def get_id(self):
        return self.id

    def get_name(self):
        return self.name

    def get_city(self):
        return self.city

    def get_cuisine(self):
        return self.cuisine

    def get_dietary_restrictions(self):
        return self.dietary_restrictions

    def get_price(self):
        return self.price

    def get_ratings(self):
        return self.ratings

    def get_link(self):
        return self.link