import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import AnimatedRoutes from './components/AnimatedRoutes';


function App() {

  return (
    <Router>
      <div>
        <ul>
          <li><Link to="/StartScreen">StartScreen</Link></li>
          <li><Link to="/Chatbot">Chatbot</Link></li>
          <li><Link to="/MapScreen">Map</Link></li>
          <li><Link to="/CardScreen">Card</Link></li>
        </ul>

        <hr />
        <AnimatedRoutes/>

      </div>
    </Router>
  );
}

export default App;
