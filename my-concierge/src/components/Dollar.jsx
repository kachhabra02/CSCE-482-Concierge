import React from 'react'
import {AiFillDollarCircle, AiOutlineDollar} from "react-icons/ai";

/**
 * Dollar Component
 * @description Displays dollar signs based on the price range
 * @param {Object} props - Component props
 * @param {number[]} props.priceRange - Array representing the price range
 */
const Dollar = ({priceRange}) => {

 // Generate dollar signs based on price range
 const dollarSigns = Array.from({length:4}, (elem, index) => {
    if (priceRange.length==0) {
        return (
            <span key={`dollar-${index}`}>
                {<AiOutlineDollar className="dollar-empty" />}
            </span>
        );
    }

    
    return (
      <span key={`dollar-${index}`}>
        {index < priceRange.length ? <AiFillDollarCircle className="dollar-fill" /> : <AiOutlineDollar className="dollar" />}
      </span>
    )
  });

  // Render dollar signs
  return (
      <div className='dollar-box'>
        {dollarSigns}
      </div>
  )
}

export default Dollar