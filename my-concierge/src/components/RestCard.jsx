import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Star from "./Star";
import ListGroup from "react-bootstrap/ListGroup";
import Accordion from "react-bootstrap/Accordion";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaRegHeart, FaHeart } from "react-icons/fa";

function RestCard({ name, stars, reviews, cusines, address, favItems, setFavItems}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAllCuisines, setShowAllCuisines] = useState(false);
  
  const toggleCuisines = () => {
    setShowAllCuisines(!showAllCuisines);
  }

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
            {cusines.length > 2 && !showAllCuisines && (
              <button type="button" className="btn btn-outline-primary rounded-pill btn-sm mr-2" style={{ margin: '3px' }} onClick={toggleCuisines}>...</button>
            )}
            {cusines.length > 2 && showAllCuisines && (
              <button type="button" className="btn btn-outline-primary rounded-pill btn-sm mr-2" style={{ margin: '3px' }} onClick={toggleCuisines}>Close</button>
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
            <Accordion.Body>Info</Accordion.Body>
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

export default RestCard;
