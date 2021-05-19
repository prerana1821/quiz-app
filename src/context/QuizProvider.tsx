import { createContext, useContext, useReducer } from "react";
import { quizzesDB, Quiz, Options } from "../database";

export const QuizContext = createContext<Quiz[] | null>(null);

export type InitialQuizState = {
  quizzes: Quiz[];
  currentQuestionNo: number;
  score: number;
  seconds: number;
  showAnswer: boolean;
  currentQuiz: null | Quiz;
};

export const initialQuizState: InitialQuizState = {
  quizzes: quizzesDB,
  currentQuestionNo: 0,
  score: 0,
  seconds: 10,
  showAnswer: false,
  currentQuiz: null,
};

export const getScore = (state, action) => {
  if (action.payload.answer.isCorrect) {
    return (
      state.currentQuiz.questions[action.payload.currentQuestionNo].points +
      state.score
    );
  } else {
    return (
      state.score -
      state.currentQuiz.questions[action.payload.currentQuestionNo]
        .negativePoints
    );
  }
};

type ACTIONTYPE =
  | { type: "SET_QUIZ"; payload: { quizId: string } }
  | { type: "CURRENT_QUESTION"; payload: { questionNo: number } }
  | {
      type: "SET_SCORE";
      payload: { answer: Options; currentQuestionNo: number; score: number };
    }
  | { type: "SET_SECONDS"; payload: { seconds: number | string } }
  | { type: "QUIT_QUIZ" };

export const quizReducer = (
  state: typeof initialQuizState,
  action: ACTIONTYPE
) => {
  switch (action.type) {
    case "SET_QUIZ":
      return {
        ...state,
        currentQuiz: state.quizzes.find(
          (quiz) => quiz.id === action.payload.quizId
        ),
      };
    case "CURRENT_QUESTION":
      return {
        ...state,
        showAnswer: false,
        currentQuestionNo: action.payload.questionNo + 1,
        seconds: 10,
      };
    case "SET_SCORE":
      return {
        ...state,
        score: getScore(state, action),
        showAnswer: true,
        seconds: "Good Job",
      };
    // case "SET_SCORE":
    //   return {
    //     ...state,
    //     score: action.payload.answer.isCorrect
    //       ? state.currentQuiz.questions[action.payload.currentQuestionNo]
    //           .points + state.score
    //       : state.score -
    //         state.currentQuiz.questions[action.payload.currentQuestionNo]
    //           .negativePoints,
    //     showAnswer: true,
    //     seconds: "Good Job",
    //   };
    case "SET_SECONDS":
      return {
        ...state,
        seconds: action.payload.seconds,
        showAnswer: typeof action.payload.seconds === "string",
      };
    case "QUIT_QUIZ":
      console.log("cool");
      return initialQuizState;
    default:
      return state;
  }
};

export const QuizProvider = ({ children }) => {
  const [
    { quizzes, currentQuestionNo, score, currentQuiz, seconds, showAnswer },
    quizDispatch,
  ] = useReducer(quizReducer, initialQuizState);

  return (
    <QuizContext.Provider
      value={{
        quizzes,
        quizDispatch,
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
