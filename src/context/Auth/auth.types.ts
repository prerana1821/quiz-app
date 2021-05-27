export type InitialAuthState = {
    token: string | null,
    user: User,
    status: Status,
    loginUserWithCredentials: (username: string, password: string) => Promise<void>
    signUpUserWithCredentials: (username: string, password: string, email: string) => Promise<void>
    logout: () => void
}

export type User = {
    _id: string;
    username: string;
    email: string;
}

export type Status = {
    loading: string;
    success: string;
    error: string;
}