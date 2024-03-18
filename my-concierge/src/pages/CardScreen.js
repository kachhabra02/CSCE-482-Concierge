import React, { useEffect, useState } from "react";
import Carousel from 'react-multi-carousel';
import RestCard from '../components/RestCard';
import ShoppingCart from "../components/ShoppingCart";
import 'react-multi-carousel/lib/styles.css';
import '../css/CardScreenCss.css';

function CardScreen() {

  const [favItems, setFavItems] = useState([]);
  const [showShoppingCart, setShowShoppingCart] = useState(false);

  const businessData = {
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
      "Gastropubs"
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
  };

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
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
  const address = businessData.address + ", " + businessData.city + ", " + businessData.state + ", " + businessData.postal_code ;

  const renderButtonGroupOutside = ({ totalItems, currentSlide, ...props }) => (
    <ul className="custom-dots">
      {Array.from({ length: totalItems }).map((_, index) => (
        <li key={index}>
          <button className={index === currentSlide ? "active" : ""} {...props}></button>
        </li>
      ))}
    </ul>
  );

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
        <Carousel responsive={responsive} showDots={true} renderDotsOutside={renderButtonGroupOutside} removeArrowOnDeviceType={["tablet", "mobile"]}>
          {/*Change the stars and reviews to json data*/}
          <div><RestCard name={businessData.name} stars={businessData.stars} reviews={businessData.review_count >= 1000 ? "1k+" : businessData.review_count} cusines={"Americanddddddddddddddddddddddddddd"} address={address} favItems={favItems} setFavItems={setFavItems}/></div>
          <div><RestCard name="exa" stars={businessData.stars} reviews={businessData.review_count >= 1000 ? "1k+" : businessData.review_count} cusines={"American"} address={address} favItems={favItems} setFavItems={setFavItems}/></div>
          <div><RestCard name="ex3" stars={businessData.stars} reviews={businessData.review_count >= 1000 ? "1k+" : businessData.review_count} cusines={"American"} address={address} favItems={favItems} setFavItems={setFavItems}/></div>
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

export default CardScreen