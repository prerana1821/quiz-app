import axios, { AxiosError } from "axios";
import { Link } from "react-router-dom";
import { ServerError, useTheme, useUserDetail } from "../../context";

export const MyActivity = () => {
  const { userDetailsState, userDetailsDispatch } = useUserDetail();
  const { theme } = useTheme();

  console.log({ userDetailsState });

  return (
    <div>
      <h1 className='text-3xl font-bold m-5'>Solved Quizzes</h1>
      <div>
        {userDetailsState.solvedQuizzes.map((quiz) => {
          return (
            <div
              style={theme}
              key={quiz.quizId._id}
              className='w-full	max-w-sm bg-white shadow-lg rounded-2xl m-4'
            >
              <img
                src={quiz.quizId.thumbnail}
                alt={quiz.quizId.quizName}
                className='rounded-t-2xl w-full h-60'
              />
              <div className='p-4 flex justify-between items-center'>
                <div>
                  <h2 className='text-2xl text-left p-0'>
                    {quiz.quizId.quizName}
                  </h2>
                  <p className='text-xl text-left'>Your Score: {quiz.score}</p>
                </div>
                <Link to={`/rules/${quiz.quizId._id}`}>
                  <button
                    // onClick={() =>

                    // }
                    className='text-white font-bold py-3.5 px-3 rounded-lg text-lg pink'
                  >
                    Try Again!
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
