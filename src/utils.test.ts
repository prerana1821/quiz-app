
import { ACTIONQUIZTYPE, InitialQuizState } from "./context/quiz.reducer.types";
import { categoriesDB, quizzesDB } from "./database";
import { getScore } from "./utlis";


describe('should test utility function', () => {
    test('should calculate the score of user', () => {

        const quizState: InitialQuizState = {
            quizzes: quizzesDB,
            categories: categoriesDB,
            currentQuestionNo: 1,
            score: 5,
            seconds: 7,
            viewByCategory: "",
            showAnswer: false,
            currentQuiz: quizzesDB[0],
        }

        const action: ACTIONQUIZTYPE = {
            type: "SET_SCORE",
            payload: {
                answer: {
                    text: 'Backstroke',
                    isCorrect: true,
                },
                currentQuestionNo: 1,
                score: 5
            },
        }

        const state = getScore(quizState, action);
        expect(state).toBe(10);
    })
});