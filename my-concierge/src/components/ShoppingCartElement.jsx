import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Default from '../img/default.png'; 

/**
 * Shopping Cart Element Component
 * @description Represents an item in the shopping cart with image, name, cuisines, and address
 * @param {Object} favItem - Favorite item object containing details like name, cuisines, address, etc.
 * @param {number} index - Index of the item in the shopping cart list
 * @param {Function} removeItem - Function to remove the item from the shopping cart
 */
function ShoppingCartElement({favItem, index, removeItem}) {

  // Determine the URL for the item's image
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