import { categoriesDB, quizzesDB } from "../database";
import { quizReducer } from "./quiz.reducer";
import { initialQuizState } from "./QuizProvider";
import { ACTIONQUIZTYPE, InitialQuizState } from "./quiz.reducer.types";
import { getScore } from "../utlis";
jest.mock('./../utlis.ts');

describe('should test quiz reducer', () => {
    test('should set quiz', () => {

        const action: ACTIONQUIZTYPE = {
            type: "SET_QUIZ",
            payload: { quizId: '1' }
        }

        const state = quizReducer(initialQuizState, action);
        expect(state).toEqual({
            quizzes: quizzesDB,
            categories: categoriesDB,
            currentQuestionNo: 0,
            score: 0,
            seconds: 10,
            viewByCategory: "",
            showAnswer: false,
            currentQuiz: quizzesDB[0],
        });
    });

    test('should filter quiz by category', () => {

        const action: ACTIONQUIZTYPE = {
            type: "CATEGORY_QUIZZES",
            payload: {
                category: "Strokes"
            }
        }

        const state = quizReducer(initialQuizState, action);
        expect(state).toEqual({
            quizzes: quizzesDB,
            categories: categoriesDB,
            currentQuestionNo: 0,
            score: 0,
            seconds: 10,
            viewByCategory: "Strokes",
            showAnswer: false,
            currentQuiz: null,
        });
    });

    test('should set question no for selected quiz', () => {

        const quizState = {
            quizzes: quizzesDB,
            categories: categoriesDB,
            currentQuestionNo: 0,
            score: 0,
            seconds: 10,
            viewByCategory: "Strokes",
            showAnswer: false,
            currentQuiz: quizzesDB[0],
        }

        const action: ACTIONQUIZTYPE = {
            type: "CURRENT_QUESTION",
            payload: { questionNo: 1 }
        }

        const state = quizReducer(quizState, action);
        expect(state).toEqual({
            quizzes: quizzesDB,
            categories: categoriesDB,
            currentQuestionNo: 2,
            score: 0,
            seconds: 10,
            viewByCategory: "Strokes",
            showAnswer: false,
            currentQuiz: quizzesDB[0],
        });
    });

    test('should set seconds for a question of a particular quiz', () => {
        const quizState = {
            quizzes: quizzesDB,
            categories: categoriesDB,
            currentQuestionNo: 1,
            score: 0,
            seconds: 10,
            viewByCategory: "Strokes",
            showAnswer: false,
            currentQuiz: quizzesDB[0],
        }

        const action: ACTIONQUIZTYPE = {
            type: "SET_SECONDS",
            payload: { seconds: 3 }
        }

        const state = quizReducer(quizState, action);
        expect(state).toEqual({
            quizzes: quizzesDB,
            categories: categoriesDB,
            currentQuestionNo: 1,
            score: 0,
            seconds: 3,
            viewByCategory: "Strokes",
            showAnswer: false,
            currentQuiz: quizzesDB[0],
        });
    });

    test('should set test for a question of a particular quiz, if seconds is a string', () => {
        const quizState = {
            quizzes: quizzesDB,
            categories: categoriesDB,
            currentQuestionNo: 1,
            score: 0,
            seconds: 10,
            viewByCategory: "Strokes",
            showAnswer: false,
            currentQuiz: quizzesDB[0],
        }

        const action: ACTIONQUIZTYPE = {
            type: "SET_SECONDS",
            payload: { seconds: 'Time Out' }
        }

        const state = quizReducer(quizState, action);
        expect(state).toEqual({
            quizzes: quizzesDB,
            categories: categoriesDB,
            currentQuestionNo: 1,
            score: 0,
            seconds: 'Time Out',
            viewByCategory: "Strokes",
            showAnswer: true,
            currentQuiz: quizzesDB[0],
        });
    })

    test('should quit the quiz, bring everything to initial state', () => {
        const quizState = {
            quizzes: quizzesDB,
            categories: categoriesDB,
            currentQuestionNo: 1,
            score: 8,
            seconds: 7,
            viewByCategory: "Strokes",
            showAnswer: true,
            currentQuiz: quizzesDB[0],
        }

        const action: ACTIONQUIZTYPE = {
            type: "QUIT_QUIZ"
        }

        const state = quizReducer(quizState, action);
        expect(state).toEqual({
            quizzes: quizzesDB,
            categories: categoriesDB,
            currentQuestionNo: 0,
            score: 0,
            seconds: 10,
            viewByCategory: "",
            showAnswer: false,
            currentQuiz: null,
        });
    })

    test('should calculate score & show answer', () => {

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

        // jest.mock('getScore', () => 10);
        getScore.mockImplementation((): number => 10);

        const state = quizReducer(quizState, action);

        expect(state).toEqual({
            quizzes: quizzesDB,
            categories: categoriesDB,
            currentQuestionNo: 1,
            score: 10,
            seconds: "Good Job",
            viewByCategory: "",
            showAnswer: true,
            currentQuiz: quizzesDB[0],
        });

        expect(getScore).toBeCalledWith(quizState, action);

    })


    test('should check default state', () => {

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
            type: "Hello"
        }

        const state = quizReducer(quizState, action);

        expect(state).toEqual({
            quizzes: quizzesDB,
            categories: categoriesDB,
            currentQuestionNo: 1,
            score: 5,
            seconds: 7,
            viewByCategory: "",
            showAnswer: false,
            currentQuiz: quizzesDB[0],
        });
    })


});