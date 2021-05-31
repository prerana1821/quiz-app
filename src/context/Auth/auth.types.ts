import { Status } from "../utils.types"

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

export type LoginResponse = {
    user: {
        _id: string;
        token: string;
        email: string
    }
}

export type SignupResponse = {
    user: {
        _id: string;
        token: string;
    }
}
