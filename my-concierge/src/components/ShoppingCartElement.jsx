import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Default from '../img/default.png'; 

function ShoppingCartElement({favItem, index, removeItem}) {

  const url = favItem.total_images > 0 ? favItem.image+".jpg" : Default;

  return (
    <Card className="shopping-element-card d-flex flex-row">
      <img alt="menu description" className="shopping-element-img" src={url} />
      <div className="d-flex flex-row justify-content-between w-100">
        <div>
          <div><b>{favItem.name}</b></div>
          <div>{favItem.cusines.join(', ')}</div>
          <div>{favItem.address}</div>
        </div>
        <div>
          <Button variant="danger" small onClick={() => removeItem(index)}>X</Button>
        </div>
      </div>
  </Card>
  )
}

export default ShoppingCartElement