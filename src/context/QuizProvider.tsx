import { createContext, useContext, useReducer } from "react";
import { quizes, Quiz } from "../database";

export const QuizContext = createContext<Quiz[] | null>(null);

export const quizReducer = () => { };

export const QuizProvider = ({ children }) => {
  const initialQuizState: Quiz[] = quizes;

  const [quizState, quizDispatch] = useReducer(quizReducer, initialQuizState);

  return (
    <QuizContext.Provider value={{ quizState, quizDispatch }}>{children}</QuizContext.Provider>
  );
};

export const useQuiz = () => {
  return useContext<Quiz[]>(QuizContext);
};
