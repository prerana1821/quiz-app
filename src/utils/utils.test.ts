
import { ACTIONQUIZTYPE, InitialQuizState } from "../context/quiz.reducer.types";
import { categoriesDB, quizzesDB } from "../database";
import { Category } from "../database/quizDB.types";
import { getQuizzesByCatgeory, getScore } from "./utlis";


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
    });

    test('should filter categories', () => {
        const viewByCategory: Category = {
            id: '11',
            name: 'Strokes',
            noOfQuizzes: 1,
            thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP-9fmmfI8WbHzdsod7tTy__b4OE_ifPQtAg&usqp=CAU',
            description: 'string',
        };

        const state = getQuizzesByCatgeory(quizzesDB, viewByCategory)
        expect(state).toEqual([
            quizzesDB[0]
        ]);
    })

});