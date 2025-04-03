import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import "./Quiz.css";
import QuizLevels from "./QuizLevels";

const Quiz = () => {
  const [selectedLevel, setSelectedLevel] = useState(null);

  return (
    <div>
      <NavBar />
      <div className="game-container">
        {!selectedLevel
          ? <QuizLevels
              selectedLevel={selectedLevel}
              setSelectedLevel={setSelectedLevel}
            />
          : <div className="game-container">
              <h2 className="title">
                {selectedLevel.title} Mode
              </h2>
              <p>
                Now playing: {selectedLevel.details[0]}
              </p>
              <button
                className="back-button"
                onClick={() => setSelectedLevel(null)}
              >
                العودة
              </button>
            </div>}
      </div>
    </div>
  );
};

export default Quiz;
