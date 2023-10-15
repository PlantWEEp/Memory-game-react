import React, { useEffect, useMemo, useState } from "react";
import "./card.css";

export default function Cards() {
  const gameIcons = ["😘", "🥰", "❤️",  "😙", "😉", "😋", "😎", "🤨"];

  const [pieces, setPieces] = useState([]);
  const [Tries , setTries] = useState()

  const startgame = () => {
    const duplicateIcons = gameIcons.concat(gameIcons);
    const newGameIcons = [];

    while (newGameIcons.length < gameIcons.length * 2) {
      const randamIndex = Math.floor(Math.random() * duplicateIcons.length);
      newGameIcons.push({
        emoji: duplicateIcons[randamIndex],
        filpped: false,
        solved: false,
        position: newGameIcons.length,
      });
    }
    setPieces(newGameIcons);
    setTries(6)
  };

  useEffect(() => {
    startgame();
  }, []);

  const handleActive = (icons) => {
    const newPiece = pieces.map((piece) => {
      if (piece.position === icons.position) {
        piece.flipped = !piece.flipped;
      }
      return piece;
    });
    setPieces(newPiece);  console.log(newPiece);
  };
  const handleRestart = () => { 
    startgame();
  };
const TriesLeft = useMemo(()=>{
return Tries < 1
},[Tries])


  const gameFlipped = () => {
    const flippedData = pieces.filter((data) => data.flipped && !data.solved);
    if (flippedData.length === 2) {
      setTimeout(() => {
        if (flippedData[0].emoji === flippedData[1].emoji) {
          // Success logic
          setPieces((pieces) =>
            pieces.map((piece) => {
              if (
                piece.position === flippedData[0].position ||
                piece.position === flippedData[1].position
              ) {
                piece.solved = true;
              }
              return piece;
            })
          );
        } else {
          setPieces((pieces) =>
            pieces.map((piece) => {
              if (
                piece.position === flippedData[0].position ||
                piece.position === flippedData[1].position
              ) {
                piece.flipped = false;
              }
              return piece;
            })
          );
  
          // Decrement triesLeft when there's an unsuccessful match
          setTries(Tries - 1);
        }
      }, 800);
    }
  };
  
  
useEffect (()=>{
  gameFlipped()
},[pieces])

  return (
    <><div className="tries-left">Tries Left: {Tries}</div>
    <div className="heading"><h1>Memory Game</h1></div>
      <div className="container">
        {pieces.map((icons, index) => (
          <div
            className={`flip-card ${icons.flipped || icons.solved ? "active" : ""}`}
            key={index}
            onClick={() => {
              handleActive(icons);
            }}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front"></div>
              <div className="flip-card-back">{icons.emoji}</div>
            </div>
          </div>
        ))}
      </div>
      {
        TriesLeft &&(
          <div className="gameOver">
            <h4>
            GameOver
          </h4>
          <button className="restart-button" onClick={handleRestart}>
        Restart
      </button>
          </div>
        )
      }
    </>
  );
}
