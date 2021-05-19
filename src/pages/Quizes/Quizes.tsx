import React from "react";
import { Link } from "react-router-dom";
import { useQuiz } from "../../context";

export const Quizes = () => {
  const { categoryQuizzes, categories, quizDispatch } = useQuiz();

  const getCategoryName = (categoryId) => {
    const cat = categories.find((category) => category.id === categoryId);
    return cat.name;
  };

  return (
    <div className='flex flex-wrap'>
      {categoryQuizzes.map((quiz) => {
        return (
          <div
            key={quiz.id}
            className='w-full	max-w-sm	bg-white shadow-lg rounded-2xl m-4'
          >
            <img
              src={quiz.thumbnail}
              alt={quiz.quizName}
              className='rounded-t-2xl w-full h-60'
            />
            <div className='p-4 flex justify-between items-center'>
              <div>
                <h2 className='text-2xl text-left p-0'>{quiz.quizName}</h2>
                <p className='text-xl text-left'>
                  Category: {getCategoryName(quiz.categoryId)}
                </p>
              </div>
              <Link to={`/quizes/${quiz.id}`}>
                <button
                  onClick={() =>
                    quizDispatch({
                      type: "SET_QUIZ",
                      payload: { quizId: quiz.id },
                    })
                  }
                  className='text-white font-bold py-3.5 px-3 rounded-lg text-lg pink'
                >
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
