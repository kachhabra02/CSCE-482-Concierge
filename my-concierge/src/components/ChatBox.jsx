import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import '../css/ChatBox.css'; // Import the CSS file
import robotImage from '../img/robot.png';
import axios from 'axios';

const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
  timeout: 15000 // 15 second timeout
});

const cityList = ['Philadelphia', 'Tuscon', 'Reno', 'New Orleans', 'Tampa', 'Nashville']

const ChatBox = ({selectedCity, setSelectedCity, userPreferenceArray, setUserPreferenceArray, messages, setMessages}) => {
  const [userMessage, setUserMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [botMessage, setBotMessage] = useState('');

  
  const handleSendMessage = async () => {
    if(!selectedCity){
        setUserMessage('');
      alert('Hello! To have the best user experience please select a city before continuing.')
      return;
    }

    // Add the new message to the messages array
    const newMessage = {text: userMessage, sender: 'user'};
    messages.push(newMessage);

    //Generate response for user based on input
    setIsLoading(true);
    const botResponse = await updateUserPreferences(userMessage);
    messages.push({text: botResponse, sender: 'bot'})
    setMessages([...messages]);
    setBotMessage((<div className='bot-message'> {botResponse} </div>));
    setIsLoading(false);

    // Clear the input field
    setUserMessage('');
  };

  //Contact API response
  const updateUserPreferences = (message) => {
    return API.get(`/prompt?prompt=${encodeURIComponent(message)}&user_preference_vector=${userPreferenceArray.join('-')}`)
      .then((res) => {
        if (res.status < 300) { // Only set if restaurants are not yet set
          setUserPreferenceArray(res.data["updated_user_preference_vector"]);
          return res.data["response"];
        }
        else {
          console.log(`Error: Status code ${res.status} when retrieving prompt analysis`);
          return "I couldn't quite understand what you said. Could you please rephrase?";
        }
      })
      .catch((error) => {
        console.log("Error when retrieving prompt analysis:");
        console.log(error);
        return "I couldn't quite understand what you said. Could you please rephrase?";
      });
  };

  /*
  const generateBotResponse = async (message, city) => {
    if (!messages.length) { // Initial conversation
      return city;
    } else {
      return message;
    }
  };
  */

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const onClickCityButton = (city) => {
    setSelectedCity(city);
    const botResponse = `I see you are looking for some restaurant recommendations in ${city}. What kind of restaurants are you looking for?`;
    setMessages([...messages, {text: botResponse, sender: 'bot'}]);
    setBotMessage((<div className='bot-message'> {botResponse} </div>));
  }

  useEffect(() => {
    const greetingMessage = (
      <div className="greetings">
        Hi there! I am your virtual concierge here to help you find the best place to dine in.
        Please choose a city to get started:
        <br />
        {
          cityList.map((city) => {
            return <button key={`button-${city}`} onClick={() => onClickCityButton(city)}> {city} </button>
          })
        }
      </div>
    );
    setBotMessage(greetingMessage);
  }, []);

  /*
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
  */

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
            {messages?.map((message, index) => (
              <div key={`message-${index}`} className={`message-${message.sender}`}>
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
