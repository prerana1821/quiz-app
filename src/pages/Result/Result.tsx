import React from "react";
import { Link } from "react-router-dom";
import { useQuiz } from "../../context";
import { useLocation } from "react-router-dom";
import "./Result.css";
// import { InitialResultState } from "../Quiz/Quiz";

export const Result = () => {
  const { score, currentQuiz } = useQuiz();
  const { state } = useLocation();
  console.log({ state });

  const totalScore = currentQuiz.questions.reduce((acc, value): number => {
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
      <div>
        {/* <p>Attempted Questions: {state.resultState.attemptedQuestions}</p>
        <p>Total Questions: {state.questions}</p>
        <p>Right Answers: {state.resultState.rightAnswers}</p>
        <p>Wrong Answers: {state.resultState.wrongAnswers}</p> */}
      </div>
      <div className='shadow-lg rounded-lg p-8 mt-4	m-8'>
        <p>Attempted Questions: </p>
        <p>Total Questions: </p>
        <p>Right Answers: </p>
        <p>Wrong Answers: </p>
      </div>
      <Link to='/quizes'>
        <button className='btn pink'>Take New Quiz</button>
      </Link>
    </div>
  );
};
