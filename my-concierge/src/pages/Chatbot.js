import React from 'react';
import ChatBox from '../components/ChatBox';

function Chatbot({city, setCity, UPV, setUPV, messages, setMessages}) {
  return (
    <div>
      <ChatBox selectedCity={city} setSelectedCity={setCity} userPreferenceArray={UPV} setUserPreferenceArray={setUPV}
               messages={messages} setMessages={setMessages} />
    </div>
  );
}

export default Chatbot;