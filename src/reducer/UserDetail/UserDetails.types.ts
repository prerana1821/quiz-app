import { Status } from "../../context";
import { UserDetails, UserSolvedQuizzes } from "../../context/UserDetail/userDetails.types";

export type InitialUserDetailsState = {
    _id: string;
    knowledgeLevel: number;
    totalScore: number;
    coins: number;
    solvedQuizzes: UserSolvedQuizzes[],
    status: Status
}

export type UserDetailsAction =
    | { type: "SET_USER_DETAILS"; payload: { data: UserDetails } }
    | { type: "SET_STATUS"; payload: { status: Status } }
    | { type: "SET_SCORE"; payload: { solvedQuiz: UserSolvedQuizzes } }
    | { type: "UPDATE_SCORE"; payload: { quizId: string, score: number } }

