import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Chatbot from './pages/Chatbot';
import CardScreen from './pages/CardScreen';
import MapScreen from './pages/MapScreen';

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li><Link to="/Chatbot">Chatbot</Link></li>
          <li><Link to="/MapScreen">Map</Link></li>
          <li><Link to="/CardScreen">Card</Link></li>
        </ul>

        <hr />

        <Routes>
          <Route path="/Chatbot" element={<Chatbot />} />
          <Route path="/MapScreen" element={<MapScreen />} />
          <Route path="/CardScreen" element={<CardScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
