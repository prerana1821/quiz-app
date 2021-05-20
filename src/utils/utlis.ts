import { initialQuizState } from "../context/QuizProvider";
import { Quiz } from "../database";
import { Category } from "../database/quizDB.types";
import { InitialResultState } from "../pages/Result/Result.types";

export const getCategoryName = (categoryId: string, categories: Category[]): string | undefined => {
    const cat = categories.find((category) => category.id === categoryId);
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
    return quizzes.filter((quiz) =>
        viewByCategory ? quiz.categoryId === viewByCategory.id : quiz
    );
};

export const getSearchedQuiz = (
    categoryQuizzes: Quiz[],
    searchString: string
): Quiz[] => {
    return categoryQuizzes.filter((quiz) => {
        // const searchValue = quiz.quizName.toLowerCase();
        // return searchString !== ""
        //   ? searchValue.indexOf(searchString.toLowerCase()) !== -1
        //   : categoryQuizzes;
        return searchString.length !== 1
            ? quiz.quizName
                .toLowerCase()
                .includes(searchString.toLowerCase().trim())
            : categoryQuizzes;
    });
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