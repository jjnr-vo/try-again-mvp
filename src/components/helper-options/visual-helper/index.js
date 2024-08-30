import { useState } from "react";

function VisualHelper({ word }) {
  const [visualHint, setVisualHint] = useState(null);

  const generateVisualHint = async (word) => {
    console.log("generateVisualHint");
    try {
      const response = await fetch("/generate-visual-hint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ word }),
      });

      console.log("response");

      const data = await response.json();

      console.log("data", data);

      setVisualHint(data.imageUrl);
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
