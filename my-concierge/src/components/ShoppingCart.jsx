import React, { useState } from 'react';
import ShoppingCartElement from './ShoppingCartElement';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

/**
 * Shopping Cart Component
 * @description Modal component for displaying and managing favorite items in the shopping cart
 * @param {Array} favItems - Array of favorite items
 * @param {Function} setFavItems - Function to set the favorite items
 * @param {Function} setShowModal - Function to set the visibility of the modal
 */
function ShoppingCart({ favItems, setFavItems, setShowModal }) {
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  // Function to remove an item from the favorites list
  const removeItem = (index) => {
    const filteredList = favItems.filter((_, i) => i !== index);
    setFavItems(filteredList);
  };

  // Function to handle modal close
  const handleClose = () => setShowModal(false);

  // Function to handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Function to generate text content for the email
  const generateTextContent = () => {
    return favItems.map((item) => `${item.name}, ${item.cusines.join(', ')}, ${item.address}`).join('\n');
  };

  // Function to handle sending the email
  const handleSendEmail = async () => {
    setSending(true);
    try {
      const textContent = generateTextContent();
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          content: textContent,
        }),
      });
      if (response.ok) {
        console.log('Email sent successfully');
        setEmail('');
        setError(null);
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error.message);
      setError('Failed to send email');
    } finally {
      setSending(false);
    }
  };

  return (
    <Modal centered show onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Favorites:</Modal.Title>
      </Modal.Header>
      <Modal.Body className="shopping-cart-body">
        <div>
          {(favItems || []).map((item, index) => (
            <ShoppingCartElement
              key={index}
              favItem={item}
              index={index}
              removeItem={removeItem}
            />
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        {/*<div className='d-flex flex-row justify-content-between w-100'>
           <Form.Group controlId="formBasicEmail" className="mb-0">
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={handleEmailChange}
            />
            <Form.Text className="text-muted">
              To send this list to your email, please input your email.
            </Form.Text>
          </Form.Group>
          <Button variant="primary" onClick={handleSendEmail} disabled={sending}>
            {sending ? 'Sending...' : 'Send'}
          </Button> 

        </div>*/}
        <Button variant="secondary" onClick={handleClose} disabled={sending}>
            Close
        </Button>
        {error && <p className="text-danger">{error}</p>}
      </Modal.Footer>
    </Modal>
  );
}

export default ShoppingCart;
