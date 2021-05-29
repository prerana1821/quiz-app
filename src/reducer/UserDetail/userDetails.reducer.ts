import { InitialUserDetailsState, UserDetailsAction } from "./UserDetails.types";

export const userDetailsReducer = (state: InitialUserDetailsState, action: UserDetailsAction) => {
    switch (action.type) {
        case "SET_USER_DETAILS":
            return {
                ...state,
                _id: action.payload.data._id,
                knowledgeLevel: action.payload.data.knowledgeLevel,
                totalScore: action.payload.data.totalScore,
                coins: action.payload.data.coins,
                solvedQuizzes: action.payload.data.solvedQuizzes,
            }
        case "SET_STATUS":
            return { ...state, status: action.payload.status }
        case "SET_SCORE":
            return { ...state, solvedQuizzes: state.solvedQuizzes.concat(action.payload.solvedQuiz) }
        case "UPDATE_SCORE":
            return {
                ...state,
                solvedQuizzes:
                    state.solvedQuizzes.map((item) =>
                        item.quizId._id === action.payload.quizId ? { ...item, score: action.payload.score } : item)
            }
        case "SET_USER_CREDITS":
            return {
                ...state,
                knowledgeLevel: action.payload.knowledgeLevel,
                totalScore: action.payload.totalScore,
                coins: action.payload.coins,
            };
        case "UPDATE_USER_CREDITS":
            return {
                ...state,
                knowledgeLevel: action.payload.knowledgeLevel,
                totalScore: action.payload.totalScore,
                coins: action.payload.coins,
            };
        default:
            throw new Error();
    }
}