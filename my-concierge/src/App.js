import React, {useState} from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import AnimatedRoutes from './components/AnimatedRoutes';


function App() {

  const [businessData,setBusinessData] = useState({});
  const [city, setCity] = useState("");
  const [UPV, setUPV] = useState([]); //the array might need to have default values

  return (
    <Router>
        <AnimatedRoutes
        businessData = {businessData}
        setBusinessData = {setBusinessData}
        city = {city}
        setCity = {setCity}
        UPV = {UPV}
        setUPV = {setUPV}
        />
    </Router>
  );
}

export default App;
