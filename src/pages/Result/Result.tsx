import React from "react";
import { Link } from "react-router-dom";
import { useQuiz } from "../../context";

export const Result = () => {
  const { score, currentQuiz } = useQuiz();

  const totalScore = currentQuiz.questions.reduce((acc, value) => {
    return acc + value.points;
  }, 0);

  return (
    <div>
      <h3>Congratulations!</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, illum.
      </p>
      <h3>Your Score</h3>
      <p>
        {score} / {totalScore}
      </p>
      <h3>Eanred Coins</h3>
      <p>500</p>
      <Link to='/quizes'>
        <button className='btn pink'>Take New Quiz</button>
      </Link>
    </div>
  );
};
