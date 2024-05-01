import React from 'react'
import {FaStar, FaStarHalfAlt} from "react-icons/fa";
import {AiOutlineStar} from "react-icons/ai";

/**
 * Star Component
 * @description Represents a star rating component with optional half-star and review count
 * @param {number} stars - The star rating value (e.g., 4.5)
 * @param {number} reviews - The number of reviews
 */
const Star = ({stars,reviews}) => {

 // Generate star icons based on the star rating
 const ratingStar = Array.from({length:5}, (elem, index) => {
    let number = index+0.5
    
      return (
        <span key={`star-${index}`}>
            {stars >= index+1 ? <FaStar className="icon" />: stars >= number ? <FaStarHalfAlt className="icon" />:<AiOutlineStar/>}
        </span>
      )
  });

  return (
      <div className='icon-style'>
        <div>
          {ratingStar}
        </div>
        
        <p style={{ fontSize: '10px' }}>({reviews} reviews)</p>
      </div>
  )
}

export default Star