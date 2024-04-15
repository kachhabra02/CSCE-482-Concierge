import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/StartScreen.css';
import { motion } from "framer-motion";
import bellSound from '../img/bell.wav';


function StartScreen() {
  const [typedText, setTypedText] = useState('');
  const [bellIcon, setBellIcon] = useState('Images/bell-pic.png');
  const navigate = useNavigate();
  const headerText = 'My Concierge'; // Original text to be typed out
  const audio = new Audio(bellSound);

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
    audio.play(); // Play the audio

    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
    }, 3000);
  };

  const handleClick = () => {
    setBellIcon("Images/bell-ringing-orange.gif");
    playBellSound();

    // You can use setTimeout to simulate the GIF animation duration
    setTimeout(() => {
        // Navigate the user to the next page after the GIF animation
        navigate("/Chatbot");
    }, 700); // Adjust the time according to your GIF animation duration
  };

  document.body.style.overflowY = "hidden";

  return (
    <motion.div 
      className="start-screen"
      initial={{ y: 0 }} 
      animate={{ y: 0 }} 
      exit={{ y: -1000 }} 
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="header-text">
          {typedText}
          <span className="cursor"></span>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1, ease: [0.22, 1, 0.36, 1] }}> 
        <div className="content">
          <img src={bellIcon} alt="Bell to call concierge" className="bell-image" onClick={handleClick} />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default StartScreen;
