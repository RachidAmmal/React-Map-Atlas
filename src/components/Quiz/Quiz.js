import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import "./Quiz.css";
import QuizLevels from "./QuizLevels";
import QuizGame from "./QuizGame";
import { useSelector } from "react-redux";

const Quiz = () => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const { countries } = useSelector(
    state => state.quiz
  );

  return (
    <div>
      <NavBar />
      <div className="game-container">
        {!selectedLevel 
          ? <QuizLevels
              selectedLevel={selectedLevel}
              setSelectedLevel={setSelectedLevel}
            />
          :<QuizGame
              selectedLevel={selectedLevel}
              setSelectedLevel={setSelectedLevel}
            />}
      </div>
    </div>
  );
};

export default Quiz;
