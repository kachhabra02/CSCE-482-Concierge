import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Star from "./Star";
import ListGroup from "react-bootstrap/ListGroup";
import Accordion from "react-bootstrap/Accordion";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/RestCardCss.css";
import { FaRegHeart, FaHeart } from "react-icons/fa";

function RestCard({ name, stars, reviews, cusines, address }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const onFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <div className="rest-name-container">
          <Card.Title>{name}</Card.Title>
          <Star stars={stars} reviews={reviews} />
        </div>
        <div className="d-flex flex-row justify-content-between w-100">
          <Card.Text>{cusines}</Card.Text>
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
