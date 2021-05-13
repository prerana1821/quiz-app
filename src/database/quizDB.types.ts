export type Options = {
    text: string;
    isCorrect: boolean;
}
export type Questions = {
    text: string;
    points: number;
    negavtivePoints?: number;
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