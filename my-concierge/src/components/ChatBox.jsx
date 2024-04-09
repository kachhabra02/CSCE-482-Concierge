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
  const [userPreferenceArray, setUserPreferenceArray ] = useState([]); //array of messages

  
  const handleSendMessage = async () => {
    // Add the new message to the messages array
    const newMessage = {text: userMessage, sender: 'user' };
    setMessages([...messages, newMessage]);

    if(!selectedCity){
      alert('Hello! To have the best user experience please select a city before continuing.')
      return;
    }

    //Generate response for user based on input
    setIsLoading(true);
    const response = await updateUserPreferences(userMessage);
    setUserPreferenceArray(response);

    //Generate bot response
    const botResponse = {text: response, sender: 'bot'}
    setMessages([...messages, botResponse]);
    
    setIsLoading(false);

    // Clear the input field
    setUserMessage('');
  };

  //Contact API response
  const updateUserPreferences = async (message) => {
    try {
      const response = await fetch('http://localhost:5000/api/prompt?prompt=${encodeURIComponent(message)}&user_preference_vector=${userPreferenceArray.join('-')}');
      if(!response.ok){
        throw new Error('Failed to update user preferences.');
      }
      const data = await response.json();
      return data;
    } catch(error) {
      console.error('Error updating user preferences:', error);
      return [];
    }
  };

  const generateBotResponse = async (message, city) => {
    if (!messages.length) { // Initial conversation
      return city;
    } else {
      return message;
    }
  };

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

  useEffect(() => {
    if (selectedCity && userMessage) {
      const promptMessage = (
        <div className="user-prompt">
          You want to eat: {userMessage}
        </div>
      );
      setBotMessage(promptMessage);
    }
  }, [selectedCity, userMessage]);

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
              <div key={message.id} className={"message-container ${message.sender}"}>
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
