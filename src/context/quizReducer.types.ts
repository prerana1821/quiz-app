import { Category, Options, Quiz } from "../database/quizDB.types";

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

export type ACTIONQUIZTYPE =
    | { type: "SET_QUIZ"; payload: { quizId: string } }
    | { type: "CURRENT_QUESTION"; payload: { questionNo: number } }
    | {
        type: "SET_SCORE";
        payload: { answer: Options; currentQuestionNo: number; score: number };
    }
    | { type: "SET_SECONDS"; payload: { seconds: number | string } }
    | { type: "CATEGORY_QUIZZES"; payload: { category: Category } }
    | { type: "QUIT_QUIZ" };
