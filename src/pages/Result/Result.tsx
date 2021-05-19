import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const Result = () => {
  const { state } = useLocation();

  console.log({ state });

  //   const totalScore = state?.quiz.questions.reduce((acc, value) => {
  //     return acc + value.points;
  //   }, 0);

  return (
    <div>
      <h3>Congratulations!</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, illum.
      </p>
      <h3>Your Score</h3>
      {/* <p>{state?.score} / {totalScore}</p> */}
      <h3>Eanred Coins</h3>
      <p>500</p>
      <Link to='/quizes'>
        <button>Take New Quiz</button>
      </Link>
    </div>
  );
};
