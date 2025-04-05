import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import COUNTRY_NAMES_LIST from "../../constants/COUNTRY_NAMES_LIST";
import { startQuizAsync } from "../../readux/quiz-game";
import { OrbitProgress } from "react-loading-indicators";
import "./QuizGame.css";

const QuizGame = ({ selectedLevel, setSelectedLevel }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [inputCountry, setinputCountry] = useState("");

  const dispatch = useDispatch();
  const { status, countries, loading, error } = useSelector(
    (state) => state.quiz
  );
  const duration = useSelector((state) => state.quiz.duration);
  const attempts = useSelector((state) => state.quiz.attempts);

  const shuffle = (array) => {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getQuizzes = () => {
    if (selectedLevel?.mode === 1) {
      const unCountries = COUNTRY_NAMES_LIST.filter((country) => country.isUN);
      const commonNames = unCountries.map((country) =>
        Array.isArray(country.common) ? country.common[0] : country.common
      );
      const randomCommonNames = shuffle(commonNames).slice(0, 15);

      // Dispatch with logging
      dispatch(
        startQuizAsync({
          countryNames: randomCommonNames,
          mode: selectedLevel.mode
        })
      );
    } else if (selectedLevel?.mode === 2) {
      const unCountries = COUNTRY_NAMES_LIST.filter((country) => country.isUN);
      const commonNames = unCountries.map((country) =>
        Array.isArray(country.common) ? country.common[0] : country.common
      );
      const randomCommonNames = shuffle(commonNames).slice(0, 25);
      dispatch(
        startQuizAsync({
          countryNames: randomCommonNames,
          mode: selectedLevel.mode
        })
      );
    } else if (selectedLevel?.mode === 3) {
      const unCountries = COUNTRY_NAMES_LIST.filter((country) => country.isUN);
      const commonNames = unCountries.map((country) =>
        Array.isArray(country.common) ? country.common[0] : country.common
      );
      const randomCommonNames = shuffle(commonNames).slice(0, 35);
      dispatch(
        startQuizAsync({
          countryNames: randomCommonNames,
          mode: selectedLevel.mode
        })
      );
    }
  };

  const handleQuizCountry = () => {
    if (
      countries[currentIndex]?.name.toLocaleLowerCase() ===
      inputCountry.toLocaleLowerCase()
    ) {
      setScore(score + 1);
      setinputCountry("");
    } else {
      setinputCountry("");
    }
  };

  useEffect(() => {
    if (selectedLevel) {
      getQuizzes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLevel]);

  if (loading) {
    return (
      <OrbitProgress
        className="loading"
        variant="spokes"
        dense
        color="#1485d5"
        size="large"
        text="Loading.."
        textColor=""
      />
    );
  }

  if (status === "failed") {
    return <div>Failed to load quiz data: {error}</div>;
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % countries.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + countries.length) % countries.length
    );
  };

  return (
    <div className="quizContainer">
      <h2 className="hTitle">
        {selectedLevel?.icon} {selectedLevel?.title}
      </h2>
      <div className="headerQuiz">
        <span className="duration">⏳ {duration}s</span>
        <button className="centerButtonQuiz">🚀 </button>
        <span className="attempts">💡 {attempts}</span>
      </div>
      <div className="flagsSliderQuiz">
        <button className="prevBtnQuiz" onClick={prevSlide}>
          &#10094;
        </button>
        <div className="flag-slide">
          <img
            src={countries[currentIndex]?.flag}
            alt={countries[currentIndex]?.name}
            className="flag-img"
          />
        </div>
        <button className="nextBtnQuiz" onClick={nextSlide}>
          &#10095;
        </button>
      </div>
      <div className="inputQuizShi">
        <div className="lengthQuiz">
          {score}/{countries?.length}
        </div>
        <input
          value={inputCountry}
          onChange={(e) => setinputCountry(e.target.value)}
          className="inputQuiz"
          type="text"
          placeholder="Enter the name of the country whose flag is above"
        />
        <button onClick={handleQuizCountry} className="checkTheCountry">
          Check the country name
        </button>
      </div>
    </div>
  );
};

export default QuizGame;
