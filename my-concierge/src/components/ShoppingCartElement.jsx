import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function ShoppingCartElement({favItem, index, removeItem}) {
  return (
    <Card className="shopping-element-card d-flex flex-row">
      <img alt="menu description" className="shopping-element-img" src="holder.js/100px180" />
      <div className="d-flex flex-row justify-content-between w-100">
        <div>
          <div>{favItem.name}</div>
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