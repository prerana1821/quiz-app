import { InitialQuizState } from "../reducer/Quiz/quiz.reducer.types";
import { Quiz } from "../database";
import { Category } from "../database/quizDB.types";
import { InitialResultState } from "../reducer/Result/Result.types";

export const getCategoryName = (categoryId: string, categories: Category[]): string | undefined => {
    const cat = categories.find((category) => category._id === categoryId);
    return cat ? cat.name : undefined;
};


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
    console.log({ quizzes, viewByCategory });
    return quizzes.filter((quiz) =>
        (Object.keys(viewByCategory).length === 0 && viewByCategory.constructor === Object) ? quiz : quiz.categoryId._id === viewByCategory._id
    );
};

export const getSearchedQuiz = (
    categoryQuizzes: Quiz[],
    searchString: string
): Quiz[] => {
    return categoryQuizzes.filter((quiz) => {
        return searchString.length !== 1
            ? quiz.quizName
                .toLowerCase()
                .includes(searchString.toLowerCase().trim())
            : categoryQuizzes;
    });
};


export const getScore = (state: InitialQuizState, action): number => {
    if (action.payload.answer.isCorrect) {
        if (state.currentQuiz !== null && state.currentQuiz.questions) {
            return (
                state.currentQuiz.questions[action.payload.currentQuestionNo].points +
                state.score
            );
        } else {
            return state.score;
        }
    } else {
        if (state.currentQuiz !== null && state.currentQuiz.questions) {
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