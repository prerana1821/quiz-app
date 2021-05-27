import axios, { AxiosError } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "./../../images/loading.svg";
import { ServerError, useQuiz } from "../../context";
import { Quiz } from "../../database";
import { getCategoryName } from "../../utils/utlis";

export const Rules = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { quizzes, status, categories, quizDispatch } = useQuiz();

  console.log({ quizId });

  const getQuiz = quizzes.find((item) => {
    return item._id === quizId;
  });

  console.log({ getQuiz });

  const getSelectedQuiz = async () => {
    try {
      quizDispatch({
        type: "SET_STATUS",
        payload: { status: { loading: "Loading data from server..." } },
      });
      const response = await axios.get<{ quiz: Quiz }>(
        `https://api-quizzel.prerananawar1.repl.co/quizzes/${quizId}`
      );
      console.log({ response });
      if (response.status === 200) {
        quizDispatch({
          type: "SET_STATUS",
          payload: { status: { loading: "" } },
        });
        quizDispatch({
          type: "SET_QUIZ",
          payload: { quiz: response.data.quiz },
        });
        navigate(`/quizzes/${quizId}`);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<ServerError>;
        if (serverError && serverError.response) {
          return quizDispatch({
            type: "SET_STATUS",
            payload: {
              status: {
                error: {
                  errorMessage: serverError.response.data.errorMessage,
                  errorCode: serverError.response.data.errorCode,
                },
              },
            },
          });
        }
      }
      console.log(error.response);
      quizDispatch({
        type: "SET_STATUS",
        payload: {
          status: {
            error: {
              errorMessage: "Something went wrong",
              errorCode: 403,
            },
          },
        },
      });
    }
  };

  return (
    <div>
      <section className='shadow-xl rounded-2xl m-5 md:w-max p-6 flex justify-center flex-col m-auto'>
        {status.loading && (
          <img className='loading' src={Loading} alt='Loading' />
        )}
        <h2 className='text-4xl'>Instructions</h2>
        <p>{getQuiz?.quizName}</p>
        <p>
          Category:
          <span className='pink-txt'>
            {" "}
            {categories && getCategoryName(getQuiz!.categoryId._id, categories)}
          </span>
        </p>
        <p>
          This quiz is of level:
          <span className='pink-txt'> {getQuiz?.level}</span>
        </p>
        <p>
          There are a total of
          <span className='pink-txt'>
            {" "}
            {getQuiz?.questions?.length} questions
          </span>
        </p>
        <p>
          Each question is of <span className='pink-txt'> 5 points</span>.
        </p>
        <p>
          Every wrong answer has a negative marking of
          <span className='pink-txt'> 2 points</span>
        </p>
        <p>
          You get <span className='pink-txt'>30 seconds</span> to answer each
          question.
        </p>
        <button
          onClick={() => {
            getSelectedQuiz();
          }}
          className='text-white font-bold py-3.5 px-3 rounded-lg text-lg pink'
        >
          Start Quiz
        </button>
      </section>
    </div>
  );
};
