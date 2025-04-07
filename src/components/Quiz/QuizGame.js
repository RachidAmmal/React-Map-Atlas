import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import COUNTRY_NAMES_LIST from "../../constants/COUNTRY_NAMES_LIST";
import { startQuizAsync } from "../../readux/quiz-game";
import { OrbitProgress } from "react-loading-indicators";
import "./QuizGame.css";
import QuizEnd from "./QuizEnd";

const QuizGame = ({ selectedLevel, setSelectedLevel }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [inputCountry, setinputCountry] = useState("");
  const [flagAnimation, setflagAnimation] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isTrue, setisTrue] = useState("");

  const dispatch = useDispatch();
  const { status, countries, loading, error } = useSelector(
    (state) => state.quiz
  );
  const duration = useSelector((state) => state.quiz.duration);
  const attempts = useSelector((state) => state.quiz.attempts);

  const [localCountries, setLocalCountries] = useState([]);
  const [locaAttemts, setlocaAttemts] = useState(0);
  console.log(localCountries);

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
      const randomCommonNames = shuffle(commonNames).slice(0, 30);
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
      const randomCommonNames = shuffle(commonNames).slice(0, 60);
      dispatch(
        startQuizAsync({
          countryNames: randomCommonNames,
          mode: selectedLevel.mode
        })
      );
    }
  };

  const handleQuizCountry = () => {
    const currentCountry = localCountries[currentIndex];

    setIsRunning(true);

    if (currentCountry?.name.toLowerCase() === inputCountry.toLowerCase()) {
      const updatedCountries = localCountries.filter(
        (m) => m.name.toLowerCase() !== inputCountry.toLowerCase()
      );
      setScore(score + 1);
      setinputCountry("");
      setflagAnimation("flag-img-animation");
      
      setLocalCountries(updatedCountries);

      setisTrue("inputQuizSuc")
      setTimeout(() => {
        setisTrue("")
      }, 1000);
    } else {
      setinputCountry("");
      setlocaAttemts(locaAttemts - 1);
      setisTrue("inputQuizErr")
      setTimeout(() => {
        setisTrue("")
      }, 1000);
    }
  };

  useEffect(() => {
    if (countries.length > 0) {
      setLocalCountries(countries);
      setCurrentIndex(0);
      setScore(0);
      setinputCountry("");
      setlocaAttemts(attempts);
      setTimeLeft(duration);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attempts, countries]);

  useEffect(() => {
    if (selectedLevel) {
      getQuizzes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) {
      if (timeLeft <= 0 && isRunning) {
        setGameOver(true);
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    if(timer === 0){
      setSelectedLevel(null)
    }

    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning, timeLeft]);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");
  const timeDown = minutes + ":" +seconds
  console.log(timeDown)

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
    return (<div style={{textAlign: 'center'}}>
      <div style={{fontSize: '19px', fontWeight: "600", color: "red"}}>Failed to load quiz data: {error}</div>
      <button className="checkTheCountry" onClick={()=>setSelectedLevel(null)}>Try Again</button>
    </div>);
  }

  const nextSlide = () => {
    setIsRunning(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === localCountries.length - 1
        ? localCountries.length - 1
        : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setIsRunning(true);
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? 0 : prevIndex - 1));
  };

  return (
    <>
      {
        gameOver === false && locaAttemts > 0  ? (
          <div className="quizContainer">
          <h2 className="hTitle">
        {selectedLevel?.icon} {selectedLevel?.title}
      </h2>
      <div className="headerQuiz">
        <span className="duration">
          ⏳ {minutes}:{seconds}
        </span>
        <button onClick={()=>setGameOver(true)} className="centerButtonQuiz">🚀</button>
        <span className="attempts">💡 {locaAttemts}</span>
      </div>
      <div className="flagsSliderQuiz">
        <button style={{opacity: currentIndex === 0 ? "0" : "1"}} className="prevBtnQuiz" onClick={prevSlide}>
          &#10094;
        </button>

        <div className="flag-slide-wrapper">
          <div
            className="flag-slider-inner"
            style={{
              transform: `translateX(-${
                currentIndex * (100 / localCountries.length)
              }%)`,
              transition: "transform 0.5s ease-in-out",
              display: "flex",
              width: `${localCountries.length * 100}%`
            }}
          >
            {localCountries.map((ele, index) => (
              <div
                key={index}
                style={{
                  width: `${100 / localCountries.length}%`,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <img
                  src={ele?.flag}
                  alt={ele?.name}
                  className={`flag-img ${flagAnimation}`}
                  style={{
                    width: "100%",
                    objectFit: "contain"
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <button style={{opacity: currentIndex === localCountries.length - 1 ? "0" : "1"}} className="nextBtnQuiz" onClick={nextSlide}>
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
          className={`inputQuiz ${isTrue}`}
          type="text"
          placeholder="Input your guess here!"
        />
        <button
          disabled={inputCountry === "" && true}
          onClick={handleQuizCountry}
          className="checkTheCountry"
        >
          Check the country name
        </button>
      </div>
          </div>
        ) : <QuizEnd minutes={minutes} seconds={seconds} setSelectedLevel={setSelectedLevel} locaAttemts={locaAttemts} countries={countries?.length} score={score} selectedLevel={selectedLevel?.title}/>
      }
    </>
  );
};

export default QuizGame;
