import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Star from './Star';
import 'bootstrap/dist/css/bootstrap.min.css';

function RestCard({stars,reviews}) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Rest Name</Card.Title>
        <Star stars={stars} reviews={reviews} />
        <Card.Text>
          Address.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card> 
  )
}

export default RestCard