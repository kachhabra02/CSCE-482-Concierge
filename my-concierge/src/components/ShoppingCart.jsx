import React from 'react'
import ShoppingCartElement from './ShoppingCartElement'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function ShoppingCart({ favItems, setFavItems, setShowModal }) {

  const removeItem = (index) => {
    const filteredList = favItems.filter((_, i) => i !== index);
    setFavItems(filteredList);
  };

  const handleClose = () => setShowModal(false);

  return (
    <Modal centered show onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Favorites:</Modal.Title>
      </Modal.Header>
      <Modal.Body className="shopping-cart-body">
        <div>
          {(favItems || []).map((item, index) => (
            <ShoppingCartElement
              favItem={item}
              index={index}
              removeItem={removeItem}
            />
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ShoppingCart