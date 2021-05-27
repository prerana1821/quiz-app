
export type Status = {
    loading?: string;
    success?: string;
    error?: ServerError;
}


export type ServerError = {
    errorMessage: string;
    errorCode: number;
}