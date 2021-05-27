import axios, { AxiosError } from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { NavigateFunction, useLocation, useNavigate } from "react-router";
import {
  LoginResponse,
  InitialAuthState,
  User,
  SignupResponse,
} from "./auth.types";
import { ServerError, Status } from "./../utils.types";
import { localStorageHasItem, setUpUser } from "./utils";

export const AuthContext = createContext<InitialAuthState>(
  {} as InitialAuthState
);

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

export const AuthProvider = ({ children }) => {
  const { state } = useLocation() as any;
  let savedToken = localStorageHasItem("token");
  if (savedToken) {
    savedToken = JSON.parse(savedToken);
  }
  const [token, setToken] = useState<string | null>(savedToken);
  const [user, setUser] = useState<User>({
    _id: "",
    username: "",
    email: "",
  });
  const [status, setStatus] = useState<Status>({
    loading: "",
    success: "",
    error: {} as ServerError,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const userFromLocalStorage = localStorageHasItem("user");
    if (userFromLocalStorage) {
      const userFromLocalStorageObj = JSON.parse(userFromLocalStorage);
      setUser(userFromLocalStorageObj);
    }

    setupAuthExceptionHandler(logout, navigate);
  }, []);

  const loginUserWithCredentials = async (
    username: string,
    password: string
  ) => {
    try {
      setStatus({ loading: "Wait! Checking..." } as Status);
      const response = await axios.post<LoginResponse>(
        "https://api-quizzel.prerananawar1.repl.co/auth/login",
        {
          username,
          password,
        }
      );
      console.log({ response });
      if (response.status === 200) {
        setUpUser(
          username,
          response.data.user._id,
          response.data.user.token,
          response.data.user.email,
          setUser,
          setToken
        );
        setStatus({
          success: `Login Successful. Welcome ${username}!`,
        } as Status);
        navigate(state?.from ? state.from : "/");
      }
    } catch (error) {
      console.log(error.response);
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<ServerError>;
        if (serverError && serverError.response) {
          return setStatus({
            error: {
              errorMessage: serverError.response.data.errorMessage,
              errorCode: serverError.response.data.errorCode,
            },
          } as Status);
        }
      }
      console.log(error.response);
      setStatus({ error: error.response.data.message } as Status);
    }
  };

  const signUpUserWithCredentials = async (
    username: string,
    password: string,
    email: string
  ) => {
    try {
      setStatus({ loading: "Wait! Checking..." } as Status);
      const response = await axios.post<SignupResponse>(
        "https://api-quizzel.prerananawar1.repl.co/auth/signup",
        {
          username,
          password,
          email,
        }
      );
      console.log({ response });
      if (response.status === 201) {
        setUpUser(
          username,
          response.data.user._id,
          response.data.user.token,
          email,
          setUser,
          setToken
        );
        setStatus({
          success: `Sign In Successful. Welcome ${username}!`,
        } as Status);
        navigate(state?.from ? state.from : "/");
      }
    } catch (error) {
      console.log(error.response);
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<ServerError>;
        if (serverError && serverError.response) {
          return setStatus({
            error: {
              errorMessage: serverError.response.data.errorMessage,
              errorCode: serverError.response.data.errorCode,
            },
          } as Status);
        }
      }
      console.log(error.response);
      setStatus({ error: error.response.data.message } as Status);
    }
  };

  const logout = (): void => {
    setToken("");
    setStatus({ loading: "", success: "", error: {} as ServerError });
    setUser({
      _id: "",
      username: "",
      email: "",
    });
    localStorage?.removeItem("token");
    localStorage?.removeItem("user");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        status,
        loginUserWithCredentials,
        signUpUserWithCredentials,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext<InitialAuthState>(AuthContext);
};
