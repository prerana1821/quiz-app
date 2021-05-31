import axios, { AxiosError } from "axios";
import { Category, Quiz } from "../../database/quizDB.types";
import { ServerError } from "../utils.types";

export const getCategories = async (): Promise<Category[] | ServerError> => {
    try {
        const response = await axios.get<{ categories: Category[] }>(
            "https://api-quizzel.prerananawar1.repl.co/categories"
        );
        console.log({ response });
        return response.data.categories;
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

export const getQuizzes = async (): Promise<Quiz[] | ServerError> => {
    try {
        const response = await axios.get<{ quizzes: Quiz[] }>(
            "https://api-quizzel.prerananawar1.repl.co/quizzes"
        );
        console.log({ response });
        return response.data.quizzes;
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
