import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/StartScreen.css';
import ConciergeBot from '../img/ConciergeBot.webp';
import { motion } from "framer-motion";
import bellSound from '../img/bell.mp3';


function StartScreen() {
  const [typedText, setTypedText] = useState('');
  const headerText = 'My Concierge'; // Original text to be typed out

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      if (index < headerText.length) {
        setTypedText(headerText.substring(0, index + 1)); // Update typed text
        index++;
      } else {
        clearInterval(intervalId); // Stop the typing animation when finished
      }
    }, 200); // Typing speed in milliseconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  const playBellSound = () => {
    const audio = new Audio(bellSound);
    audio.currentTime = 7.52; // Set the starting time of the audio
    audio.play(); // Play the audio
    setTimeout(() => {
      audio.pause(); 
    }, 3000);
  };

  return (
    <motion.div 
      className="start-screen"
      initial={{ y: 0 }} 
      animate={{ y: 0 }} 
      exit={{ y: -1000 }} 
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="header">
        <h1 className='header-text'>
          {typedText} {/* Display typed text */}
          <span className="cursor"></span> {/* Blinking cursor */}
        </h1>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1, ease: [0.22, 1, 0.36, 1] }}> 
        <div className="content">
          <img src={ConciergeBot} alt="Robot sitting at a desk" className="robot-image" />
        </div>
      </motion.div>
      
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}> 
        <div className="content">
          <Link to="/Chatbot">
            <button className="start-button" onClick={playBellSound}>
              <span>Click Here to Speak with a Concierge</span>
            </button>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default StartScreen;
