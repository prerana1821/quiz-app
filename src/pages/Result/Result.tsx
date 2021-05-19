import React from "react";
import { Link } from "react-router-dom";
import { useQuiz } from "../../context";
import "./Result.css";

export const Result = () => {
  const { score, currentQuiz } = useQuiz();

  const totalScore = currentQuiz.questions.reduce((acc, value) => {
    return acc + value.points;
  }, 0);

  return (
    <div className='quiz-result'>
      <h3 className='text-3xl'>
        Congratulations! <br /> You have scored :
      </h3>
      <div className='show-score'>
        <p>
          <div className='text-8xl block'>{score}</div> out of {totalScore}
        </p>
      </div>
      <h3 className='text-2xl p-6'>You have earned 500 coins</h3>
      <Link to='/quizes'>
        <button className='btn pink'>Take New Quiz</button>
      </Link>
    </div>
  );
};
