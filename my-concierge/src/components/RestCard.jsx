import React from 'react'
import Card from 'react-bootstrap/Card';
import Star from './Star';
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/RestCardCss.css';

function RestCard({name,stars,reviews,cusines,address}) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <div className='rest-name-container'>
          <Card.Title>{name}</Card.Title>
          <Star stars={stars} reviews={reviews} />
        </div>
        <Card.Text>
        {cusines}
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
          <ListGroup.Item>Address: {address}</ListGroup.Item>
          <ListGroup.Item>Opening hours:</ListGroup.Item>
          <ListGroup.Item>Extra:</ListGroup.Item>
        </ListGroup>
    </Card> 
  )
}

export default RestCard