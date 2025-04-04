import React from "react";

const QuizGame = ({ selectedLevel, setSelectedLevel }) => {
  return (
    <div>
      <div className="game-container">
        <h2 className="title">
          {selectedLevel.title} Mode
        </h2>
        <p>
          Now playing: {selectedLevel.details[0]}
        </p>
        <button className="back-button" onClick={() => setSelectedLevel(null)}>
          العودة
        </button>
      </div>
    </div>
  );
};

export default QuizGame;
