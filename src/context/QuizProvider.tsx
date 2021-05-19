import { createContext, useContext, useReducer } from "react";
import { quizzesDB, Quiz, Options, categoriesDB } from "../database";
import { Category } from "../database/quizDB.types";

export const QuizContext = createContext<Quiz[] | null>(null);

export type InitialQuizState = {
  quizzes: Quiz[];
  categories: Category[];
  currentQuestionNo: number;
  score: number;
  seconds: number;
  showAnswer: boolean;
  viewByCategory: string;
  currentQuiz: null | Quiz;
};

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

export const getScore = (state: typeof initialQuizState, action): number => {
  if (action.payload.answer.isCorrect) {
    if (state.currentQuiz !== null) {
      return (
        state.currentQuiz.questions[action.payload.currentQuestionNo].points +
        state.score
      );
    } else {
      return state.score;
    }
  } else {
    if (state.currentQuiz !== null) {
      const question =
        state.currentQuiz.questions[action.payload.currentQuestionNo];
      return question.negativePoints
        ? state.score - question.negativePoints
        : 0;
    } else {
      return state.score;
    }
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
  | { type: "CATEGORY_QUIZZES"; payload: { category: Category } }
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
    case "CATEGORY_QUIZZES":
      return {
        ...state,
        viewByCategory: action.payload.category,
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

const getQuizzesByCatgeory = (quizzes, viewByCategory) => {
  return quizzes.filter((quiz) =>
    viewByCategory ? quiz.categoryId === viewByCategory.id : quiz
  );
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
