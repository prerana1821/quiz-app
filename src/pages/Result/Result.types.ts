export type InitialResultState = {
    attemptedQuestions: number;
    rightAnswers: number;
    wrongAnswers: number;
};

export type ACTIONRESULTTYPE =
    | { type: "ATTEMPTED_QUESTIONS"; payload: { questions: number } }
    | { type: "RIGHT_ANSWERS"; payload: { rightAnswers: number } }
    | {
        type: "WRONG_ANSWERS";
        payload: { wrongAnswers: number };
    };
