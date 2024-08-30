function GameOver() {
  return (
    <div>
      <p>Game Over! You've used all your attempts.</p>
      <button onClick={() => window.location.reload()}>Restart Game</button>
    </div>
  );
}

export default GameOver;
