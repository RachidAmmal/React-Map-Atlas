import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import "./Quiz.css";
import QuizLevels from "./QuizLevels";
import QuizGame from "./QuizGame";
import QuizByContinent from "./QuizByContinent";

const Quiz = () => {
  const [selectedLevel, setSelectedLevel] = useState(null);

  return (
    <div>
      <NavBar />
      <div className="game-container">
        {!selectedLevel ? (
          <QuizLevels
            selectedLevel={selectedLevel}
            setSelectedLevel={setSelectedLevel}
          />
        ) : selectedLevel.id !== "bycontinent" ? (
          <QuizGame
            selectedLevel={selectedLevel}
            setSelectedLevel={setSelectedLevel}
          />
        ) : (
          <QuizByContinent setSelectedLevel={setSelectedLevel} />
        )}
      </div>
    </div>
  );
};

export default Quiz;
