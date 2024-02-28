import React from "react";
import Card from "react-bootstrap/Card";
import Star from "./Star";
import ListGroup from "react-bootstrap/ListGroup";
import Accordion from "react-bootstrap/Accordion";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/RestCardCss.css";

function RestCard({ name, stars, reviews, cusines, address }) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <div className="rest-name-container">
          <Card.Title>{name}</Card.Title>
          <Star stars={stars} reviews={reviews} />
        </div>
        <Card.Text>{cusines}</Card.Text>
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
