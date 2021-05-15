import { createContext, useContext, useState } from "react";
import { quizes, Quiz } from "../database";

export const QuizContext = createContext<Quiz[] | null>(null);

export const QuizProvider = ({ children }) => {
  const [allQuizes, setQuiz] = useState<Quiz[] | null>(quizes);

  return (
    <QuizContext.Provider value={{ allQuizes, setQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  return useContext<Quiz[]>(QuizContext);
};
