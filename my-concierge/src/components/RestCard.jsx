import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Star from "./Star";
import ListGroup from "react-bootstrap/ListGroup";
import Accordion from "react-bootstrap/Accordion";
import DropdownButton from "react-bootstrap/DropdownButton";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaRegHeart, FaHeart } from "react-icons/fa";

function RestCard({ name, stars, reviews, cusines, address,hours, favItems, setFavItems}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAllCuisines, setShowAllCuisines] = useState(false);
  

  const onFavoriteClick = () => {
    // Toggle the favorite status
    setIsFavorite(!isFavorite);

    const newItem = { name, cusines, address };
    if (!isFavorite) {
      // Add item to favorites
      setFavItems([...favItems, newItem]);
    } else {
      // Remove item from favorites
      setFavItems((favItems || []).filter(item => item.name !== name));
    }
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

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body style={{ paddingBottom: '0' }}>
        <div className="d-flex flex-row justify-content-between w-100">
          <Card.Title className="col-7">{name}</Card.Title>
          <Star stars={stars} reviews={reviews} />
        </div>
        <div className="d-flex flex-row justify-content-between w-100">
          <Card.Text className="col-8">
            {cusines.slice(0, showAllCuisines ? cusines.length : 2).map((cuisine, index) => (
              <button key={index} type="button" className="btn btn-outline-primary rounded-pill btn-sm mr-2" style={{ margin: '3px' }}>{cuisine}</button>
            ))}
            {cusines.length > 2 && (
              <Accordion alwaysOpen>
              <Accordion.Item style={{ margin: '3% 0 0 2%' }} eventKey="0">
                <Accordion.Header className="custom-cus">More ...</Accordion.Header>
                <Accordion.Body style={{padding: '2%', backgroundColor: 'lightgray' }}>
                  {cusines.slice(2).map((cuisine, index) => 
                   <React.Fragment key={index}>
                    {cuisine}
                    <br />
                    {index !== cusines.length - 3 && <hr style={{margin:'0'}}/>}
                  </React.Fragment>
                 )}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            )}
          </Card.Text>
          <button type="button" className="favorite-btn btn" onClick={onFavoriteClick}>
            {isFavorite ? <FaHeart style={{ color: "#fb2323" }} /> : <FaRegHeart style={{ color: "#fb2323" }} />}
          </button>
        </div>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Address: {address}</ListGroup.Item>
        <Accordion alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Opening Hours:</Accordion.Header>
            <Accordion.Body>              
              {Object.keys(hours).length === 0 ? (
                <div>No information available</div>
              ) : (
                <ul className="hours-list">
                  {Object.entries(hours).map(([day, hours], index) => (
                    <li key={day} className={index % 2 === 0 ? "gray-bg" : "white-bg"}>
                      {boldCurrentDay(day)}: {hours || "No information available"}
                    </li>
                  ))}
                </ul>
              )}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Extra:</Accordion.Header>
            <Accordion.Body>Info</Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </ListGroup>
    </Card>
  );
}

<DropdownButton title="More" variant="outline-primary" size="sm" style={{ margin: '3px' }}>

</DropdownButton>


export default RestCard;
