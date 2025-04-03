import React from "react";
import { QUIZ_LEVELS } from "../../constants/QUIZ_LEVELS";
import "./Quiz.css";

const QuizLevels = ({ selectedLevel, setSelectedLevel }) => {
  const levels = QUIZ_LEVELS;

  return (
    <div className="levelsCont">
      <h1 className="title">Guess Countries based on their flag!</h1>
      <div className="levelsFlex">
        {levels.map((level) => (
          <div
            key={level.id}
            className={`level-card ${level.className}`}
            onClick={() => setSelectedLevel(level)}
          >
            <div className="iconTitle9">
              <div className="icon">{level.icon}</div>
              <h2>{level.title}</h2>
            </div>
            <ul className="details">
              {level.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizLevels;
