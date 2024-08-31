import { useState } from "react";

function AudioHelper({ word, setLoadingHelperResource }) {
  const [textForAudioHint, setTextForAudioHint] = useState(null);

  const generateAudioHint = async (word) => {
    if (textForAudioHint) {
      handleSpeechSynthesis(textForAudioHint);
    }

    setLoadingHelperResource(true);
    try {
      const textForAudioResponse = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          body: JSON.stringify({
            messages: [
              {
                role: "system",
                content: `Create a sentence that is neither too short nor too long based on the word "${word}". The word should only be mentioned one time.`,
              },
            ],
            model: "gpt-4o",
          }),
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_PROJECT_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const { choices } = await textForAudioResponse.json();
      const messageContent = choices[0].message.content;

      setTextForAudioHint(messageContent);
      handleSpeechSynthesis(messageContent);
      setLoadingHelperResource(false);
    } catch (error) {
      console.error("Error fetching audio hint:", error);
      setLoadingHelperResource(false);
    }
  };

  const handleSpeechSynthesis = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  const handleAudioHint = () => {
    generateAudioHint(word);
  };

  return <button onClick={handleAudioHint}>Get Audio Hint</button>;
}

export default AudioHelper;
