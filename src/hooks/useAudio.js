export const useAudio = () => {
  const speak = (word) => {
    console.log('Attempting to speak:', word);

    if (!window.speechSynthesis) {
      console.error('Speech synthesis not supported in this browser');
      alert('Audio not supported in this browser. Try Chrome or Safari.');
      return;
    }

    window.speechSynthesis.cancel();

    const loadVoicesAndSpeak = () => {
      const voices = window.speechSynthesis.getVoices();
      console.log('Available voices:', voices.length);

      const utterance = new SpeechSynthesisUtterance(word);
      utterance.rate = 0.8;
      utterance.pitch = 1.1;
      utterance.volume = 1.0;
      utterance.lang = 'en-US';

      if (voices.length > 0) {
        const englishVoice = voices.find(v => v.lang.startsWith('en')) || voices[0];
        utterance.voice = englishVoice;
        console.log('Using voice:', englishVoice.name);
      }

      utterance.onstart = () => console.log('Speech started');
      utterance.onend = () => console.log('Speech ended');
      utterance.onerror = (e) => console.error('Speech error:', e);

      window.speechSynthesis.speak(utterance);
    };

    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.addEventListener('voiceschanged', loadVoicesAndSpeak, { once: true });
    } else {
      loadVoicesAndSpeak();
    }
  };

  const celebrate = () => {
    speak('Amazing work!');
  };

  return { speak, celebrate };
};
