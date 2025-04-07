import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import "./Quiz.css";
import QuizLevels from "./QuizLevels";
import QuizGame from "./QuizGame";

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
          : selectedLevel.id !== 'bycontinent' ? <QuizGame
              selectedLevel={selectedLevel}
              setSelectedLevel={setSelectedLevel}
            /> : <div>ByContinent</div>}
      </div>
    </div>
  );
};

export default Quiz;
