import React, { useEffect, useState, useRef } from "react";
import Carousel from 'react-multi-carousel';
import RestCard from '../components/RestCard';
import ShoppingCart from "../components/ShoppingCart";
import 'react-multi-carousel/lib/styles.css';
import '../css/CardScreenCss.css';

function CardScreen({restaurants, favItems, setFavItems, highlighted, setHighlighted, forceUpdate}) {

  const carouselRef = useRef(null); // Reference for the carousel component
  

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

  useEffect(() => {
    if (highlighted == -1) {
      return;
    }

    carouselRef?.current.goToSlide(highlighted);
    forceUpdate();
  }, [highlighted])


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
      {/* <div>
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
      </div> */}

      <h1>Restaurants:</h1>

      {/* {restaurants.map((business, index) => (
        <button key={index} onClick={() => handleButtonClick(business.name)}>{business.name}</button>
      ))} */}
        
      <Carousel 
        ref={carouselRef} // Set the ref for the carousel
        responsive={responsive}
        showDots={true} 
        renderDotsOutside={renderButtonGroupOutside} 
        removeArrowOnDeviceType={["tablet", "mobile"]}
      >
        {restaurants.map((business, index) => (
          <div key={index}>
            <RestCard
              name={business.name || "No Name"}
              stars={business.stars || 0}
              reviews={business.num_reviews >= 1000 ? "1k+" : (business.num_reviews || 0)}
              cusines={business.categories || []}
              address={business.address ? `${business.address}, ${business.city}, ${business.state} ${business.zip_code}` : "No Address"}
              hours={business.hours || {}}
              attributes={business.attributes || {}}
              favItems={favItems || []}
              setFavItems={setFavItems || (() => {})}
              image = {business.base_image_url}
              total_images = {business.num_images}
              phone = {business.phone}
              yelp = {business.yelp_url}
            />
          </div>
        ))}
      </Carousel>

      {/* {showShoppingCart && (
        <ShoppingCart
          favItems={favItems}
          setFavItems={setFavItems}
          setShowModal={setShowShoppingCart}
        />
      )} */}
    </div>
  )
}

export default CardScreen;
