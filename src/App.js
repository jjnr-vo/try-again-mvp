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
              <VisualHelper word={word} />
              <AudioHelper word={word} />
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
