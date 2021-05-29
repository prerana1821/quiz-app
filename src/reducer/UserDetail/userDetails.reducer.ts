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
        default:
            throw new Error();
    }
}