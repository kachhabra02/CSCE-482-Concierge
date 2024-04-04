use myconcierge_v2;

DROP TABLE IF EXISTS Categories;
CREATE TABLE Categories (
	category_id TINYINT UNSIGNED,
    category_name VARCHAR(255),
    PRIMARY KEY (category_id)
);
LOAD DATA LOCAL INFILE 'C:\\Users\\alex0\\Documents\\Spring2024\\CSCE482\\YelpDataset\\Categories.csv' 
	INTO TABLE Categories
	FIELDS TERMINATED BY ';' 
	ENCLOSED BY '"' LINES TERMINATED BY '\n'
	IGNORE 1 ROWS;

DROP TABLE IF EXISTS Attributes;
CREATE TABLE Attributes (
	attribute_id TINYINT UNSIGNED,
    attribute_name VARCHAR(255),
    PRIMARY KEY (attribute_id)
);
LOAD DATA LOCAL INFILE 'C:\\Users\\alex0\\Documents\\Spring2024\\CSCE482\\YelpDataset\\Attributes.csv' 
	INTO TABLE Attributes
	FIELDS TERMINATED BY ';' 
	ENCLOSED BY '"' LINES TERMINATED BY '\n'
	IGNORE 1 ROWS;

DROP TABLE IF EXISTS Restaurants;
CREATE TABLE Restaurants (
	id INT UNSIGNED,
    restaurant_name VARCHAR(255),
    address VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(255),
    zip_code VARCHAR(255),
    metro_area VARCHAR(255),
    latitude DECIMAL(10, 7),
    longitude DECIMAL(10, 7),
    stars DECIMAL(2, 1),
    num_reviews INT UNSIGNED,
    category_sum BIGINT UNSIGNED,
    attribute_sum TINYINT UNSIGNED,
    hours JSON,
    base_image_url VARCHAR(255),
    num_images SMALLINT UNSIGNED,
    yelp_url VARCHAR(255),
    phone VARCHAR(255),
    PRIMARY KEY (id)
);
LOAD DATA LOCAL INFILE 'C:\\Users\\alex0\\Documents\\Spring2024\\CSCE482\\YelpDataset\\Restaurants.csv' 
	INTO TABLE Restaurants
	FIELDS TERMINATED BY ';' 
	ENCLOSED BY '"' LINES TERMINATED BY '\n'
	IGNORE 1 ROWS;