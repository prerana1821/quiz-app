import { Category, Quiz } from "../../database/quizDB.types";
import { QuizAction } from "../../reducer/Quiz/quiz.reducer.types";
import { Status } from "../utils.types";

export type ContextInitialState = {
    quizzes: Quiz[];
    quizDispatch: (action: QuizAction) => void;
    categories: Category[] | null;
    searchedQuizzes: Quiz[];
    categoryQuizzes: Quiz[];
    currentQuiz: null | Quiz;
    score: number;
    seconds: number | string;
    showAnswer: boolean;
    currentQuestionNo: number;
    status: Status
}
