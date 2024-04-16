import React from 'react'
import {AiFillDollarCircle, AiOutlineDollar} from "react-icons/ai";


const Dollar = ({priceRange}) => {

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

  return (
      <div className='dollar-box'>
        {dollarSigns}
      </div>
  )
}

export default Dollar