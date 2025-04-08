import React from "react";
import "./QuizEnd.css";

const QuizEnd = ({
  score,
  selectedLevel,
  countries,
  locaAttemts,
  setSelectedLevel,
  seconds,
  minutes
}) => {
  const ratio = (score * 100 / countries).toFixed(2);

  const endCard = [
    { id: 1, name: "Mode", content: selectedLevel },
    { id: 2, name: "Guesses", content: score + "/" + countries },
    { id: 3, name: "Lives left", content: locaAttemts }
    //{ id: 4, name: "Time left", content: minutes + ":" + seconds  }
  ];

  return (
    <div className="QuizEnd">
      <h1>
        {ratio} %
      </h1>
      <div>
        {endCard.map(card => {
          return (
            <div className="detailsCard" key={card.id}>
              <h4>
                {card.name} :
              </h4>
              <h4 className="contentCard">
                {card.content}
              </h4>
            </div>
          );
        })}
      </div>
      <div className="tryAgain">
        <button onClick={() => setSelectedLevel(null)}>Try Again</button>
      </div>
    </div>
  );
};

export default QuizEnd;
