import { Link } from "react-router-dom";
import { ServerError, useQuiz, useTheme } from "../../context";
import { useEffect, useReducer } from "react";
import "./Quiz.css";
import { InitialResultState } from "../../reducer/Result/Result.types";
import { resultReducer } from "../../reducer/Result/result.reducer";
import { setResult } from "../../utils/utlis";
import axios, { AxiosError } from "axios";
import { UserSolvedQuizzes } from "../../context/UserDetail/userDetails.types";
import { useUserDetail } from "../../context/UserDetail/UserDetail";

export const initialResultState: InitialResultState = {
  attemptedQuestions: 0,
  rightAnswers: 0,
  wrongAnswers: 0,
};

export const postSolvedQuizzes = async (
  quizId: String | undefined,
  score: number
): Promise<UserSolvedQuizzes | ServerError | undefined> => {
  try {
    const response = await axios.post<{ solvedQuiz: UserSolvedQuizzes }>(
      "https://api-quizzel.prerananawar1.repl.co/user-details/solved-quizzes",
      { quizId, score }
    );
    console.log({ response });
    if (response.status === 201) {
      return response.data.solvedQuiz;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      if (serverError && serverError.response) {
        return {
          errorMessage: serverError.response.data.errorMessage,
          errorCode: serverError.response.status,
        };
      }
    }
    console.log(error);
    return {
      errorMessage: "Something went wrong, Try Again!!",
      errorCode: 403,
    };
  }
};

const sendSolvedQuizzes = async (quizId, score, dispatch) => {
  dispatch({
    type: "SET_STATUS",
    payload: { status: { loading: "Adding Score..." } },
  });
  const quiz = await postSolvedQuizzes(quizId, score);
  if (quiz && "quizId" in quiz) {
    dispatch({ type: "SET_STATUS", payload: { status: { loading: "" } } });
    return dispatch({ type: "SET_SCORE", payload: { solvedQuiz: quiz } });
  }
  dispatch({
    type: "SET_STATUS",
    payload: { status: { error: quiz } },
  });
};
export const QuizComp = () => {
  const {
    score,
    currentQuiz,
    seconds,
    showAnswer,
    quizDispatch,
    currentQuestionNo,
  } = useQuiz();

  const { theme } = useTheme();
  const { userDetailsDispatch } = useUserDetail();

  useEffect(() => {
    let quizCounter;
    if (seconds > 0) {
      quizCounter = setTimeout(() => {
        if (typeof seconds === "number") {
          quizDispatch({
            type: "SET_SECONDS",
            payload: { seconds: seconds - 1 },
          });
        }
      }, 1000);
    } else {
      quizDispatch({
        type: "SET_SECONDS",
        payload: { seconds: "Time Out" },
      });
    }
    return () => {
      clearTimeout(quizCounter);
    };
  }, [seconds, showAnswer]);

  const [resultState, resultDispatch] = useReducer(
    resultReducer,
    initialResultState
  );

  return (
    <div>
      <div className='p-6 flex flex-col justify-between height md:w-7/12 md:m-auto'>
        <div>
          <h2 className='text-xl'>Timer: {seconds}</h2>
          <p className='text-2xl'>
            Question {currentQuestionNo + 1}/{currentQuiz?.questions?.length}
          </p>
          <p className='text-xl'>Score: {score}</p>
          <div>
            <p className='text-3xl'>
              {currentQuiz?.questions![currentQuestionNo].text}
            </p>
            <div className='flex flex-col gap-4 py-4'>
              {currentQuiz?.questions![currentQuestionNo].options.map(
                (answer) => {
                  return (
                    <button
                      key={answer.text}
                      disabled={showAnswer}
                      style={{ boxShadow: theme.primaryBoxShadow }}
                      className={
                        showAnswer
                          ? answer.isCorrect
                            ? "btn green"
                            : "btn tri-pink"
                          : "btn"
                      }
                      onClick={() => {
                        setResult(
                          answer.isCorrect,
                          resultState,
                          resultDispatch
                        );
                        resultDispatch({
                          type: "ATTEMPTED_QUESTIONS",
                          payload: {
                            questions: resultState.attemptedQuestions,
                          },
                        });
                        quizDispatch({
                          type: "SET_SCORE",
                          payload: { answer, currentQuestionNo, score },
                        });
                      }}
                    >
                      {answer.text}
                    </button>
                  );
                }
              )}
            </div>
          </div>
        </div>
        <div className='flex justify-between'>
          <Link to='/quizzes'>
            <button
              style={{ boxShadow: theme.primaryBoxShadow }}
              onClick={() => {
                quizDispatch({ type: "QUIT_QUIZ" });
                quizDispatch({ type: "CLEAR_CATEGORY_QUIZZES" });
              }}
              className='btn'
            >
              Quit Quiz
            </button>
          </Link>
          {currentQuestionNo >= currentQuiz!.questions!.length - 1 ? (
            <Link
              to='/result'
              state={{
                resultState,
                questions: currentQuiz?.questions?.length,
                quizId: currentQuiz?._id,
              }}
            >
              <button
                onClick={() =>
                  sendSolvedQuizzes(
                    currentQuiz?._id,
                    score,
                    userDetailsDispatch
                  )
                }
                className='btn'
                style={{ boxShadow: theme.primaryBoxShadow }}
              >
                Stop
              </button>
            </Link>
          ) : (
            <button
              className='btn'
              style={{ boxShadow: theme.primaryBoxShadow }}
              onClick={() => {
                quizDispatch({
                  type: "SET_CURRENT_QUESTION",
                  payload: { questionNo: currentQuestionNo },
                });
              }}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
