import { useState } from "react";

function VisualHelper({ word, setLoadingHelperResource }) {
  const [visualHint, setVisualHint] = useState(null);

  const generateVisualHint = async (word) => {
    if (visualHint) {
      return;
    }

    setLoadingHelperResource(true);
    try {
      const response = await fetch(
        "https://api.openai.com/v1/images/generations",
        {
          method: "POST",
          body: JSON.stringify({
            prompt: `Create a photograph of ${word} within its natural context.`,
            n: 1,
            size: "512x512",
          }),
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_PROJECT_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const { data } = await response.json();
      setVisualHint(data[0].url);
      setLoadingHelperResource(false);
    } catch (error) {
      console.error("Error fetching visual hint:", error);
      setLoadingHelperResource(false);
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
