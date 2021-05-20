import { ACTIONRESULTTYPE, InitialResultState } from "../Result/Result.types";
import { initialResultState } from "./Quiz";
import { resultReducer } from "./result.reducer";

describe('should test result reducer', () => {
    test('should check when user attempts question attemptedQuestions count should increase', () => {

        const action: ACTIONRESULTTYPE = {
            type: "ATTEMPTED_QUESTIONS",
            payload: {
                questions: 1,
            },
        }
        const state = resultReducer(initialResultState, action);
        expect(state).toEqual({
            attemptedQuestions: 2,
            rightAnswers: 0,
            wrongAnswers: 0,
        });
    });

    test('should increase rightAnswers count if user answers right', () => {

        const resultState: InitialResultState = {
            attemptedQuestions: 2,
            rightAnswers: 1,
            wrongAnswers: 0,
        }

        const action: ACTIONRESULTTYPE = {
            type: "RIGHT_ANSWERS",
            payload: {
                rightAnswers: 1,
            },
        }

        const state = resultReducer(resultState, action);
        expect(state).toEqual({
            attemptedQuestions: 2,
            rightAnswers: 2,
            wrongAnswers: 0,
        });
    });

    test('should increase wrongAnswers count if user answers wrong', () => {

        const resultState: InitialResultState = {
            attemptedQuestions: 2,
            rightAnswers: 1,
            wrongAnswers: 0,
        }

        const action: ACTIONRESULTTYPE = {
            type: "WRONG_ANSWERS",
            payload: {
                wrongAnswers: 1,
            },
        }

        const state = resultReducer(resultState, action);
        expect(state).toEqual({
            attemptedQuestions: 2,
            rightAnswers: 1,
            wrongAnswers: 2,
        });
    });


    test('should check default state', () => {

        const resultState: InitialResultState = {
            attemptedQuestions: 2,
            rightAnswers: 1,
            wrongAnswers: 0,
        }

        const action: ACTIONRESULTTYPE = {
            type: ""
        }

        const state = resultReducer(resultState, action);
        expect(state).toEqual({
            attemptedQuestions: 2,
            rightAnswers: 1,
            wrongAnswers: 0,
        });
    });

});
