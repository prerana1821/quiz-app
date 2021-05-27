import { getScore } from "../utils/utlis";
import { initialQuizState } from "./QuizProvider";
import { QuizAction, InitialQuizState } from "./quiz.reducer.types";
import { Category } from "../database/quizDB.types";

export const quizReducer = (
    state: InitialQuizState,
    action: QuizAction
): InitialQuizState => {
    switch (action.type) {
        case "SET_QUIZ":
            {
                const quiz = state.quizzes.find(
                    (quiz) => quiz.id === action.payload.quizId
                )
                if (quiz) {
                    return {
                        ...state,
                        currentQuestionNo: 0,
                        score: 0,
                        seconds: 10,
                        currentQuiz: quiz,
                    };
                } else {
                    return state;
                }
            }
        case "FILTER_CATEGORY_QUIZZES":
            return {
                ...state,
                viewByCategory: action.payload.category,
            };
        case "CLEAR_CATEGORY_QUIZZES":
            return {
                ...state,
                viewByCategory: {} as Category,
            };
        case "SEARCH_QUIZ":
            return {
                ...state,
                searchString: action.payload.searchString,
            };
        case "SET_CURRENT_QUESTION":
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
            return initialQuizState;
        default:
            throw new Error();
    }
};
