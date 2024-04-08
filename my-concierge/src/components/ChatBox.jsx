import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import '../css/ChatBox.css'; // Import the CSS file
import robotImage from '../img/robot.png';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [botMessage, setBotMessage] = useState('');
  const [selectedCity, setSelectedCity] = useState(''); //user selected city


  
  const handleSendMessage = async () => {
    // Add the new message to the messages array
    setMessages([...messages, { text: userMessage, sender: 'user' }]);

    if(!selectedCity){
      alert('Hello! To have the best user experience please select a city before continuing.')
      return;
    }

    //Generate response for user based on input
    setIsLoading(true);
    const response = await generateBotResponse(userMessage, selectedCity);
    setBotMessage(response);
    setMessages([...messages, {text: response, sender: 'bot'}]);
    setIsLoading(false);

    // Clear the input field
    setUserMessage('');
  };

  //Contact API response
  const generateBotResponse = (message, city) => {
    if(!messages){ // Initial conversation
      return city;
    } else{
      return message;
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    const greetingMessage = (
      <div className="greetings">
        Hi there! I am your virtual concierge here to help you find the best place to dine in.
        Please choose a city to get started:
        <br />
        <button onClick={() => setSelectedCity('Philadelphia')}>Philadelphia</button>
        <button onClick={() => setSelectedCity('Tuscon')}>Tucson</button>
        <button onClick={() => setSelectedCity('Reno')}> Reno </button>
        <button onClick={() => setSelectedCity('New Orleans')}>New Orleans</button>
        <button onClick={() => setSelectedCity('Tampa')}> Tampa </button>
        <button onClick={() => setSelectedCity('Nashville')}>Nashville</button>
      </div>
    );
    setBotMessage(greetingMessage);
  }, []);

  return (
    <Container className = "chatbox-container">
      <Row>
        <Col>
          {/* Image div */}
          <div className="image-container">
            <img src={robotImage} alt="Robot" />
          </div>
        </Col>
        <Col>
        {botMessage}
          <Col className='messages-container' >
            {/* Display messages*/}
            {messages.slice().map((message) => (
              <div key={message.id} className="message-container">
                {message.text}
              </div>
            ))}
          </Col>
          <Col className = "input-container">
            {/* Input form */}
            {isLoading ? (
              <div className="loading-container">
                <span>thinking...</span>
              </div>
            ) : (
              <Form.Group controlId="formMessage">
                <Form.Control
                  type="text"
                  placeholder="Type your message..."
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </Form.Group>
            )}
          </Col>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatBox;
