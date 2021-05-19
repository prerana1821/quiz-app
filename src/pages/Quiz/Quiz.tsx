import { useParams } from "react-router";
import { useQuiz } from "../../context";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Quiz.css";

export const Quiz = () => {
  const { quizId } = useParams();
  const { allQuizes } = useQuiz();
  const [quizQuestion, setQuizQuestion] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const [color, setColor] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number | string>(10);
  const quiz = allQuizes.find((quiz) => quiz.id === quizId);
  const getCurrentQuestion = (quiz, currentQuestion) => {
    return quiz.questions[currentQuestion - 1];
  };
  const question = getCurrentQuestion(quiz, quizQuestion);

  const getScore = (answer, question, score) => {
    if (answer.isCorrect) {
      setSeconds("Great Job");
      setColor(true);
      setScore(score + question.points);
    } else {
      setSeconds("Oopps!");
      setColor(true);
      setScore(score - question.negativePoints);
    }
  };

  useEffect(() => {
    let quizCounter;
    if (color) {
      setSeconds("Great Job");
    } else {
      if (seconds > 0) {
        quizCounter = setTimeout(() => setSeconds(seconds - 1), 1000);
      } else {
        setColor(true);
        setScore(score - question.negativePoints);
        setSeconds("Sorry! Try next time");
      }
    }
    return () => {
      clearTimeout(quizCounter);
    };
  }, [seconds, color]);

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
                  disabled={color}
                  className={
                    color ? (answer.isCorrect ? "btn green" : "btn") : "btn"
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
        <Link to='/quizes'>
          <button className='btn'>Quit Quiz</button>
        </Link>
        {quizQuestion > quiz.questions.length - 1 ? (
          <Link to='/result' state={{ score, quiz }}>
            <button className='btn'>Stop</button>
          </Link>
        ) : (
          <button
            className='btn'
            onClick={() => {
              setColor(false);
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
