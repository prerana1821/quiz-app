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

export type UserScore = {
    id: string;
    userId: string;
    score: number;
}

export type Quiz = {
    id: string;
    quizName: string;
    categoryId: string;
    level: string;
    thumbnail: string;
    questions: Questions[]
    highScore: UserScore[]
}

export type Category = {
    id: string;
    name: string;
    noOfQuizzes: number;
    thumbnail: string;
    description: string;
}