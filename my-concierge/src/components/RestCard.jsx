import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Star from "./Star";
import Dollar from "./Dollar";
import ListGroup from "react-bootstrap/ListGroup";
import Accordion from "react-bootstrap/Accordion";
import "bootstrap/dist/css/bootstrap.min.css";
import {FaTaxi, FaBox, FaWheelchair, FaPhone, FaYelp} from "react-icons/fa";
//import Carousel from 'react-multi-carousel';
//import 'react-multi-carousel/lib/styles.css';
import Default from '../img/default.png'; 
import 'react-slideshow-image/dist/styles.css';
import Carousel from 'react-bootstrap/Carousel';
import goldPin from '../img/goldPin.png';
import orangePin from '../img/orangePin.png';


function RestCard({ name, stars, reviews, cuisines, address,hours,attributes,
                    image, total_images, phone, yelp, rank, highlighted, setHighlighted}) {
  const [showAllCuisines, setShowAllCuisines] = useState(false);
  const [showFullAddress, setShowFullAddress] = useState(false);

  let priceRange = '';
  cuisines = cuisines.filter((category) => {
    if (category.startsWith("Price Range ")) {
        priceRange = category.substring(12);
        return false;
    }
    return true;
  })
  cuisines.sort((a, b) => { return a.length - b.length;  });

  let numCuisinesCollapsed = (cuisines.length < 2) ? cuisines.length : 2;
  if (cuisines.length >= 3 && cuisines[0] + cuisines[1] + cuisines[2] <= 29) {
    ++numCuisinesCollapsed;
    if (cuisines.length >= 4 && cuisines[0] + cuisines[1] + cuisines[2] + cuisines[3] <= 26) {
      ++numCuisinesCollapsed;
    }
  }

  const getCurrentDay = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date();
    return days[date.getDay()];
  };

  const boldCurrentDay = (day) => {
    const currentDay = getCurrentDay();
    return day === currentDay ? <strong>{day}</strong> : day;
  };

  const renderIcon = (attribute) => {
    switch (attribute) {
      case 'Take Out':
        return <FaBox />;
      case 'Delivery':
        return <FaTaxi />;
      case "Wheelchair Accessible":
        return <FaWheelchair />;
      default:
        return null;
    }
  };

  const formatHours = (hour) => {
    let hour_list = hour.split('-');
    if(hour_list !== null)
    {
      if (hour_list[0].charAt(hour_list[0].length - 2) === ":")
      {
        hour_list[0] = hour_list[0]+'0';
      }
      if (hour_list[1].charAt(hour_list[1].length - 2) === ":")
      {
        hour_list[1] = hour_list[1]+'0';
      }
      hour = hour_list[0]+'-'+hour_list[1]
    } 
    return hour;
  };

  const parsedHours = hours ? JSON.parse(hours) : {};

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  const images = Array.from({ length: total_images > 5 ? 5 : total_images }, (_, i) => `${image}${i > 0 ? `_${i}.jpg` : '.jpg'}`);
  const carouselImages = images.length > 0 ? images : [Default];

  return (
    <Card className={highlighted === rank ? "highlighted-card" : "normal-card"} style={{ width: "23rem", marginBottom:"10px" }}
          onClick={ () => { if (highlighted !== rank) { setHighlighted(rank); } } }>
    <Carousel>
      {carouselImages.map((image, index) => (
        <Carousel.Item key={index}>
          <img className="carousel-image" src={image} alt={`Image ${index}`} onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src=Default;
          }} />
        </Carousel.Item>
      ))}
    </Carousel>
      {/* <div className="slide-container">
        <Fade>
        {carouselImages.map((image, index) => (
          <img className="carousel-image" key={index} src={image} alt={`Image ${index}`} />
        ))}
        </Fade>
      </div> */}
      {/* <Carousel 
        responsive={responsive}

      >
      {carouselImages.map((image, index) => (
          <img className="carousel-image" key={index} src={image} alt={`Image ${index}`} />
        ))}
      </Carousel> */}
      <div> { /* To avoid border between card body and list group */ }
      <Card.Body style={{ paddingBottom: '0' }}>
        <div className="d-flex flex-row justify-content-between w-100">
          <Card.Title className="col-9">{name}</Card.Title>
          <div className="star-price-box">
            <Star stars={stars} reviews={reviews} />
            <Dollar priceRange={priceRange} />
          </div>
        </div>
        <div className="d-flex flex-row justify-content-between w-100">
          <Card.Text className="w-full">
            {
                cuisines.length === 0 ? <div key={0} className="category-tag" style={{ margin: '3px' }}>No Category/Cuisine Information</div>
                                      : null
            }
            {
              showAllCuisines ?
                <div className="category-box">
                  {cuisines.map((cuisine, index) => (
                    <div key={index} className="category-tag" style={{ margin: '3px' }}>{cuisine}</div>
                  ))}
                  <button key={cuisines.length} className="category-btn" style={{ margin: '3px' }} onClick={ () => setShowAllCuisines(false) }>
                    Show Less...
                  </button>
                </div>
              :
                <div className="category-box">
                  {cuisines.slice(0, numCuisinesCollapsed).map((cuisine, index) => (
                      <div key={index} className="category-tag" style={{ margin: '3px' }}>{cuisine}</div>
                  ))}
                  {
                    cuisines.length > numCuisinesCollapsed ?
                      <button key={cuisines.length} className="category-btn" style={{ margin: '3px' }} onClick={ () => setShowAllCuisines(true) }>
                        ...
                      </button>
                    : null
                  }
                </div>
            }
            
          </Card.Text>
        </div>
      </Card.Body>
      <ListGroup className="list-group-flush">
      <ListGroup.Item>
        <div className="card-address" onClick={ () =>  setShowFullAddress(!showFullAddress) }>
          <img src={(rank === 0) ? goldPin : orangePin} alt={"Address Pin"}/>
          <p className={`card-address-text${showFullAddress ? "-full" : ""}`}>{` ${address}`}</p>
        </div>
      </ListGroup.Item>
        <Accordion alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Opening Hours:</Accordion.Header>
            <Accordion.Body>              
              {parsedHours == null ? (
                <span className="attribute-text">No information available</span>
              ) : (
                <ul className="hours-list">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => (
                  <li key={day} className={index % 2 === 0 ? "gray-bg" : "white-bg"}>
                    {boldCurrentDay(day)}: {parsedHours[day] ? formatHours(parsedHours[day]) : "No information available"}
                  </li>
                ))}
              </ul>
              )}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
          <Accordion.Header>Extra:</Accordion.Header>
          <Accordion.Body>
            {Object.entries(attributes).length === 0 ? (
              <span className="attribute-text">No information available</span>
            ) : (
              <ul className="attributes-list">
              {attributes.map((attribute, index) => (
                <li key={index} className="attribute-item">
                  {/* Use attribute directly instead of [attribute] */}
                  {renderIcon(attribute)}
                  <span className="attribute-text">{attribute.replace(/([A-Z])/g, ' $1').trim()}</span>
                </li>
              ))}
            </ul>
            )}
            {phone && (
              <>
                <hr /> 
                <li className="attribute-item">
                  <FaPhone />
                  <span className="attribute-text">Phone: {phone}</span>
                </li>
              </>
            )}
            {/*yelp && (
              <>
                <hr /> 
                <li className="attribute-item">
                  <FaYelp />
                  <span className="attribute-text">
                    Yelp: <a href={yelp} target="_blank" rel="noopener noreferrer">Visit Yelp</a>
                  </span>
                </li>
              </>
            )*/}
          </Accordion.Body>
        </Accordion.Item>

        </Accordion>
      </ListGroup>
      </div>
    </Card>
  );
}



export default RestCard;
