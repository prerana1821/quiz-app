import { Link } from "react-router-dom";
import { useQuiz } from "../../context";
import { useEffect } from "react";
import "./Quiz.css";

export const QuizComp = () => {
  const {
    score,
    currentQuiz,
    seconds,
    showAnswer,
    quizDispatch,
    currentQuestionNo,
  } = useQuiz();

  useEffect(() => {
    let quizCounter;
    if (seconds > 0) {
      quizCounter = setTimeout(
        () =>
          quizDispatch({
            type: "SET_SECONDS",
            payload: { seconds: seconds - 1 },
          }),
        1000
      );
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

  return (
    <div>
      <div className='p-6 flex flex-col justify-between height'>
        <div>
          <h2 className='text-xl'>Timer: {seconds}</h2>
          <p className='text-2xl'>
            Question {currentQuestionNo + 1}/{currentQuiz.questions.length}
          </p>
          <p className='text-xl'>Score: {score}</p>
          <div>
            <p className='text-3xl'>
              {currentQuiz.questions[currentQuestionNo].text}
            </p>
            <div className='flex flex-col gap-4 py-4'>
              {currentQuiz.questions[currentQuestionNo].options.map(
                (answer) => {
                  return (
                    <button
                      key={answer.text}
                      disabled={showAnswer}
                      className={
                        showAnswer
                          ? answer.isCorrect
                            ? "btn green"
                            : "btn pink"
                          : "btn"
                      }
                      onClick={() =>
                        quizDispatch({
                          type: "SET_SCORE",
                          payload: { answer, currentQuestionNo, score },
                        })
                      }
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
          <Link to='/quizes'>
            <button className='btn'>Quit Quiz</button>
          </Link>
          {currentQuestionNo >= currentQuiz.questions.length - 1 ? (
            <Link to='/result'>
              <button className='btn'>Stop</button>
            </Link>
          ) : (
            <button
              className='btn'
              onClick={() => {
                // setSeconds(10);
                quizDispatch({
                  type: "CURRENT_QUESTION",
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
