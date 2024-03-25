import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import '../css/ChatBox.css'; // Import the CSS file

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    // Add the new message to the messages array
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: prevMessages.length + 1, text: newMessage },
  
    ]);

    // Clear the input field
    setNewMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Container className = "chatbox-container">
      <row>
        <Col className="col-4">
          {/* Image div */}
          <div className="image-container">
            <img src="../img/robot.jpeg" alt="Robot" />
          </div>
        </Col>
        <Row>
          <Col className='messages-container col-8' >
            {/* Display messages .reverse()*/}
            {messages.slice().map((message) => (
              <div key={message.id} className="message-container">
                {message.text}
              </div>
            ))}
          </Col>
        </Row>
        <Row className = "input-container col-8">
          <Col>
            {/* Input form */}
            <Form.Group controlId="formMessage">
              <Form.Control
                type="text"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </Form.Group>
          </Col>
        </Row>
      </row>
    </Container>
  );
};

export default ChatBox;
