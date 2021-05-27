import axios from "axios";

export const localStorageHasItem = (key: string): string | null => {
    return localStorage.getItem(key) !== null ? localStorage.getItem(key) : null;
};

export const setupAuthHeaderForServiceCalls = (
    token: string
): string | undefined => {
    if (token) {
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