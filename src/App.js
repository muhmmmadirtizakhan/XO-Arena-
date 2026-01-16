import React, { useState } from "react";
import WelcomePage from "./components/WelcomePage";
import StartPage from "./components/tictacktoe/startpage.jsx";
import Ticktacktoe from "./components/tictacktoe/Ticktacktoe.jsx";

function App() {
  const [currentPage, setCurrentPage] = useState("welcome"); // welcome, entry, game
  const [players, setPlayers] = useState({ player1: "", player2: "" });

  const goToEntryPage = () => {
    setCurrentPage("entry");
  };

  const goToGame = (player1, player2) => {
    setPlayers({ player1, player2 });
    setCurrentPage("game");
  };

  const goToWelcome = () => {
    setCurrentPage("welcome");
    setPlayers({ player1: "", player2: "" });
  };

  return (
    <div className="app-container">
      {currentPage === "welcome" && (
        <WelcomePage onEnterClick={goToEntryPage} />
      )}

      {currentPage === "entry" && (
        <StartPage onStart={goToGame} />
      )}

      {currentPage === "game" && (
        <Ticktacktoe
          player1={players.player1}
          player2={players.player2}
          onBack={goToWelcome}
        />
      )}
    </div>
  );
}

export default App;