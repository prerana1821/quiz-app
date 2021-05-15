import React from "react";
import { Link } from "react-router-dom";
import { useQuiz } from "../../context";

export const Quizes = () => {
  const { quizState } = useQuiz();

  return (
    <div>
      {quizState.map((quiz) => {
        return (
          <div key={quiz.id} className='bg-white shadow-lg rounded-2xl m-4'>
            <img
              src={quiz.thumbnail}
              alt={quiz.quizName}
              className='rounded-t-2xl w-full'
            />
            <div className='p-4 flex justify-between items-center'>
              <div>
                <h2 className='text-2xl text-left p-0'>{quiz.quizName}</h2>
                <p className='text-xl text-left'>{quiz.category}</p>
              </div>
              <Link to={`/quizes/${quiz.id}`}>
                <button className='text-white font-bold py-3.5 px-3 rounded-lg text-lg pink'>
                  Start Quiz
                </button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};
