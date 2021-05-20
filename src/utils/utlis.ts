import { initialQuizState } from "../context/QuizProvider";
import { Quiz } from "../database";
import { Category } from "../database/quizDB.types";
import { InitialResultState } from "../pages/Result/Result.types";

export const setResult = (
    correct: boolean,
    resultState: InitialResultState,
    dispatch
) => {
    return correct
        ? dispatch({
            type: "RIGHT_ANSWERS",
            payload: { rightAnswers: resultState.rightAnswers },
        })
        : dispatch({
            type: "WRONG_ANSWERS",
            payload: { wrongAnswers: resultState.wrongAnswers },
        });
};

export const getQuizzesByCatgeory = (
    quizzes: Quiz[],
    viewByCategory: Category
): Quiz[] => {
    return quizzes.filter((quiz) =>
        viewByCategory ? quiz.categoryId === viewByCategory.id : quiz
    );
};


export const getScore = (state: typeof initialQuizState, action): number => {
    if (action.payload.answer.isCorrect) {
        if (state.currentQuiz !== null) {
            return (
                state.currentQuiz.questions[action.payload.currentQuestionNo].points +
                state.score
            );
        } else {
            return state.score;
        }
    } else {
        if (state.currentQuiz !== null) {
            const question =
                state.currentQuiz.questions[action.payload.currentQuestionNo];
            return question.negativePoints
                ? state.score - question.negativePoints
                : 0;
        } else {
            return state.score;
        }
    }
};