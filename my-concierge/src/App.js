import React, {useState} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AnimatedRoutes from './components/AnimatedRoutes';


function App() {
  const [city, setCity] = useState("");
  const [UPV, setUPV] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [messages, setMessages] = useState([]);

  const cacheGIFs = async (gifs) => {
    const promises = await gifs.map((gif) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = gif;
            img.onload = resolve();
            img.onerror = reject();
        });
    });

    await Promise.all(promises);
  }

  const cacheAudio = async (audio_files) => {
    const promises = await audio_files.map((audio_file) => {
        return new Promise((resolve, reject) => {
            const audio = new Audio();
            audio.src = audio_file;
            audio.onload = resolve();
            audio.onerror = reject();
        });
    });

    await Promise.all(promises);
  }

  const animation_gifs = ['./img/bell-ringing.gif', './img/bell-ringing-orange.gif', './img/resultsButtonClick.gif', './img/robot-thinking.gif'];
  cacheGIFs(animation_gifs);

  const audio_files = ['./img/bell.wav'];
  cacheGIFs(audio_files);

  return (
    <Router>
        <AnimatedRoutes
            city={city}
            setCity={setCity}
            UPV={UPV}
            setUPV={setUPV}
            messages={messages}
            setMessages={setMessages}
        />
    </Router>
  );
}

export default App;
