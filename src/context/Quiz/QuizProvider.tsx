import { createContext, useContext, useEffect, useReducer } from "react";
import { Category } from "../../database/quizDB.types";
import { getQuizzesByCatgeory, getSearchedQuiz } from "../../utils/utlis";
import { quizReducer } from "../../reducer/Quiz/quiz.reducer";
import { InitialQuizState } from "../../reducer/Quiz/quiz.reducer.types";
import { ContextInitialState } from "./quiz.types";
import { Status } from "../utils.types";
import { getCategories, getQuizzes } from "./utils";

export const QuizContext = createContext<ContextInitialState>(
  {} as ContextInitialState
);

export const initialQuizState: InitialQuizState = {
  quizzes: null,
  categories: null,
  currentQuestionNo: 0,
  score: 0,
  seconds: 10,
  viewByCategory: {} as Category,
  searchString: "",
  showAnswer: false,
  currentQuiz: null,
  status: {} as Status,
};

export const QuizProvider = ({ children }) => {
  useEffect(() => {
    (async () => {
      quizDispatch({
        type: "SET_STATUS",
        payload: { status: { loading: "Loading data from server..." } },
      });
      const categories = await getCategories();
      if (Array.isArray(categories)) {
        quizDispatch({
          type: "SET_STATUS",
          payload: { status: { loading: "" } },
        });
        return quizDispatch({
          type: "SET_CATEGORIES",
          payload: { data: categories },
        });
      }
      quizDispatch({
        type: "SET_STATUS",
        payload: { status: { error: categories } },
      });
    })();
  }, []);

  useEffect(() => {
    (async () => {
      quizDispatch({
        type: "SET_STATUS",
        payload: { status: { loading: "Loading data from server..." } },
      });
      const quizzes = await getQuizzes();
      if (Array.isArray(quizzes)) {
        quizDispatch({
          type: "SET_STATUS",
          payload: { status: { loading: "" } },
        });
        return quizDispatch({
          type: "SET_QUIZZES",
          payload: { data: quizzes },
        });
      }
      quizDispatch({
        type: "SET_STATUS",
        payload: { status: { error: quizzes } },
      });
    })();
  }, []);

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
      status,
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
        status,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  return useContext<ContextInitialState>(QuizContext);
};
