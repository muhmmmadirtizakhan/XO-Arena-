import React, { useState, useEffect } from "react";
import "./startpage.css";

const StartPage = ({ onStart }) => {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animation on mount
    setIsVisible(true);
  }, []);

  const handleStart = () => {
    // Animation before starting
    setIsVisible(false);
    setTimeout(() => {
      onStart(player1, player2);
    }, 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && player1 && player2) {
      handleStart();
    }
  };

  return (
    <div className={`start-container ${isVisible ? 'visible' : ''}`}>
      <div className="background-animation">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
      
      <div className="content-wrapper">
        <div className="header-section">
          <h1 className="main-title">
            <span className="title-gradient">Tic Tac Toe</span>
          </h1>
          <p className="subtitle">Enter player names to begin the ultimate showdown</p>
        </div>

        <div className="player-inputs-container">
          <div className="player-card player-card-1">
            <div className="player-icon">
              <svg viewBox="0 0 100 100">
                <line x1="20" y1="20" x2="80" y2="80" strokeWidth="8" strokeLinecap="round"/>
                <line x1="80" y1="20" x2="20" y2="80" strokeWidth="8" strokeLinecap="round"/>
              </svg>
            </div>
            <h2 className="player-title">Player 1 <span className="player-symbol">(X)</span></h2>
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="Enter name"
                value={player1}
                onChange={(e) => setPlayer1(e.target.value)}
                onKeyPress={handleKeyPress}
                className="player-input"
                maxLength="12"
              />
              <div className="input-border"></div>
            </div>
            {player1 && <div className="input-feedback">Ready to play!</div>}
          </div>

          <div className="vs-badge">
            <span>VS</span>
          </div>

          <div className="player-card player-card-2">
            <div className="player-icon">
              <svg viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="38" strokeWidth="8" fill="none"/>
              </svg>
            </div>
            <h2 className="player-title">Player 2 <span className="player-symbol">(O)</span></h2>
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="Enter name"
                value={player2}
                onChange={(e) => setPlayer2(e.target.value)}
                onKeyPress={handleKeyPress}
                className="player-input"
                maxLength="12"
              />
              <div className="input-border"></div>
            </div>
            {player2 && <div className="input-feedback">Ready to play!</div>}
          </div>
        </div>

        <button
          className={`start-button ${!player1 || !player2 ? 'disabled' : ''}`}
          onClick={handleStart}
          disabled={!player1 || !player2}
        >
          <span className="button-text">Start Game</span>
          <span className="button-icon">→</span>
          <div className="button-shine"></div>
        </button>

        <div className="instructions">
          <h3>How to Play</h3>
          <ul>
            <li>Players take turns placing their symbols (X or O)</li>
            <li>First to get 3 in a row wins</li>
            <li>Can be horizontal, vertical, or diagonal</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StartPage;