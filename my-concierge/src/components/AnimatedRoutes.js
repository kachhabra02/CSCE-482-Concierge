import React from 'react'
import {Routes, Route,useLocation} from 'react-router-dom';
import Chatbot from '../pages/Chatbot';
import CardScreen from '../pages/CardScreen';
import MapScreen from '../pages/MapScreen';
import StartScreen from '../pages/StartScreen';

import {AnimatePresence} from "framer-motion";

function AnimatedRoutes({businessData,setBusinessData,city,setCity,UPV,setUPV}) {

  //send all the props to chatbot,mapscreen
  // remove CardScreen Route when map screen merged!!
  const location = useLocation();

  return (
    <AnimatePresence>
    <Routes location={location} key={location.pathname}>
        <Route path="/StartScreen" element={<StartScreen />} />
        <Route path="/Chatbot" element={<Chatbot />} />
        <Route path="/MapScreen" element={<MapScreen />} />
        <Route path="/CardScreen" element={<CardScreen />} />
    </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoutes
