import { InitialResultState, ResultAction } from "./Result.types";

export const resultReducer = (
    state: InitialResultState,
    action: ResultAction
) => {
    switch (action.type) {
        case "ATTEMPTED_QUESTIONS":
            return { ...state, attemptedQuestions: action.payload.questions + 1 };
        case "RIGHT_ANSWERS":
            return { ...state, rightAnswers: action.payload.rightAnswers + 1 };
        case "WRONG_ANSWERS":
            return { ...state, wrongAnswers: action.payload.wrongAnswers + 1 };
        default:
            throw new Error();
    }
};
