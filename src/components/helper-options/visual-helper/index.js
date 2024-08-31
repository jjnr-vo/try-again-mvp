import { useState } from "react";

function VisualHelper({ word }) {
  const [visualHint, setVisualHint] = useState(null);

  const generateVisualHint = async (word) => {
    console.log(
      "generateVisualHint",
      process.env.REACT_APP_OPENAI_PROJECT_API_KEY
    );
    try {
      const response = await fetch(
        "https://api.openai.com/v1/images/generations",
        {
          method: "POST",
          body: JSON.stringify({
            prompt: `An abstract representation of the word "${word}" surrounded by unrelated elements.`,
            n: 1,
            size: "512x512",
          }),
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_PROJECT_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const imageUrl = response.data.data[0].url;
      setVisualHint(imageUrl);
    } catch (error) {
      console.error("Error fetching visual hint:", error);
      setVisualHint(null);
    }
  };

  const handleVisualHint = () => {
    generateVisualHint(word);
  };

  return (
    <>
      <button onClick={handleVisualHint}>Get Visual Hint</button>
      {visualHint && <img src={visualHint} alt="Visual Hint" />}
    </>
  );
}

export default VisualHelper;
