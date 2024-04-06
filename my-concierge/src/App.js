import React, {useState} from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import AnimatedRoutes from './components/AnimatedRoutes';


function App() {

  const [businessData,setBusinessData] = useState({});
  const [city, setCity] = useState("");
  const [UPV, setUPV] = useState([]); //the array might need to have default values

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
        <AnimatedRoutes
        businessData = {businessData}
        setBusinessData = {setBusinessData}
        city = {city}
        setCity = {setCity}
        UPV = {UPV}
        setUPV = {setUPV}
        />

      </div>
    </Router>
  );
}

export default App;
