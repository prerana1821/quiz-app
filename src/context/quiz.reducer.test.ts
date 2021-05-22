import { categoriesDB, quizzesDB } from "../database";
import { quizReducer } from "./quiz.reducer";
import { initialQuizState } from "./QuizProvider";
import { QuizAction, InitialQuizState } from "./quiz.reducer.types";
import { getScore } from "./../utils/utlis";
import { Category } from "../database/quizDB.types";
jest.mock('../utils/utlis.ts');

describe('testing quiz reducer', () => {
    test('should set quiz', () => {

        const action: QuizAction = {
            type: "SET_QUIZ",
            payload: { quizId: '1' }
        }

        const state = quizReducer(initialQuizState, action);

        // expect(state).toMatchObject({
        //     currentQuiz: quizzesDB[0],
        // })

        expect(state).toEqual(expect.objectContaining({
            quizzes: quizzesDB,
            categories: categoriesDB,
            currentQuestionNo: 0,
            score: 0,
            seconds: 10,
            viewByCategory: {},
            showAnswer: false,
            searchString: "",
            currentQuiz: quizzesDB[0]
        }));
    });

    test('should filter quiz by category', () => {

        const action: QuizAction = {
            type: "FILTER_CATEGORY_QUIZZES",
            payload: {
                category: {
                    id: '11',
                    name: 'Strokes',
                    noOfQuizzes: 1,
                    thumbnail: 'some url',
                    description: 'string',
                }
            }
        }

        const state = quizReducer(initialQuizState, action);

        expect(state).toEqual({
            quizzes: quizzesDB,
            categories: categoriesDB,
            currentQuestionNo: 0,
            searchString: "",
            score: 0,
            seconds: 10,
            viewByCategory: {
                id: '11',
                name: 'Strokes',
                noOfQuizzes: 1,
                thumbnail: 'some url',
                description: 'string',
            },
            showAnswer: false,
            currentQuiz: null,
        });
    });

    test('should set question number for selected quiz', () => {

        const quizState: InitialQuizState = {
            quizzes: quizzesDB,
            categories: categoriesDB,
            currentQuestionNo: 0,
            score: 0,
            seconds: 10,
            viewByCategory: {
                id: '11',
                name: 'Strokes',
                noOfQuizzes: 1,
                thumbnail: 'some url',
                description: 'string',
            },
            searchString: "",
            showAnswer: false,
            currentQuiz: quizzesDB[0],
        }

        const action: QuizAction = {
            type: "SET_CURRENT_QUESTION",
            payload: { questionNo: 0 }
        }

        const state = quizReducer(quizState, action);

        expect(state).toEqual({
            quizzes: quizzesDB,
            categories: categoriesDB,
            currentQuestionNo: 1,
            score: 0,
            seconds: 10,
            viewByCategory: {
                id: '11',
                name: 'Strokes',
                noOfQuizzes: 1,
                thumbnail: 'some url',
                description: 'string',
            },
            searchString: "",
            showAnswer: false,
            currentQuiz: quizzesDB[0],
        });
    });

    test('should set seconds for a question of a particular quiz', () => {
        const quizState: InitialQuizState = {
            quizzes: quizzesDB,
            categories: categoriesDB,
            currentQuestionNo: 1,
            score: 0,
            seconds: 10,
            viewByCategory: {
                id: '11',
                name: 'Strokes',
                noOfQuizzes: 1,
                thumbnail: 'some url',
                description: 'string',
            },
            searchString: "",
            showAnswer: false,
            currentQuiz: quizzesDB[0],
        }

        const action: QuizAction = {
            type: "SET_SECONDS",
            payload: { seconds: 3 }
        }

        const state = quizReducer(quizState, action);

        expect(state).toEqual({
            quizzes: quizzesDB,
            categories: categoriesDB,
            currentQuestionNo: 1,
            searchString: "",
            score: 0,
            seconds: 3,
            viewByCategory: {
                id: '11',
                name: 'Strokes',
                noOfQuizzes: 1,
                thumbnail: 'some url',
                description: 'string',
            },
            showAnswer: false,
            currentQuiz: quizzesDB[0],
        });
    });

    test('should set test for a question of a particular quiz, if seconds is a string', () => {
        const quizState: InitialQuizState = {
            quizzes: quizzesDB,
            categories: categoriesDB,
            currentQuestionNo: 1,
            score: 0,
            seconds: 10,
            viewByCategory: {
                id: '11',
                name: 'Strokes',
                noOfQuizzes: 1,
                thumbnail: 'some url',
                description: 'string',
            },
            searchString: "",
            showAnswer: false,
            currentQuiz: quizzesDB[0],
        }

        const action: QuizAction = {
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
            searchString: "",
            viewByCategory: {
                id: '11',
                name: 'Strokes',
                noOfQuizzes: 1,
                thumbnail: 'some url',
                description: 'string',
            },
            showAnswer: true,
            currentQuiz: quizzesDB[0],
        });
    })

    test('should set & display searched quizzes', () => {

        const quizState: InitialQuizState = {
            quizzes: quizzesDB,
            categories: categoriesDB,
            currentQuestionNo: 0,
            score: 0,
            seconds: 10,
            searchString: "",
            viewByCategory: {} as Category,
            showAnswer: false,
            currentQuiz: null,
        }

        const action: QuizAction = {
            type: "SEARCH_QUIZ",
            payload: { searchString: "cha" }
        }

        const state = quizReducer(quizState, action);
        expect(state).toEqual({
            quizzes: quizzesDB,
            categories: categoriesDB,
            currentQuestionNo: 0,
            score: 0,
            seconds: 10,
            searchString: "cha",
            viewByCategory: {},
            showAnswer: false,
            currentQuiz: null,
        });
    })


    test('should quit the quiz, bring everything to initial state', () => {
        const quizState: InitialQuizState = {
            quizzes: quizzesDB,
            categories: categoriesDB,
            currentQuestionNo: 1,
            score: 8,
            seconds: 7,
            viewByCategory: {
                id: '11',
                name: 'Strokes',
                noOfQuizzes: 1,
                thumbnail: 'some url',
                description: 'string',
            },
            searchString: "",
            showAnswer: true,
            currentQuiz: quizzesDB[0],
        }

        const action: QuizAction = {
            type: "QUIT_QUIZ"
        }

        const state = quizReducer(quizState, action);
        expect(state).toEqual({
            quizzes: quizzesDB,
            categories: categoriesDB,
            currentQuestionNo: 0,
            searchString: "",
            score: 0,
            seconds: 10,
            viewByCategory: {},
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
            searchString: "",
            viewByCategory: {
                id: '11',
                name: 'Strokes',
                noOfQuizzes: 1,
                thumbnail: 'some url',
                description: 'string',
            },
            showAnswer: false,
            currentQuiz: quizzesDB[0],
        }

        const action: QuizAction = {
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

        getScore.mockImplementation((): number => 10);

        const state = quizReducer(quizState, action);

        expect(state).toEqual({
            quizzes: quizzesDB,
            categories: categoriesDB,
            currentQuestionNo: 1,
            score: 10,
            seconds: "Good Job",
            viewByCategory: {
                id: '11',
                name: 'Strokes',
                noOfQuizzes: 1,
                thumbnail: 'some url',
                description: 'string',
            },
            searchString: "",
            showAnswer: true,
            currentQuiz: quizzesDB[0],
        });

        expect(getScore).toBeCalledWith(quizState, action);

    })
});