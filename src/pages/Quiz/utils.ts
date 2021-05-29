import axios, { AxiosError } from "axios";
import { ServerError, UserSolvedQuizzes } from "../../context";

export const getRandomIntInclusive = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const postSolvedQuizzes = async (
    quizId: String | undefined,
    score: number, coins: number, totalUserScore: number, knowledgeLevel: number
): Promise<UserSolvedQuizzes | ServerError | undefined> => {
    try {
        const response = await axios.post<{ solvedQuiz: UserSolvedQuizzes }>(
            "https://api-quizzel.prerananawar1.repl.co/user-details/solved-quizzes",
            { quizId, score, coins, totalScore: totalUserScore, knowledgeLevel }
        );
        console.log({ response });
        if (response.status === 201) {
            return response.data.solvedQuiz;
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const serverError = error as AxiosError<ServerError>;
            if (serverError && serverError.response) {
                return {
                    errorMessage: serverError.response.data.errorMessage,
                    errorCode: serverError.response.status,
                };
            }
        }
        console.log(error);
        return {
            errorMessage: "Something went wrong, Try Again!!",
            errorCode: 403,
        };
    }
};


export const sendSolvedQuizzes = async (
    quizId,
    score,
    dispatch,
    navigate,
    resultState,
    questions,
    coins,
    totalUserScore,
    knowledgeLevel
) => {
    dispatch({
        type: "SET_STATUS",
        payload: { status: { loading: "Adding Score..." } },
    });
    const quiz = await postSolvedQuizzes(quizId, score, coins, totalUserScore, knowledgeLevel);
    if (quiz && "quizId" in quiz) {
        dispatch({ type: "SET_STATUS", payload: { status: { loading: "" } } });
        dispatch({ type: "SET_SCORE", payload: { solvedQuiz: quiz } });
        dispatch({ type: "SET_USER_CREDITS", payload: { knowledgeLevel, totalScore: totalUserScore, coins } })
        navigate("/result", {
            state: {
                resultState,
                questions,
                quizId,
                coins
            },
        });
    }
    dispatch({
        type: "SET_STATUS",
        payload: { status: { error: quiz } },
    });
};


export const postUpdatedScore = async (
    quizId: string,
    score: number,
    coins: number,
    totalUserScore: number,
    knowledgeLevel: number
): Promise<number | ServerError> => {
    try {
        console.log({ quizId });
        const response = await axios.post(
            `https://api-quizzel.prerananawar1.repl.co/user-details/solved-quizzes/${quizId}`,
            {
                score,
                coins,
                totalScore: totalUserScore, knowledgeLevel
            }
        );
        console.log({ response });
        return response.status;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const serverError = error as AxiosError<ServerError>;
            if (serverError && serverError.response) {
                return {
                    errorMessage: serverError.response.data.errorMessage,
                    errorCode: serverError.response.status,
                };
            }
        }
        console.log(error);
        return {
            errorMessage: "Something went wrong, Try Again!!",
            errorCode: 403,
        };
    }
};

export const updateQuiz = async (
    quizId,
    score,
    dispatch,
    navigate,
    resultState,
    questions,
    coins,
    totalUserScore,
    knowledgeLevel
) => {
    dispatch({
        type: "SET_STATUS",
        payload: { status: { loading: "Updating Score..." } },
    });
    const response = await postUpdatedScore(quizId, score, coins, totalUserScore, knowledgeLevel);
    if (response === 204) {
        dispatch({ type: "SET_STATUS", payload: { status: { loading: "" } } });
        dispatch({
            type: "UPDATE_SCORE",
            payload: { quizId, score },
        });
        dispatch({ type: "UPDATE_USER_CREDITS", payload: { knowledgeLevel, totalScore: totalUserScore, coins } })
        navigate("/result", {
            state: {
                resultState,
                questions,
                quizId,
                coins
            },
        });
    }
    dispatch({
        type: "SET_STATUS",
        payload: { status: { error: response } },
    });
};
