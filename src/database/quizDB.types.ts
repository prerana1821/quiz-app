export type Options = {
    text: string;
    isCorrect: boolean;
}
export type Questions = {
    text: string;
    points: number;
    negativePoints?: number;
    options: Options[]
}

export type Quiz = {
    id: number;
    quizName: string;
    category: string;
    level: string;
    thumbnail: string;
    questions: Questions[]
}