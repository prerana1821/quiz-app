import { createContext, useContext, useReducer } from "react";
import { quizzesDB, Quiz, categoriesDB } from "../database";
import { getQuizzesByCatgeory, getSearchedQuiz } from "../utils/utlis";
import { quizReducer } from "./quiz.reducer";
import { ContextInitialState, InitialQuizState } from "./quiz.reducer.types";

export const QuizContext = createContext<ContextInitialState>(
  {} as ContextInitialState
);

export const initialQuizState: InitialQuizState = {
  quizzes: quizzesDB,
  categories: categoriesDB,
  currentQuestionNo: 0,
  score: 0,
  seconds: 10,
  viewByCategory: "",
  searchString: "",
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
      searchString,
      score,
      currentQuiz,
      seconds,
      showAnswer,
    },
    quizDispatch,
  ] = useReducer(quizReducer, initialQuizState);

  const categoryQuizzes = getQuizzesByCatgeory(quizzes, viewByCategory);
  const searchedQuizzes = getSearchedQuiz(categoryQuizzes, searchString);

  return (
    <QuizContext.Provider
      value={{
        quizzes,
        quizDispatch,
        categories,
        searchedQuizzes,
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
  return useContext(QuizContext);
};
