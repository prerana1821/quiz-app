import React from "react";
import { Link } from "react-router-dom";
import { SearchQuiz } from "../../components";
import { useQuiz, useTheme } from "../../context";
import { getCategoryName } from "../../utils/utlis";

export const Quizes = () => {
  const { searchedQuizzes, categories } = useQuiz();
  const { theme } = useTheme();

  return (
    <>
      <div>
        <SearchQuiz />
      </div>
      <div className='flex flex-wrap'>
        {searchedQuizzes.map((quiz) => {
          return (
            <div
              style={theme}
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
                    Category: {getCategoryName(quiz.categoryId, categories)}
                  </p>
                </div>
                <Link to={`/rules/${quiz.id}`}>
                  <button className='text-white font-bold py-3.5 px-3 rounded-lg text-lg pink'>
                    Take Quiz
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
