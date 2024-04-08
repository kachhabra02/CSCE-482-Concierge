import React, {useState} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AnimatedRoutes from './components/AnimatedRoutes';


function App() {
  // const [city, setCity] = useState("");
  const [city, setCity] = useState("Philadelphia");
  const [UPV, setUPV] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  return (
    <Router>
        <AnimatedRoutes
            city = {city}
            setCity = {setCity}
            UPV = {UPV}
            setUPV = {setUPV}
        />
    </Router>
  );
}

export default App;
