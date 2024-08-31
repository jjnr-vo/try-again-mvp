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

  const generateDescription = (word) => {
    // Simulate generating a description based on the word
    return `This is a description for the word "${word}". It is related to something you might encounter in your daily life. Think about the context where you would find this word, and consider its various meanings. Imagine a scenario where this word would be essential for understanding a concept or solving a problem.`;
  };

  const handleWordSubmit = () => {
    setDescription(generateDescription(wordInput));
    setGameState("riddle");
    setWord(wordInput);
    setWordInput("");
  };

  const handleGuess = (guess) => {
    setGuesses([...guesses, guess]);
    setAttempts(attempts + 1);
    if (attempts >= 9) {
      setGameState("gameOver");
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
              disabled={description !== ""}
            />
            <button onClick={handleWordSubmit} disabled={description !== ""}>
              Submit Word
            </button>
          </div>
        )}
        {gameState === "riddle" && description && (
          <div>
            <p>{description}</p>

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
