import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import '../css/ChatBox.css'; // Import the CSS file
import robotImage from '../img/robot.png';
import axios from 'axios';
import { FaRobot,FaAngleRight,FaRegThumbsUp,FaRegThumbsDown,FaThumbsUp,FaThumbsDown} from "react-icons/fa";
import { motion } from "framer-motion";



const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
  timeout: 15000 // 15 second timeout
});

const cityList = ['Philadelphia', 'Tuscon', 'Reno', 'New Orleans', 'Tampa', 'Nashville']

const ChatBox = ({selectedCity, setSelectedCity, userPreferenceArray, setUserPreferenceArray, messages, setMessages}) => {
  const [userMessage, setUserMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  //const [botMessage, setBotMessage] = useState('');
  const [showResults, setShowResults] = useState(false);

  const [thumbsUpClicked, setThumbsUpClicked] = useState(false);
  const [thumbsDownClicked, setThumbsDownClicked] = useState(false);

  const handleThumbsUpClick = () => {
    setThumbsUpClicked(!thumbsUpClicked);
    if (thumbsDownClicked) setThumbsDownClicked(false);
  };

  const handleThumbsDownClick = () => {
    setThumbsDownClicked(!thumbsDownClicked);
    if (thumbsUpClicked) setThumbsUpClicked(false);
  };
  
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
    //setBotMessage((<div className='bot-message'> {botResponse} </div>));
    setIsLoading(false);

    // Set showMapButton to true if there are any user messages
    if (messages.some(message => message.sender === 'user') && !messages[messages.length - 1].text.includes("sorry")) {
      setShowResults(true);
    }

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
    //setBotMessage((<div className='bot-message'> {botResponse} </div>));
  }

  useEffect(() => {
    if (!selectedCity) {
      const greetingMessage = (
        <div>
          Hi there! I am your virtual concierge here to help you find the best place to dine in.
          Please choose a city to get started:
          <br />
          {
            cityList.map((city) => {
              return <button className="greeting-buttons" key={`button-${city}`} onClick={() => onClickCityButton(city)}> {city} </button>
            })
          }
        </div>
      );
      setMessages([...messages, {text: greetingMessage, sender: 'bot'}]);
    }
  }, []);

  useEffect(() => {
    if (showResults) {
      const replyMessage = (
      <div style={{display:"flex"}}>
        <div>
          If you don't have any more inputs, you can view your results here!
          </div>
          <NavLink to="/MapScreen">
            <button className='circular-button'>
              <FaAngleRight />
            </button>
          </NavLink>
      </div>
      );
      setMessages([...messages, {text: replyMessage, sender: 'bot'}]);
      setShowResults(false);
    }
  }, [showResults]);
  

  return (
    <motion.div 
      initial={{ x: '100vw' }} 
      animate={{ x: 0 }} 
      exit={{ x: '-100vw' }} 
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
    <div className="container">
      <div className="left-side">
        <header><h2 style={{fontSize:"3em"}}>My Concierge</h2></header>
        <img src={robotImage} alt="Robot" width="200" />
        <br></br>
        <div>
            {/* Question asking for feedback */}
            <div className="feedback-question" onMouseEnter={() => { }}>
              <p style={{color:"white", marginBottom:'0px'}}>How did I do?</p>
              <div className="feedback-icons">
                {thumbsUpClicked ? (
                  <FaThumbsUp className="thumbs-up" onClick={handleThumbsUpClick} />
                ) : (
                  <FaRegThumbsUp className="thumbs-up" onClick={handleThumbsUpClick} />
                )}
                {thumbsDownClicked ? (
                  <FaThumbsDown className="thumbs-down" onClick={handleThumbsDownClick} />
                ) : (
                  <FaRegThumbsDown className="thumbs-down" onClick={handleThumbsDownClick} />
                )}
              </div>
            </div>
          </div>
        <div className="refresh-button-container">
          <button className='refresh-button' onClick={() => window.location.reload()}>Start a new session</button>
        </div>
      </div>
      <div className="right-side">
      <div className="chat-box">
        {messages?.map((message, index) => (
          <div key={`message-${index}`} className={`${message.sender}`}>
            {message.sender === 'bot' && (
              <FaRobot className="icon" />
            )}
            {message.text}
          </div>
        ))}
      </div>
        {isLoading ? (
             <div style={{display:'flex'}}>
               <div class="spinner-7"></div>
             </div>
           ) : (
             <Form.Group controlId="formMessage" style={{padding:'10px', marginLeft:'5px'}}>
               <Form.Control
                 type="text"
                 placeholder="Type your message..."
                 value={userMessage}
                 onChange={(e) => setUserMessage(e.target.value)}
                 onKeyPress={handleKeyPress}
               />
             </Form.Group>
           )}
      </div>
    </div>
    </motion.div>
  );

//   return (
// <Container className="chatbox-container">
//   <Row className="main-row">
//     <Col>
//       {/* Image div */}
//       <div className="image-container">
//         <img src={robotImage} alt="Robot" />
//       </div>
//     </Col>
//     <Col className="overall-container">
//       {botMessage}
//       <div className='messages-input-container'>
//         <Col className='messages-container'>
//           {/* Display messages*/}
          // {messages?.map((message, index) => (
          //   <div key={`message-${index}`} className={`message-${message.sender}`}>
          //     {message.text}
          //   </div>
          // ))}
          // {showResults && (
          //   <Col className="message-bot">
          //     If you don't have any more inputs, you can view your results here!
          //     <button>
          //       <NavLink to="/MapScreen">Results</NavLink>
          //     </button>
          //   </Col>
          // )}
//         </Col>
//         <Col className="input-container">
//           {/* Input form */}
//           {isLoading ? (
//             <div className="loading-container">
//               <span>thinking...</span>
//             </div>
//           ) : (
//             <Form.Group controlId="formMessage">
//               <Form.Control
//                 type="text"
//                 placeholder="Type your message..."
//                 value={userMessage}
//                 onChange={(e) => setUserMessage(e.target.value)}
//                 onKeyPress={handleKeyPress}
//               />
//             </Form.Group>
//           )}
//         </Col>
//       </div>
//     </Col>
//   </Row>
// </Container>

//   );
};

export default ChatBox;
