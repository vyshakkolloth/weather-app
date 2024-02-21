import React, { useState, useEffect } from 'react';

const SpeechSynthesisComponent = ({ textToSpeak }) => {
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  const handleSpeak = () => {
    if (selectedVoice && textToSpeak) {
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.voice = selectedVoice;
      utterance.onend = () => {
        window.speechSynthesis.cancel(); 
      };
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleVoiceChange = (event) => {
    setSelectedVoice(voices.find((voice) => voice.name === event.target.value));
  };
  useEffect(() => {
    const updateVoices = () => {
      setVoices(window.speechSynthesis.getVoices());
    };

    window.speechSynthesis.addEventListener('voiceschanged', updateVoices);
    updateVoices(); 

    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', updateVoices);
    };
  }, []);

  return (
    <div className='speak'>
      <select className='voice' onChange={handleVoiceChange}>
        {voices.map((voice) => (
          <option key={voice.name} value={voice.name}>
            {voice.name}
          </option>
        ))}
      </select>
      <button className='button2' onClick={handleSpeak}>Speak</button>
    </div>
  );
};

export default SpeechSynthesisComponent;
