import { createContext, useContext, useEffect, useReducer } from "react";
import { quizzesDB, categoriesDB } from "../../database";
import { Category, Quiz } from "../../database/quizDB.types";
import { getQuizzesByCatgeory, getSearchedQuiz } from "../../utils/utlis";
import { quizReducer } from "../../reducer/Quiz/quiz.reducer";
import { InitialQuizState } from "../../reducer/Quiz/quiz.reducer.types";
import { ContextInitialState } from "./quiz.types";
import axios, { AxiosError } from "axios";
import { ServerError, Status } from "../utils.types";

export const QuizContext = createContext<ContextInitialState>(
  {} as ContextInitialState
);

export const initialQuizState: InitialQuizState = {
  quizzes: quizzesDB,
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

const getCategories = async (): Promise<Category[] | ServerError> => {
  try {
    const response = await axios.get<{ categories: Category[] }>(
      "https://api-quizzel.prerananawar1.repl.co/categories"
    );
    console.log({ response });
    return response.data.categories;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      if (serverError && serverError.response) {
        return {
          errorMessage: serverError.response.data.errorMessage,
          errorCode: serverError.response.status,
        };
      }
    }
    console.log(error);
    return { errorMessage: "Something went wrong", errorCode: 403 };
  }
};

const getQuizzes = async (): Promise<Quiz[] | ServerError> => {
  try {
    const response = await axios.get<{ quizzes: Quiz[] }>(
      "https://api-quizzel.prerananawar1.repl.co/quizzes"
    );
    console.log({ response });
    return response.data.quizzes;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      if (serverError && serverError.response) {
        return {
          errorMessage: serverError.response.data.errorMessage,
          errorCode: serverError.response.status,
        };
      }
    }
    console.log(error);
    return { errorMessage: "Something went wrong", errorCode: 403 };
  }
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
