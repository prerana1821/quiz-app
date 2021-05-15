import { useParams } from "react-router";
import { useQuiz } from "../../context";
import { useState, useEffect } from "react";
import "./Quiz.css";

export const Quiz = () => {
  const { quizId } = useParams();
  const { quizState } = useQuiz();
  const [quizQuestion, setQuizQuestion] = useState(1);
  const [score, setScore] = useState(0);
  const [setColor, setSetColor] = useState(false);
  const quiz = quizState.find((quiz) => quiz.id === quizId);
  const getCurrentQuestion = (quiz, currentQuestion) => {
    return quiz.questions[currentQuestion - 1];
  };
  const question = getCurrentQuestion(quiz, quizQuestion);
  console.log(question);

  const getScore = (answer, question, score) => {
    if (answer.isCorrect) {
      setSeconds("Great Job");
      setSetColor(true);
      setScore(score + question.points);
    } else {
      setSeconds("Oopps!");
      setSetColor(true);
      setScore(score - question.negativePoints);
    }
  };

  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    console.log(score);
    console.log(question.negativePoints);
    if (setColor) {
      setSeconds("Great Job");
    } else {
      if (seconds > 0) {
        setTimeout(() => setSeconds(seconds - 1), 1000);
      } else {
        setSetColor(true);
        setScore(score - question.negativePoints);
        setSeconds("Sorry! Try next time");
      }
    }
  }, [seconds, setColor]);

  return (
    <div className='p-6 flex flex-col justify-between height'>
      <div>
        <h2 className='text-xl'>Timer: {seconds}</h2>
        <p className='text-2xl'>
          Question {quizQuestion}/{quiz.questions.length}
        </p>
        <p className='text-xl'>Score: {score}</p>
        <div>
          <p className='text-3xl'>{question.text}</p>
          <div className='flex flex-col gap-4 py-4'>
            {question.options.map((answer) => {
              return (
                <button
                  key={answer.text}
                  className={
                    setColor ? (answer.isCorrect ? "btn green" : "btn") : "btn"
                  }
                  onClick={() => getScore(answer, question, score)}
                >
                  {answer.text}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className='flex justify-between'>
        <button className='btn'>Quit Quiz</button>
        {quizQuestion > quiz.questions.length - 1 ? (
          <button className='btn'>Stop</button>
        ) : (
          <button
            className='btn'
            onClick={() => {
              setSetColor(false);
              setSeconds(10);
              setQuizQuestion(() => quizQuestion + 1);
            }}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};
