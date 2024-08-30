import { useState } from "react";

function AudioHelper({ word }) {
  const [audioHint, setAudioHint] = useState(null);

  const generateAudioHint = (word) => {
    const utterance = new SpeechSynthesisUtterance(
      `This is a sentence that includes the word ${word} somewhere in it, but it's long enough that it doesn't give away the word immediately.`
    );
    speechSynthesis.speak(utterance);
  };

  const handleAudioHint = () => {
    setAudioHint(generateAudioHint(word));
  };

  return (
    <>
      <button onClick={handleAudioHint}>Get Audio Hint</button>
      {audioHint && <></>}
    </>
  );
}

export default AudioHelper;
