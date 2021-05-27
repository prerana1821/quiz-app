import { Status } from "../../context";
import { Category, Options, Quiz } from "../../database/quizDB.types";

export type InitialQuizState = {
    quizzes: Quiz[] | null;
    categories: Category[] | null;
    currentQuestionNo: number;
    score: number;
    seconds: number | string;
    showAnswer: boolean;
    viewByCategory: Category;
    searchString: string;
    currentQuiz: null | Quiz;
    status: Status;
};

export type QuizAction =
    | { type: "SET_QUIZZES"; payload: { data: Quiz[] } }
    | { type: "SET_CATEGORIES"; payload: { data: Category[] } }
    | { type: "SET_QUIZ"; payload: { quiz: Quiz } }
    | { type: "SET_STATUS"; payload: { status: Status } }
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
