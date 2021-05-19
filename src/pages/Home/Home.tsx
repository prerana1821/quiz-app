import React from "react";
import { Link } from "react-router-dom";
import { useQuiz } from "../../context";

export const Home = () => {
  const { categories, quizDispatch } = useQuiz();

  return (
    <div>
      <h1 className='text-4xl'>Categories</h1>
      <div>
        {categories.map((category) => {
          return (
            <div
              key={category.id}
              className='bg-white shadow-lg rounded-2xl m-4'
            >
              <img
                src={category.thumbnail}
                alt={category.name}
                className='rounded-t-2xl w-full'
              />
              <div className='p-4 flex justify-between items-center'>
                <div>
                  <h2 className='text-2xl text-left p-0'>{category.name}</h2>
                  <p className='text-xl text-left'>{category.noOfQuizzes}</p>
                </div>
                <Link to={`/quizes`}>
                  <button
                    onClick={() =>
                      quizDispatch({
                        type: "CATEGORY_QUIZZES",
                        payload: { category },
                      })
                    }
                    className='text-white font-bold py-3.5 px-3 rounded-lg text-lg pink'
                  >
                    View Quizzes
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
