import React from 'react'
import {FaStar, FaStarHalfAlt} from "react-icons/fa";
import {AiOutlineStar} from "react-icons/ai";


const Star = ({stars,reviews}) => {

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