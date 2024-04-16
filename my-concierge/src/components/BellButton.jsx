import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router for navigation
import '../css/BellButton.css';
import bellSound from '../img/bell.wav';
import bellPic from '../img/bell-pic.png';
import bellRingPic from '../img/bell-ringing.gif';

const BellButton = () => {
    const [bellIcon, setBellIcon] = useState(bellPic);
    const navigate = useNavigate();
    const audio = new Audio(bellSound);

    const playBellSound = () => {
        audio.play(); // Play the audio

        setTimeout(() => {
            audio.pause();
            audio.currentTime = 0;
        }, 3000);
    };

    const handleClick = () => {
        setBellIcon(bellRingPic);
        playBellSound();

        // You can use setTimeout to simulate the GIF animation duration
        setTimeout(() => {
            // Navigate the user to the next page after the GIF animation
            navigate("/Chatbot");
        }, 700); // Adjust the time according to your GIF animation duration
    };

    return (
      <div className='return-message'>
        <button className="bellbutton" onClick={handleClick}>
          <img className="bellPic" src={bellIcon} alt="Bell" />
        </button>
        <div className='hidden-message'>
          Ring to speak with the concierge!
        </div>
      </div>
    );
};

export default BellButton;
