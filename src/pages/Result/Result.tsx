import { Link } from "react-router-dom";
import { useQuiz, useTheme } from "../../context";
import { useLocation } from "react-router-dom";
import "./Result.css";

export const Result = () => {
  const { score, currentQuiz, quizDispatch } = useQuiz();
  const { state } = useLocation() as any;
  console.log({ state });

  const { theme } = useTheme();

  const totalScore = currentQuiz?.questions?.reduce((acc, value): number => {
    return acc + value.points;
  }, 0);

  return (
    <div className='quiz-result'>
      <h3 className='text-3xl'>
        {score < 3 ? "Ohh Noo, Sorry!" : "Congratulations!"} <br /> You have
        scored :
      </h3>
      <div className='show-score'>
        <p>
          <div className='text-8xl block'>{score}</div> out of {totalScore}
        </p>
      </div>
      <h3 className='text-2xl p-6'>You have earned {state.coins} coins</h3>
      <div className='shadow-lg rounded-lg p-8 mt-4	m-8'>
        <p>Attempted Questions: {state.resultState.attemptedQuestions}</p>
        <p>Total Questions: {state.questions}</p>
        <p>Right Answers: {state.resultState.rightAnswers}</p>
        <p>Wrong Answers: {state.resultState.wrongAnswers}</p>
      </div>
      <Link to={`/quiz-board/${currentQuiz?._id}`}>
        <button
          onClick={() => quizDispatch({ type: "CLEAR_CATEGORY_QUIZZES" })}
          style={{ boxShadow: theme.primaryBoxShadow }}
          className='btn pink m-4'
        >
          View Quiz Board
        </button>
      </Link>
      <Link to='/quizzes'>
        <button
          onClick={() => quizDispatch({ type: "CLEAR_CATEGORY_QUIZZES" })}
          style={{ boxShadow: theme.primaryBoxShadow }}
          className='btn pink'
        >
          Take New Quiz
        </button>
      </Link>
    </div>
  );
};
