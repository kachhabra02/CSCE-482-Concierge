import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Star from "./Star";
import ListGroup from "react-bootstrap/ListGroup";
import Accordion from "react-bootstrap/Accordion";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaRegHeart, FaHeart, FaTaxi, FaBox ,FaWheelchair,FaPhone, FaYelp} from "react-icons/fa";
import Default from '../img/default.png'; 
import 'react-slideshow-image/dist/styles.css';
import Carousel from 'react-bootstrap/Carousel';



function RestCard({ name, stars, reviews, cusines, address,hours,attributes, favItems, setFavItems, image, total_images, phone, yelp, rank, tempIndex}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAllCuisines, setShowAllCuisines] = useState(false);

  //console.log(rank ," and ", tempIndex)

  //useEffect 
  useEffect(() => {
    setIsFavorite(favItems.find((fav) =>fav.name === name) !== undefined)
  }, [favItems])
  

  const onFavoriteClick = () => {
    // Toggle the favorite status
    setIsFavorite(!isFavorite);

    const newItem = { name, cusines, address,image,total_images };
    if (!isFavorite) {
      // Add item to favorites
      setFavItems([...favItems, newItem]);
    } else {
      // Remove item from favorites
      setFavItems((favItems || []).filter(item => item.name !== name));
    }
  };

  const toggleCuisines = () => {
    setShowAllCuisines(!showAllCuisines);
  }

  const extractPriceRange = (cusines) => {
    let priceRange = '';
    const updatedCusines = cusines.filter(cusine => {
      if (cusine.startsWith('Price Range')) {
        priceRange = cusine;
        return false;
      }
      return true;
    });
    return { priceRange, updatedCusines };
  };

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
  const { priceRange, updatedCusines } = extractPriceRange(cusines);



  return (
    <Card className={tempIndex === rank ? "highlighted-card" : ""} style={{ width: "23rem", marginBottom:"10px" }}>
    <Carousel>
      {carouselImages.map((image, index) => (
        <Carousel.Item key={index}>
          <img className="carousel-image" src={image} alt={`Image ${index}`} />
        </Carousel.Item>
      ))}
    </Carousel>
      <Card.Body style={{ paddingBottom: '0' }}>
        <div className="d-flex flex-row justify-content-between w-100">
          <Card.Title className="col-7">{name}</Card.Title>
          <Star stars={stars} reviews={reviews} />
        </div>
        <div className="d-flex flex-row justify-content-between w-100">
        {priceRange.length > 0 ? (
            <Card.Text style={{display:'flex', marginBottom: '2%'}}>
              {priceRange}
            </Card.Text>
          ) : (
            <Card.Text style={{display:'flex', marginBottom: '2%'}}>
              Price Range: None
            </Card.Text>
          )}
          <button type="button" className="favorite-btn btn" onClick={onFavoriteClick}>
            {isFavorite ? <FaHeart style={{ color: "#fb2323" }} /> : <FaRegHeart style={{ color: "#fb2323" }} />}
          </button>
          </div>
        <div className="mb-2">
          <Card.Text className="col-11">
              {updatedCusines.slice(0, showAllCuisines ? updatedCusines.length : 2).map((cuisine, index) => (
                <button key={index} type="button"  
                style={{
                  margin: '3px',
                  color: '#007bff', 
                  backgroundColor: 'transparent', 
                  borderColor: '#007bff',
                  border: '1px solid', 
                  borderRadius: '50px',
                  padding: '5px 10px', 
                  fontSize: '0.875rem', 
                  lineHeight: '1.5', 
                  textDecoration: 'none', 
                  cursor: 'default' 
                }}>{cuisine}</button>
              ))}
              {updatedCusines.length > 2 && !showAllCuisines && (
                <button type="button" className="btn btn-outline-primary rounded-pill btn-sm mr-2" style={{ margin: '3px' }} onClick={toggleCuisines}>...</button>
              )}
              {updatedCusines.length > 2 && showAllCuisines && (
                <button type="button" className="btn btn-outline-primary rounded-pill btn-sm mr-2" style={{ margin: '3px' }} onClick={toggleCuisines}>Close</button>
              )}
            </Card.Text>

        </div>
      </Card.Body>
      <ListGroup className="list-group-flush">
      <ListGroup.Item>
        <a 
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`} 
            target="_blank" 
            rel="noopener noreferrer"
            title="click her to see it on map"
          >
            {address}
          </a>
      </ListGroup.Item>
        <Accordion alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Opening Hours:</Accordion.Header>
            <Accordion.Body>              
              {parsedHours == null ? (
                <div>No information available</div>
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
              <div>No information available</div>
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
            {yelp && (
              <>
                <hr /> 
                <li className="attribute-item">
                  <FaYelp />
                  <span className="attribute-text">
                    Yelp: <a href={yelp} target="_blank" rel="noopener noreferrer">Visit Yelp</a>
                  </span>
                </li>
              </>
            )}
          </Accordion.Body>
        </Accordion.Item>

        </Accordion>
      </ListGroup>
    </Card>
  );
}



export default RestCard;
