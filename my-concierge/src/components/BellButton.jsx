import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router for navigation
import '../css/BellButton.css';

const BellButton = () => {
    const [bellIcon, setBellIcon] = useState("Images/bell-pic.png");
    const navigate = useNavigate();

    const handleClick = () => {
        setBellIcon("Images/bell-ringing.gif");

        // You can use setTimeout to simulate the GIF animation duration
        setTimeout(() => {
            // Navigate the user to the next page after the GIF animation
            navigate("/Chatbot");
        }, 800); // Adjust the time according to your GIF animation duration
    };

    return (
        <div>
            <button class="bellbutton" onClick={handleClick}>
                <img class="bellPic" src={bellIcon} alt="Bell" />
            </button>
        </div>
    );
};

export default BellButton;
