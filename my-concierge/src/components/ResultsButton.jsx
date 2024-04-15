import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router for navigation
import '../css/ResultsButton.css';

const ResultsButton = () => {
    const [resultIcon, setResultIcon] = useState("Images/resultsButton.png");
    const navigate = useNavigate();

    const handleClick = () => {
        setResultIcon("Images/resultsButtonClick.gif");

        // You can use setTimeout to simulate the GIF animation duration
        setTimeout(() => {
            // Navigate the user to the next page after the GIF animation
            navigate("/MapScreen");
        }, 400); // Adjust the time according to your GIF animation duration
    };

    return (
        <button className="ResultsButton" onClick={handleClick}>
            <img className="resultPic" src={resultIcon} alt="Results" />
        </button>
    );
};

export default ResultsButton;
