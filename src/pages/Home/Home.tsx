import React from "react";
import { Link } from "react-router-dom";
import { Footer } from "../../components";
import { useQuiz } from "../../context";
import QuizBanner from "./../../images/quiz-banner.jpg";
import "./Home.css";

export const Home = () => {
  const { categories, quizDispatch } = useQuiz();

  return (
    <div>
      <div className='banner flex justify-center items-center md:mx-12 mx-8 my-4'>
        <h1 className='md:text-5xl text-4xl md:px-9'>
          Your interactive and fun way to learn swimming with tips and tricks.
          <br />
          <Link to='/quizes'>
            <button className='btn pink my-3'>View Quizzes</button>
          </Link>
        </h1>
        <img className='w-full max-w-3xl' src={QuizBanner} alt='QuizBanner' />
      </div>
      <h1 className='text-4xl text-center'>Categories</h1>
      <div className='flex flex-wrap justify-center gap-12'>
        {categories.map((category) => {
          return (
            <div
              key={category.id}
              className='w-full	max-w-sm bg-white shadow-lg rounded-2xl m-4'
            >
              <img
                src={category.thumbnail}
                alt={category.name}
                className='rounded-t-2xl w-full h-60'
              />
              <div className='p-4 flex justify-between items-center'>
                <div>
                  <h2 className='text-2xl text-left p-0'>{category.name}</h2>
                  <p className='text-xl text-left'>
                    Quizzes: {category.noOfQuizzes}
                  </p>
                </div>
                <Link to={`/quizes`}>
                  <button
                    onClick={() =>
                      quizDispatch({
                        type: "FILTER_CATEGORY_QUIZZES",
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
      <Footer />
    </div>
  );
};
