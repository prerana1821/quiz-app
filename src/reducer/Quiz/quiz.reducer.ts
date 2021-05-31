import { getScore } from "../../utils/utlis";
import { initialQuizState } from "../../context/Quiz/QuizProvider";
import { QuizAction, InitialQuizState } from "./quiz.reducer.types";
import { Category } from "../../database/quizDB.types";

export const quizReducer = (
    state: InitialQuizState,
    action: QuizAction
): InitialQuizState => {
    switch (action.type) {
        case "SET_QUIZZES":
            return {
                ...state,
                quizzes: action.payload.data
            }
        case "SET_CATEGORIES":
            return {
                ...state,
                categories: action.payload.data
            }
        case "SET_STATUS":
            return {
                ...state,
                status: action.payload.status
            }
        case "SET_QUIZ":
            return {
                ...state,
                currentQuestionNo: 0,
                score: 0,
                seconds: 10,
                currentQuiz: action.payload.quiz,
            };

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
        case "SET_CURRENT_QUIZ_USER_SCORE":
            return {
                ...state,
                currentQuiz:
                    state.currentQuiz ?
                        {
                            ...state.currentQuiz,
                            highScore: state.currentQuiz.highScore
                                ? state.currentQuiz.highScore.concat({
                                    score: action.payload.score, id: "",
                                    userId: { username: action.payload.user.username }
                                })
                                : state.currentQuiz.highScore
                        }
                        : state.currentQuiz
            };
        case "UPDATE_CURRENT_QUIZ_USER_SCORE":
            return {
                ...state,
                currentQuiz:
                    state.currentQuiz ? {
                        ...state.currentQuiz,
                        highScore:
                            state.currentQuiz.highScore
                                ? state.currentQuiz.highScore.map((item) => {
                                    return item.userId.username === action.payload.user.username
                                        ? { ...item, score: action.payload.score } : item
                                }) : state.currentQuiz.highScore
                    } : state.currentQuiz
            }
        case "QUIT_QUIZ":
            return initialQuizState;
        default:
            throw new Error();
    }
};
