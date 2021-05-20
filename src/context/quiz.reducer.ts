import { getScore } from "../utils/utlis";
import { initialQuizState } from "./QuizProvider";
import { ACTIONQUIZTYPE, InitialQuizState } from "./quiz.reducer.types";

export const quizReducer = (
    state: InitialQuizState,
    action: ACTIONQUIZTYPE
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
                        currentQuiz: quiz,
                    };
                } else {
                    return state;
                }
            }
        case "CATEGORY_QUIZZES":
            return {
                ...state,
                viewByCategory: action.payload.category,
            };
        case "SEARCH_QUIZ":
            return {
                ...state,
                searchString: action.payload.searchString,
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
            return initialQuizState;
        default:
            return state;
    }
};
