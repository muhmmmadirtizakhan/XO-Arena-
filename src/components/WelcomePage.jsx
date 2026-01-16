import React, { useState, useEffect } from "react";
import "./tictacktoe/startpage.css"; // Reuse the CSS for consistent design

const WelcomePage = ({ onEnterClick }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleEnter = () => {
    setIsVisible(false);
    setTimeout(() => {
      onEnterClick();
    }, 500);
  };

  return (
    <div className={`welcome-container ${isVisible ? 'visible' : ''}`}>
      <div className="background-animation">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      <div className="content-wrapper">
        <div className="header-section">
          <h1 className="main-title">
            <span className="title-gradient">Welcome to</span>
          </h1>
          <h1 className="main-title">
            <span className="title-gradient">Tic Tac Toe</span>
          </h1>
          <p className="subtitle">Get ready for an epic battle of wits!</p>
        </div>

        <button
          className="start-button"
          onClick={handleEnter}
        >
          <span className="button-text">Enter Game</span>
          <span className="button-icon">→</span>
          <div className="button-shine"></div>
        </button>

        <div className="instructions">
          <h3>How to Play</h3>
          <ul>
            <li>Enter your names</li>
            <li>Take turns placing X and O</li>
            <li>Get 3 in a row to win!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;