import axios from "axios";
import { NavigateFunction } from "react-router";

export const localStorageHasItem = (key: string): string | null => {
    return localStorage.getItem(key) !== null ? localStorage.getItem(key) : null;
};

export const setupAuthHeaderForServiceCalls = (
    token: string
): string | undefined => {
    // console.log(token);
    if (token) {
        // console.log('works');
        return (axios.defaults.headers.common["Authorization"] = token);
    }
    delete axios.defaults.headers.common["Authorization"];
};

export const setUpUser = (
    username: string,
    id: string,
    token: string,
    email: string,
    setUser,
    setToken
): void => {
    setUser({
        _id: id,
        username: username,
        email: email,
    });
    setToken(token);
    localStorage?.setItem("token", JSON.stringify({ token: token }));
    localStorage?.setItem(
        "user",
        JSON.stringify({
            _id: id,
            username: username,
            email: email,
        })
    );
    setupAuthHeaderForServiceCalls(token);
};

export const setupAuthExceptionHandler = (
    logoutUser: () => void,
    navigate: NavigateFunction
): void => {
    const UNAUTHORIZED = 401;
    axios.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error?.response?.status === UNAUTHORIZED) {
                logoutUser();
                console.log("here");
                navigate("login");
            }
            return Promise.reject(error);
        }
    );
};