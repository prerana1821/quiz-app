import { Link, useNavigate } from "react-router-dom";
import { useQuiz, useTheme } from "../../context";
import { useEffect, useReducer } from "react";
import Loading from "./../../images/loading.svg";
import { InitialResultState } from "../../reducer/Result/Result.types";
import { resultReducer } from "../../reducer/Result/result.reducer";
import { setResult } from "../../utils/utlis";
import { useUserDetail } from "../../context/UserDetail/UserDetail";
import { sendSolvedQuizzes, updateQuiz, getRandomIntInclusive } from "./utils";
import "./Quiz.css";

export const calculateTotalUserScore = (userDetailsState) => {
  return userDetailsState.solvedQuizzes.reduce((acc, value) => {
    return acc + value.score;
  }, 0);
};

export const initialResultState: InitialResultState = {
  attemptedQuestions: 0,
  rightAnswers: 0,
  wrongAnswers: 0,
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
  const { userDetailsState, userDetailsDispatch } = useUserDetail();
  const navigate = useNavigate();
  // const totalUserScore = userDetailsState.solvedQuizzes.reduce((acc, value) => {
  //   return acc + value.score;
  // }, 0);
  const knowledgeLevel =
    userDetailsState.knowledgeLevel +
    userDetailsState.solvedQuizzes.length +
    1 * 5;
  const coins = userDetailsState.coins + 5;
  // const coins = userDetailsState.coins + getRandomIntInclusive(100, 200);

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
        {userDetailsState.status.loading && (
          <img className='loading' src={Loading} alt='Loading' />
        )}
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
            <button
              onClick={() => {
                const check = userDetailsState.solvedQuizzes.some(
                  (item) => item.quizId._id === currentQuiz?._id
                );
                check
                  ? updateQuiz(
                      currentQuiz?._id,
                      score,
                      userDetailsDispatch,
                      navigate,
                      resultState,
                      currentQuiz?.questions?.length,
                      coins,
                      calculateTotalUserScore(userDetailsState),
                      knowledgeLevel
                    )
                  : sendSolvedQuizzes(
                      currentQuiz?._id,
                      score,
                      userDetailsDispatch,
                      navigate,
                      resultState,
                      currentQuiz?.questions?.length,
                      coins,
                      calculateTotalUserScore(userDetailsState),
                      knowledgeLevel
                    );
              }}
              className='btn'
              style={{ boxShadow: theme.primaryBoxShadow }}
            >
              Stop
            </button>
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
