import React from 'react';
import { Link } from 'react-router-dom';
import '../css/StartScreen.css';
import ConciergeBot from '../img/ConciergeBot.webp';
import { motion } from "framer-motion";

function StartScreen() {
  return (
    <motion.div 
      className="start-screen"
      initial={{ y: 0 }} 
      animate={{ y: 0 }} 
      exit={{ y: -1000 }} 
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="header">
        <h1 className='lobster-regular'>My Concierge</h1>
      </div>
      <div className="content">
        <img src={ConciergeBot} alt="Robot sitting at a desk" className="robot-image" />
        <Link to="/Chatbot">
          <button className="start-button">
            <span>Click Here to Speak with a Concierge</span>
          </button>
        </Link>
      </div>
    </motion.div>
  );
}

export default StartScreen;
