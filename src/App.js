import "./App.css";
import { useEffect, useState } from "react";
import VisualHelper from "./components/helper-options/visual-helper";
import AudioHelper from "./components/helper-options/audio-helper";

function App() {
  const [wordInput, setWordInput] = useState("");
  const [word, setWord] = useState("");

  const [description, setDescription] = useState("");

  const [attempts, setAttempts] = useState(0);
  const [guess, setGuess] = useState("");
  const [gameState, setGameState] = useState("input");
  const [loadingHelperResource, setLoadingHelperResource] = useState(false);
  const [riddle, setRiddle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleWordSubmit = () => {
    setGameState("riddle");
    setWord(wordInput);
    generateRiddle(wordInput);
    setWordInput("");
  };

  const handleGuessOnSumbit = (guess) => {
    if (guess === word) {
      setGameState("gameWon");
      return;
    }
    window.alert("Not the correct word. Try again!");
    setAttempts(attempts + 1);
    setGuess("");
  };

  useEffect(() => {
    if (attempts >= 9) {
      setGameState("gameOver");
    }
  }, [attempts]);

  const generateRiddle = async (word) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_PROJECT_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4o",
            messages: [
              {
                role: "system",
                content: `Return a riddle about the word: ${word}. Do not include the answer in the result.`,
              },
            ],
          }),
        }
      );

      const data = await response.json();
      setRiddle(data.choices[0].message.content);
      setGameState("riddle");
    } catch (error) {
      console.error("Error generating riddle:", error);
      // setMessage('Failed to generate riddle. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (gameState === "gameOver") {
    return (
      <div className="App">
        <h1>Game Over!</h1>
        <h2>You've used all your attempts</h2>

        <button onClick={() => window.location.reload()}>Restart</button>
      </div>
    );
  }

  if (gameState === "gameWon") {
    return (
      <div className="App">
        <h1>Congratulations!</h1>
        <h2>You guess the word correctly</h2>

        <button onClick={() => window.location.reload()}>Restart</button>
      </div>
    );
  }

  if (gameState === "gameOver") {
    return (
      <div className="App">
        <h1>Game Over!</h1>
        <h2>You've used all your attempts</h2>

        <button onClick={() => window.location.reload()}>Restart</button>
      </div>
    );
  }

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
            <h3>Guess the Word</h3>
            <input
              type="text"
              value={guess}
              placeholder="Enter your guess"
              onChange={(e) => setGuess(e.target.value)}
            />
            <button onClick={handleGuessOnSumbit}>Submit Answer</button>

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
      </div>
    </div>
  );
}

export default App;
