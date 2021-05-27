import { createContext, useContext, useReducer } from "react";
import { quizzesDB, categoriesDB } from "../../database";
import { Category } from "../../database/quizDB.types";
import { getQuizzesByCatgeory, getSearchedQuiz } from "../../utils/utlis";
import { quizReducer } from "../../reducer/Quiz/quiz.reducer";
import { InitialQuizState } from "../../reducer/Quiz/quiz.reducer.types";
import { ContextInitialState } from "./quiz.types";

export const QuizContext = createContext<ContextInitialState>(
  {} as ContextInitialState
);

export const initialQuizState: InitialQuizState = {
  quizzes: quizzesDB,
  categories: categoriesDB,
  currentQuestionNo: 0,
  score: 0,
  seconds: 10,
  viewByCategory: {} as Category,
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
  return useContext<ContextInitialState>(QuizContext);
};
