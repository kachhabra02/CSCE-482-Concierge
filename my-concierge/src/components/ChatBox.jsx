import React, { useState, useEffect, useRef } from 'react';
import { Form } from 'react-bootstrap';
import '../css/ChatBox.css'; // Import the CSS file
// import robotImage from 'Images/robot.png';
import axios from 'axios';
import { FaRobot } from "react-icons/fa";
import { motion } from "framer-motion";
import ResultsButton from './ResultsButton';


const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
  timeout: 15000 // 15 second timeout
});

const cityList = ['Philadelphia', 'Tuscon', 'Reno', 'New Orleans', 'Tampa', 'Nashville']

const ChatBox = ({selectedCity, setSelectedCity, userPreferenceArray, setUserPreferenceArray, messages, setMessages}) => {
  const [userMessage, setUserMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const textBoxRef = useRef();
  
  const handleSendMessage = async () => {
    if(!selectedCity){
      setUserMessage('');
      alert('Hello! To have the best user experience please select a city before continuing.')
      return;
    }

    // Add the new message to the messages array and remove the results button
    const newMessage = {text: userMessage, sender: 'user'};
    let resultsMessage = messages.pop();
    messages.push(newMessage);
    setMessages([...messages]);

    // Clear the input field
    setUserMessage('');

    //Generate response for user based on input
    setIsLoading(true);
    const botResponse = await updateUserPreferences(userMessage);
    setMessages([...messages, { text: botResponse, sender: 'bot' }, resultsMessage]);
    setIsLoading(false);
    textBoxRef?.current?.focus();
  };

  //Contact API response
  const updateUserPreferences = async (message) => {
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
    
    let botResponse = `I see you are looking for some restaurant recommendations in ${city}. What kind of restaurants are you looking for?`;
    botResponse += 'If you would simply like me to select random restaurants throughout the city, please click the "Results" button below.';

    const resultsMessage = (
        <div style={{display:"grid", gridTemplateColumns: "86% 14%"}}>
          <div style={{ width: "100%" }}>
            If you don't have any more inputs, you can view your results here! If you would like to speak with me again, you can always ring the bell to come back.
          </div>
          <ResultsButton />
        </div>
      );

    setMessages([{ text: botResponse, sender: 'bot' }, { text: resultsMessage, sender: 'bot' }]);
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

      setMessages([{ text: greetingMessage, sender: 'bot' }]);
    }
    else {
      let returnMessage = `Welcome back! Send me a message if you'd like to add more specification to your recommendations. `;
      returnMessage += `If you'd like to start fresh with a new set of specifications, please start a new session.`;
      let resultsMessage = messages.pop();

      setMessages([...messages, { text: returnMessage, sender: 'bot' }, resultsMessage]);
    }
    
  }, []);

  useEffect(() => {
    if (selectedCity && !isLoading) {
        textBoxRef?.current?.focus();
    }
  }, [selectedCity, isLoading])

  document.body.style.overflowY = "hidden";
  document.body.style.overflowX = "hidden";

  return (
    <motion.div 
      initial={{ x: '100vw' }} 
      animate={{ x: 0 }} 
      exit={{ x: '-100vw' }} 
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
    <div className="screen">
      <div className="left-side">
        <div className="refresh-button-container">
          <button className='refresh-button' onClick={() => window.location.reload()}>Start a New Session</button>
        </div>
        <br></br>
        <img src="Images/robot.png" alt="Robot" />
      </div>
      <div className="right-side">
        <div className="chat-box" onLoad={() => {
          var chatDiv = document.getElementsByClassName('chat-box')[0];
          chatDiv.scrollTop = chatDiv.scrollHeight;
        }}>
          {messages?.map((message, index) => (
            <div key={`message-${index}`} className={`${message.sender}`}>
              {message.sender === 'bot' && (
                <div>
                  <FaRobot className="icon" />{": "}
                </div>              
              )}
              {message.text}
            </div>
          ))}
        </div>
        <Form.Group controlId="formMessage" style={{padding:'10px', marginLeft:'5px'}}>
          <Form.Control
            ref={textBoxRef}
            type="text"
            placeholder={isLoading ? "" : "Type your message..."}
            value={userMessage}
            disabled={isLoading}
            onChange={(e) => setUserMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </Form.Group>
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
