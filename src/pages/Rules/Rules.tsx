import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuiz } from "../../context";
import { getCategoryName } from "../../utils/utlis";

export const Rules = () => {
  const { quizId } = useParams();
  const { quizzes, categories, quizDispatch } = useQuiz();

  console.log({ quizId });

  const getQuiz = quizzes.find((item) => {
    return item.id === quizId;
  });

  return (
    <div>
      <section className='shadow-xl rounded-2xl m-5 w-max p-6 flex justify-center flex-col m-auto'>
        <h2 className='text-4xl'>Instructions</h2>
        <p>{getQuiz.quizName}</p>
        <p>
          Category:
          <span className='pink-txt'>
            {getCategoryName(getQuiz.categoryId, categories)}
          </span>
        </p>
        <p>
          This quiz is of level:
          <span className='pink-txt'>{getQuiz.level}</span>
        </p>
        <p>
          There are a total of
          <span className='pink-txt'>{getQuiz.questions.length} questions</span>
        </p>
        <p>
          Each question is of <span className='pink-txt'>5 points</span>.
        </p>
        <p>
          Every wrong answer has a negative marking of
          <span className='pink-txt'>2 points</span>
        </p>
        <p>
          You get <span className='pink-txt'>30 seconds</span> to answer each
          question.
        </p>
        <Link to={`/quizes/${quizId}`}>
          <button
            onClick={() =>
              quizDispatch({
                type: "SET_QUIZ",
                payload: { quizId: quizId },
              })
            }
            className='text-white font-bold py-3.5 px-3 rounded-lg text-lg pink'
          >
            Start Quiz
          </button>
        </Link>
      </section>
    </div>
  );
};
