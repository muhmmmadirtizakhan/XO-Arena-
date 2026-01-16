import React, { useState, useEffect, useRef } from 'react'
import './Ticktacktoe.css'
import circle_icon from '../Assets/circle.png'
import cross_icon from '../Assets/cross.png'
import winSound from '../Assets/win.wav'
import bgMusic from '../Assets/bgmusic.mp3'

// YAHAN CHANGE KARO: player1 aur player2 ki jagah players object receive karo
const Ticktacktoe = ({ player1 = "Player 1", player2 = "Player 2", onBack }) => {

  // Destructure karo players object se
  // const { player1 = "Player 1", player2 = "Player 2" } = players || {};
  
  const [data, setData] = useState(Array(9).fill(""));
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentPlayer, setCurrentPlayer] = useState(player1);

  const littleref = useRef(null);
  const bgMusicRef = useRef(null);

  useEffect(() => {
    if (!bgMusicRef.current) {
      bgMusicRef.current = new Audio(bgMusic);
      bgMusicRef.current.loop = true;
    }

    const playAudio = async () => {
      try {
        await bgMusicRef.current.play();
      } catch (error) {
        console.log('Audio play failed:', error);
      }
    };

    playAudio();

    return () => {
      if (bgMusicRef.current) {
        try {
          bgMusicRef.current.pause();
          bgMusicRef.current.currentTime = 0;
        } catch (error) {
          console.log('Audio pause failed:', error);
        }
      }
    };
  }, []);

  useEffect(() => {
    // Update current player based on count
    setCurrentPlayer(count % 2 === 0 ? player1 : player2);
  }, [count, player1, player2]);

  const toggleMusic = () => {
    if (!bgMusicRef.current) return;

    setIsPlaying(!isPlaying);
    try {
      if (isPlaying) {
        bgMusicRef.current.pause();
      } else {
        bgMusicRef.current.play();
      }
    } catch (error) {
      console.log('Audio toggle failed:', error);
    }
  };

  const toggle = (num) => {
    if (lock || data[num] !== "") return;

    const newData = [...data];
    newData[num] = count % 2 === 0 ? "X" : "O";

    setData(newData);
    setCount(count + 1);
    checkWinner(newData);
  };

  const checkWinner = (d) => {
    const wins = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];

    for (let w of wins) {
      const [a,b,c] = w;
      if (d[a] && d[a] === d[b] && d[a] === d[c]) {
        won(d[a]);
        return;
      }
    }

    if (!d.includes("")) {
      littleref.current.innerHTML = "MATCH DRAW !";
      setLock(true);
    }
  };

  const won = (winner) => {
    setLock(true);

    // Use player names instead of "CROSS" or "CIRCLE"
    if (winner === "X") {
      littleref.current.innerHTML = `<strong>${player1}</strong> WON THE GAME !`;
      littleref.current.style.color = "#00ff00";
    } else {
      littleref.current.innerHTML = `<strong>${player2}</strong> WON THE GAME !`;
      littleref.current.style.color = "#ff4444";
    }

    try {
      const audio = new Audio(winSound);
      audio.play();
    } catch (error) {
      console.log('Win sound play failed:', error);
    }
  };

  const reset = () => {
    setData(Array(9).fill(""));
    setCount(0);
    setLock(false);
    setCurrentPlayer(player1);
    littleref.current.innerHTML = 'TIC-TACK-TOE IN <span>REACT</span>';
    littleref.current.style.color = "white";
  };

  return (
    <div className="container">

      <div className="music-controls">
        <button onClick={toggleMusic}>
          {isPlaying ? "🔊" : "🔇"}
        </button>
      </div>

      <h1 className="title" ref={littleref}>
        TIC-TACK-TOE IN <span>REACT</span>
      </h1>

      {/* Display players with their symbols */}
      <div className="players-info">
        <div className="player-info">
          <span className="player-name">{player1}</span>
          <img src={cross_icon} alt="X" className="player-icon-small" />
        </div>
        <div className="vs">VS</div>
        <div className="player-info">
          <span className="player-name">{player2}</span>
          <img src={circle_icon} alt="O" className="player-icon-small" />
        </div>
      </div>

      {/* Display current player turn */}
      <div className="current-player">
        <h2>Current Turn: <span>{currentPlayer} ({count % 2 === 0 ? "X" : "O"})</span></h2>
      </div>

      <div className="board">
        <div className="row">
          <div className="boxes" onClick={() => toggle(0)}>
            {data[0] && <img src={data[0] === "X" ? cross_icon : circle_icon} alt={data[0]} />}
          </div>
          <div className="boxes" onClick={() => toggle(1)}>
            {data[1] && <img src={data[1] === "X" ? cross_icon : circle_icon} alt={data[1]} />}
          </div>
          <div className="boxes" onClick={() => toggle(2)}>
            {data[2] && <img src={data[2] === "X" ? cross_icon : circle_icon} alt={data[2]} />}
          </div>
        </div>

        <div className="row">
          <div className="boxes" onClick={() => toggle(3)}>
            {data[3] && <img src={data[3] === "X" ? cross_icon : circle_icon} alt={data[3]} />}
          </div>
          <div className="boxes" onClick={() => toggle(4)}>
            {data[4] && <img src={data[4] === "X" ? cross_icon : circle_icon} alt={data[4]} />}
          </div>
          <div className="boxes" onClick={() => toggle(5)}>
            {data[5] && <img src={data[5] === "X" ? cross_icon : circle_icon} alt={data[5]} />}
          </div>
        </div>

        <div className="row">
          <div className="boxes" onClick={() => toggle(6)}>
            {data[6] && <img src={data[6] === "X" ? cross_icon : circle_icon} alt={data[6]} />}
          </div>
          <div className="boxes" onClick={() => toggle(7)}>
            {data[7] && <img src={data[7] === "X" ? cross_icon : circle_icon} alt={data[7]} />}
          </div>
          <div className="boxes" onClick={() => toggle(8)}>
            {data[8] && <img src={data[8] === "X" ? cross_icon : circle_icon} alt={data[8]} />}
          </div>
        </div>
      </div>

      <button className="reset" onClick={reset}>RESET</button>
      {onBack && <button className="back" onClick={onBack}>BACK TO MENU</button>}
    </div>
  );
};

export default Ticktacktoe;