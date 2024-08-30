import "./App.css";
import { useState } from "react";
import VisualHelper from "./components/helper-options/visual-helper";

function App() {
  const [word, setWord] = useState("");
  const [description, setDescription] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [guesses, setGuesses] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  const generateDescription = (word) => {
    // Simulate generating a description based on the word
    return `This is a description for the word "${word}". It is related to something you might encounter in your daily life. Think about the context where you would find this word, and consider its various meanings. Imagine a scenario where this word would be essential for understanding a concept or solving a problem.`;
  };

  const handleWordSubmit = () => {
    setDescription(generateDescription(word));
    setWord("");
  };

  const handleGuess = (guess) => {
    setGuesses([...guesses, guess]);
    setAttempts(attempts + 1);
    if (attempts >= 9) {
      setGameOver(true);
    }
  };

  return (
    <div className="App">
      <h1>Word Guessing Game</h1>
      <div>
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Enter a word"
          disabled={description !== ""}
        />
        <button onClick={handleWordSubmit} disabled={description !== ""}>
          Submit Word
        </button>
      </div>
      {description && (
        <div>
          <p>{description}</p>
          <div>
            <h3>Helper Options</h3>
            <VisualHelper word={word} />
            <button onClick={() => alert("Audio Hint")}>Get Audio Hint</button>
          </div>
        </div>
      )}
      <div>
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
          disabled={gameOver}
        />
        <p>Attempts: {attempts}/10</p>
        <p>Guesses: {guesses.join(", ")}</p>
        {gameOver && <p>Game Over! You've used all your attempts.</p>}
      </div>
    </div>
  );
}

export default App;
