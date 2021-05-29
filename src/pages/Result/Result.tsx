import { Link } from "react-router-dom";
import { ServerError, useQuiz, useTheme } from "../../context";
import { useLocation } from "react-router-dom";
import "./Result.css";
import { useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useUserDetail } from "../../context/UserDetail/UserDetail";
import { UserSolvedQuizzes } from "../../context/UserDetail/userDetails.types";

// export const addSolvedQuizzes = async (quizId, score) => {
//   try {
//     const response = await axios.post<{ solvedQuizzes: UserSolvedQuizzes[] }>(
//       "https://api-quizzel.prerananawar1.repl.co/user-details/solved-quizzes",
//       { quizId, score }
//     );
//     console.log({ response });
//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       const serverError = error as AxiosError<ServerError>;
//       if (serverError && serverError.response) {
//         return {
//           errorMessage: serverError.response.data.errorMessage,
//           errorCode: serverError.response.status,
//         };
//       }
//     }
//     console.log(error);
//     return {
//       errorMessage: "Something went wrong, Try Again!!",
//       errorCode: 403,
//     };
//   }
// };

export const Result = () => {
  const { score, currentQuiz, quizDispatch } = useQuiz();
  const { state } = useLocation() as any;
  const { userDetailsDispatch } = useUserDetail();
  console.log({ state });

  const { theme } = useTheme();

  const totalScore = currentQuiz?.questions?.reduce((acc, value): number => {
    return acc + value.points;
  }, 0);

  useEffect(() => {
    if (state) {
      (async () => {
        // userDetailsDispatch({
        //   type: "SET_STATUS",
        //   payload: { status: { loading: "Loading data from server..." } },
        // });
        // const data = await addSolvedQuizzes(state.quizId, totalScore);
        // if ("_id" in response) {
        //   if (response.status === 201) {
        //   }
        // }
        // if ("_id" in solvedQuizzes) {
        //   userDetailsDispatch({
        //     type: "SET_STATUS",
        //     payload: { status: { loading: "" } },
        //   });
        //   return userDetailsDispatch({
        //     type: "SET_USER_DETAILS",
        //     payload: { data: solvedQuizzes },
        //   });
        // }
        // userDetailsDispatch({
        //   type: "SET_STATUS",
        //   payload: { status: { error: solvedQuizzes } },
        // });
      })();
    }
  }, [state]);

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
      <h3 className='text-2xl p-6'>You have earned 500 coins</h3>
      <div className='shadow-lg rounded-lg p-8 mt-4	m-8'>
        <p>Attempted Questions: {state.resultState.attemptedQuestions}</p>
        <p>Total Questions: {state.questions}</p>
        <p>Right Answers: {state.resultState.rightAnswers}</p>
        <p>Wrong Answers: {state.resultState.wrongAnswers}</p>
      </div>
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
