import "./App.css";
import { useState } from "react";
import VisualHelper from "./components/helper-options/visual-helper";
import AudioHelper from "./components/helper-options/audio-helper";

function App() {
  const [wordInput, setWordInput] = useState("");
  const [word, setWord] = useState("");

  const [description, setDescription] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [guesses, setGuesses] = useState([]);
  const [gameState, setGameState] = useState("input");
  const [loadingHelperResource, setLoadingHelperResource] = useState(false);
  const [riddle, setRiddle] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const handleWordSubmit = () => {
    setGameState("riddle");
    setWord(wordInput);
    generateRiddle(wordInput)
    setWordInput("");
  };

  const handleGuess = (guess) => {
    setGuesses([...guesses, guess]);
    setAttempts(attempts + 1);
    if (attempts >= 9) {
      setGameState("gameOver");
    }
  };
  const generateRiddle = async (word) => {
    setIsLoading(true);
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_PROJECT_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [{
            role: "system",
            content: `Return a riddle about the word: ${word}. Do not include the answer in the result.`
          }]
        })
      });

      const data = await response.json();
      setRiddle(data.choices[0].message.content);
      setGameState('riddle');
    } catch (error) {
      console.error('Error generating riddle:', error);
      // setMessage('Failed to generate riddle. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Try Again</h1>
      <div className="container">
        {gameState === "input" && (
          <div>
            <input
              type="text"
              value={wordInput}
              onChange={(e) => setWordInput(e.target.value)}
              placeholder="Enter a word"
              disabled={riddle !== ""}
            />
            <button onClick={handleWordSubmit} disabled={riddle !== ""}>
              Submit Word
            </button>
          </div>
        )}
        {gameState === "riddle" && riddle && (
          <div>
            <p>{riddle}</p>
            {console.log(riddle)}
            <h3>Guess the Word</h3>
            <input
              type="text"
              placeholder="Enter your guess"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleGuess(e.target.value);
                  e.target.value = "";
                }
              }}
            />
            <div>
              <h3>Helper Options</h3>
              <AudioHelper
                word={word}
                setLoadingHelperResource={setLoadingHelperResource}
              />
              <VisualHelper
                word={word}
                setLoadingHelperResource={setLoadingHelperResource}
              />
            </div>
            <div>
              {loadingHelperResource && (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="4" cy="12" r="3">
                    <animate
                      id="spinner_qFRN"
                      begin="0;spinner_OcgL.end+0.25s"
                      attributeName="cy"
                      calcMode="spline"
                      dur="0.6s"
                      values="12;6;12"
                      keySplines=".33,.66,.66,1;.33,0,.66,.33"
                    />
                  </circle>
                  <circle cx="12" cy="12" r="3">
                    <animate
                      begin="spinner_qFRN.begin+0.1s"
                      attributeName="cy"
                      calcMode="spline"
                      dur="0.6s"
                      values="12;6;12"
                      keySplines=".33,.66,.66,1;.33,0,.66,.33"
                    />
                  </circle>
                  <circle cx="20" cy="12" r="3">
                    <animate
                      id="spinner_OcgL"
                      begin="spinner_qFRN.begin+0.2s"
                      attributeName="cy"
                      calcMode="spline"
                      dur="0.6s"
                      values="12;6;12"
                      keySplines=".33,.66,.66,1;.33,0,.66,.33"
                    />
                  </circle>
                </svg>
              )}
            </div>
          </div>
        )}
        {gameState === "gameOver" && (
          <p>Game Over! You've used all your attempts.</p>
        )}
      </div>
    </div>
  );
}

export default App;
