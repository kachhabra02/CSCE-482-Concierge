import React, { useState } from 'react';
import ShoppingCartElement from './ShoppingCartElement';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function ShoppingCart({ favItems, setFavItems, setShowModal }) {
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  const removeItem = (index) => {
    const filteredList = favItems.filter((_, i) => i !== index);
    setFavItems(filteredList);
  };

  const handleClose = () => setShowModal(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const generateTextContent = () => {
    return favItems.map((item) => `${item.name}, ${item.cusines.join(', ')}, ${item.address}`).join('\n');
  };

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
        <div className='d-flex flex-row justify-content-between w-100'>
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
          <Button variant="secondary" onClick={handleClose} disabled={sending}>
            Close
          </Button>
        </div>
        {error && <p className="text-danger">{error}</p>}
      </Modal.Footer>
    </Modal>
  );
}

export default ShoppingCart;
