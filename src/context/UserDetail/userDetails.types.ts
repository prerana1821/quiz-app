import { Quiz } from "../../database"
import { InitialUserDetailsState, UserDetailsAction } from "../../reducer/UserDetail/UserDetails.types"

export type InitialUserDetailsContext = {
    userDetailsState: InitialUserDetailsState,
    userDetailsDispatch: (action: UserDetailsAction) => void,
}

export type UserSolvedQuizzes = {
    quizId: Quiz,
    score: number
}

export type UserDetails = {
    _id: string;
    knowledgeLevel: number;
    totalScore: number;
    coins: number;
    solvedQuizzes: UserSolvedQuizzes[]
}