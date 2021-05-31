import { Link } from "react-router-dom";
import { Footer } from "../../components";
import { useQuiz, useTheme } from "../../context";
import Loading from "./../../images/loading.svg";
import QuizBanner from "./../../images/quiz-banner.png";
import "./Home.css";

export const Home = () => {
  const { categories, quizDispatch, status } = useQuiz();
  const { theme } = useTheme();

  return (
    <div style={theme}>
      <div className='banner flex justify-center items-center md:mx-12 mx-8 my-4'>
        <h1 className='md:text-5xl text-4xl md:px-9'>
          Your interactive and fun way to learn swimming with tips and tricks.
          <br />
          <Link to='/quizzes'>
            <button
              onClick={() => quizDispatch({ type: "CLEAR_CATEGORY_QUIZZES" })}
              className='btn pink my-3'
              style={{ boxShadow: theme.primaryBoxShadow }}
            >
              View Quizzes
            </button>
          </Link>
        </h1>
        <img className='w-full max-w-3xl' src={QuizBanner} alt='QuizBanner' />
      </div>
      {status.loading && (
        <img className='loading' src={Loading} alt='Loading' />
      )}
      <h1 className='text-4xl text-center'>Categories</h1>
      <div className='flex flex-wrap justify-center gap-12'>
        {categories?.map((category) => {
          return (
            <div
              style={theme}
              key={category._id}
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
                <Link to={`/quizzes`}>
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
