import React from "react";
import './QuizByContinent.css'
import { CONTINENTS } from "../../constants/QUIZ_CONTINENT";

const QuizByContinent = ({ setSelectedLevel }) => {
  const continents = CONTINENTS;

  return (
    <div className="byContinents">
      <h1 className="quiz-title">Choose a Continent</h1>
      <div className="continent-grid">
        {continents.map(continent =>
          <div onClick={()=>setSelectedLevel(continent)} key={continent.id} className="continent-card">
            <img
              src={continent.image}
              alt={continent.name}
              className="continent-image"
            />
            <h2 className="continent-name">
              {continent.name}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizByContinent;
