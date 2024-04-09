import React from 'react'
import {Routes, Route, useLocation} from 'react-router-dom';
import Chatbot from '../pages/Chatbot';
import MapScreen from '../pages/MapScreen';
import StartScreen from '../pages/StartScreen';

import {AnimatePresence} from "framer-motion";

function AnimatedRoutes({city, setCity, UPV, setUPV, messages, setMessages}) {

  // send all the props to chatbot, mapscreen
  const location = useLocation();

  return (
    <AnimatePresence>
        <Routes location={location} key={location.pathname}>
            <Route path="/Chatbot" element={<Chatbot city={city} setCity={setCity} UPV={UPV} setUPV={setUPV} 
                                                     messages={messages} setMessages={setMessages} />} />
            <Route path="/MapScreen" element={<MapScreen city={city} UPV={UPV} />} />
            <Route path="*" element={<StartScreen />} />
        </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoutes

