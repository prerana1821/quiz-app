import { createContext, useContext, useReducer } from "react";
import { quizzesDB, Quiz, categoriesDB } from "../database";
import { getQuizzesByCatgeory } from "../utlis";
import { quizReducer } from "./quizReducer";
import { InitialQuizState } from "./quizReducer.types";

export const QuizContext = createContext<Quiz[] | null>(null);

export const initialQuizState: InitialQuizState = {
  quizzes: quizzesDB,
  categories: categoriesDB,
  currentQuestionNo: 0,
  score: 0,
  seconds: 10,
  viewByCategory: "",
  showAnswer: false,
  currentQuiz: null,
};
export const QuizProvider = ({ children }) => {
  const [
    {
      quizzes,
      categories,
      currentQuestionNo,
      viewByCategory,
      score,
      currentQuiz,
      seconds,
      showAnswer,
    },
    quizDispatch,
  ] = useReducer(quizReducer, initialQuizState);

  const categoryQuizzes = getQuizzesByCatgeory(quizzes, viewByCategory);

  return (
    <QuizContext.Provider
      value={{
        quizzes,
        quizDispatch,
        categories,
        categoryQuizzes,
        currentQuiz,
        score,
        seconds,
        showAnswer,
        currentQuestionNo,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  return useContext<Quiz[] | null>(QuizContext);
};
