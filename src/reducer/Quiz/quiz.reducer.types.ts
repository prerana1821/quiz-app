import { Category, Options, Quiz } from "../../database/quizDB.types";

export type InitialQuizState = {
    quizzes: Quiz[];
    categories: Category[];
    currentQuestionNo: number;
    score: number;
    seconds: number | string;
    showAnswer: boolean;
    viewByCategory: Category;
    searchString: string;
    currentQuiz: null | Quiz;
};

export type QuizAction =
    | { type: "SET_QUIZ"; payload: { quizId: string } }
    | { type: "SET_CURRENT_QUESTION"; payload: { questionNo: number } }
    | {
        type: "SET_SCORE";
        payload: { answer: Options; currentQuestionNo: number; score: number };
    }
    | { type: "SET_SECONDS"; payload: { seconds: number | string } }
    | { type: "SEARCH_QUIZ"; payload: { searchString: string } }
    | { type: "FILTER_CATEGORY_QUIZZES"; payload: { category: Category } }
    | { type: "CLEAR_CATEGORY_QUIZZES" }
    | { type: "QUIT_QUIZ" };
