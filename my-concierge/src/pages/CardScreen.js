import React, { useEffect, useState, useRef } from "react";
import Carousel from 'react-multi-carousel';
import RestCard from '../components/RestCard';
import ShoppingCart from "../components/ShoppingCart";
import 'react-multi-carousel/lib/styles.css';
import '../css/CardScreenCss.css';

function CardScreen() {//Get Business Data and FavItems, SetfavItems, Index of Scroll from MapScreen


  const [favItems, setFavItems] = useState([]);
  const [showShoppingCart, setShowShoppingCart] = useState(false);

  const carouselRef = useRef(null); // Reference for the carousel component

  const businessData = [
    {
      "business_id": "tnhfDv5Il8EaGSXZGiuQGg",
      "name": "Garaje",
      "address": "475 3rd St",
      "city": "San Francisco",
      "state": "CA",
      "postal_code": "94107",
      "latitude": 37.7817529521,
      "longitude": -122.39612197,
      "stars": 4.5,
      "review_count": 1198,
      "is_open": 1,
      "attributes": {
        "RestaurantsTakeOut": true,
        "BusinessParking": {
          "garage": false,
          "street": true,
          "validated": false,
          "lot": false,
          "valet": false
        }
      },
      "categories": [
        "Mexican",
        "Burgers",
        "Gastropubs",
        "Vegan",
        "Other"
      ],
      "hours": {
        "Monday": "10:00-21:00",
        "Tuesday": "10:00-21:00",
        "Friday": "10:00-21:00",
        "Wednesday": "10:00-21:00",
        "Thursday": "10:00-21:00",
        "Sunday": "11:00-18:00",
        "Saturday": "10:00-21:00"
      }
    },
    {
      "business_id": "tnhfDv5Il8EaGSXZGiuQGg",
      "name": "Garaje2",
      "address": "475 3rd St",
      "city": "San Francisco",
      "state": "CA",
      "postal_code": "94107",
      "latitude": 37.7817529521,
      "longitude": -122.39612197,
      "stars": 4.5,
      "review_count": 1198,
      "is_open": 1,
      "attributes": {
        "RestaurantsTakeOut": true,
        "BusinessParking": {
          "garage": false,
          "street": true,
          "validated": false,
          "lot": false,
          "valet": false
        }
      },
      "categories": [
        "Mexican",
        "Burgers",
        "Gastropubs",
        "Vegan",
        "Other"
      ],
    },
    {
      "business_id": "tnhfDv5Il8EaGSXZGiuQGg",
      "name": "Garaje3",
      "address": "475 3rd St",
      "city": "San Francisco",
      "state": "CA",
      "postal_code": "94107",
      "latitude": 37.7817529521,
      "longitude": -122.39612197,
      "stars": 4.5,
      "review_count": 1198,
      "is_open": 1,
      "attributes": {
        "RestaurantsTakeOut": true,
        "BusinessParking": {
          "garage": false,
          "street": true,
          "validated": false,
          "lot": false,
          "valet": false
        }
      },
      "categories": [
        "Mexican",
        "Burgers",
        "Gastropubs",
        "Vegan",
        "Other"
      ],
      "hours": {
        "Monday": "10:00-21:00",
        "Tuesday": "10:00-21:00",
        "Friday": "10:00-21:00",
        "Wednesday": "10:00-21:00",
        "Thursday": "10:00-21:00",
        "Sunday": "11:00-18:00",
        "Saturday": "10:00-21:00"
      }
    }

];

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  useEffect(() => console.log(favItems), [favItems])
  const address = businessData[0].address + ", " + businessData[0].city + ", " + businessData[0].state + ", " + businessData[0].postal_code ;

  const renderButtonGroupOutside = ({ totalItems, currentSlide, ...props }) => (
    <ul className="custom-dots">
      {Array.from({ length: totalItems }).map((_, index) => (
        <li key={index}>
          <button className={index === currentSlide ? "active" : ""} {...props}></button>
        </li>
      ))}
    </ul>
  );

  // Function to handle scrolling to a specific slide
  const scrollToSlide = (index) => { // In CardScreen, get Index from MapScreen and Scroll here 
    carouselRef.current.goToSlide(index);
  };

  // Function to find the index of an item by its name
  const findItemIndexByName = (name) => { // Define in MapScreen Later
    return businessData.findIndex(business => business.name === name);
  };

  // Click event handler for buttons
  const handleButtonClick = (name) => { // Define in MapScreen Later
    const index = findItemIndexByName(name);
    if (index !== -1) {
      scrollToSlide(index);
    }
  };

  return (
    <div>
      <div>
        {favItems.length > 0 && (
          <div className="button-container">
            <div className="position-fixed" style={{zIndex: 99}}>
              <button
                className="button-effect"
                onClick={() => setShowShoppingCart(true)}
              >
                <span>Shopping Cart - {favItems.length}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <h1>Items:</h1>

      {businessData.map((business, index) => (
        <button key={index} onClick={() => handleButtonClick(business.name)}>{business.name}</button>
      ))}
        
      <Carousel 
        ref={carouselRef} // Set the ref for the carousel
        responsive={responsive} 
        showDots={true} 
        renderDotsOutside={renderButtonGroupOutside} 
        removeArrowOnDeviceType={["tablet", "mobile"]}
      >
        {businessData.map((business, index) => (
          <div key={index}>
          <RestCard
            name={business.name || "No Name"}
            stars={business.stars || 0}
            reviews={business.review_count >= 1000 ? "1k+" : (business.review_count || 0)}
            cusines={business.categories || []}
            address={address || "No Address"}
            hours={business.hours || {}}
            favItems={favItems || []}
            setFavItems={setFavItems || (() => {})}
          />
        </div>
        ))}
        <div>Item 4</div>
      </Carousel>

      {showShoppingCart && (
        <ShoppingCart
          favItems={favItems}
          setFavItems={setFavItems}
          setShowModal={setShowShoppingCart}
        />
      )}
    </div>
  )
}

export default CardScreen;
