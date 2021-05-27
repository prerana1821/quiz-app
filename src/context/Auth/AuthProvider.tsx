import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router";
import { InitialAuthState, Status, User } from "./auth.types";

export const AuthContext = createContext<InitialAuthState>(
  {} as InitialAuthState
);

export const localStorageHasItem = (key) => {
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

export const setupUser = ({ data: { user } }, setUser, setToken) => {
  setUser({
    _id: user._id,
    username: user.username,
    email: user.email,
  });
  setToken(user.token);
  localStorage?.setItem("token", JSON.stringify({ token: user.token }));
  localStorage?.setItem(
    "user",
    JSON.stringify({
      _id: user._id,
      username: user.username,
      email: user.email,
    })
  );
  setupAuthHeaderForServiceCalls(user.token);
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
        console.log("here");
        logoutUser();
        navigate("login");
      }
      return Promise.reject(error);
    }
  );
};

export const AuthProvider = ({ children }) => {
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
    error: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    setupAuthExceptionHandler(logout, navigate);
  }, []);

  const loginUserWithCredentials = async (
    username: string,
    password: string
  ) => {
    try {
      setStatus({ loading: "Wait! Checking..." } as Status);
      const response = await axios.post(
        "https://api-quizzel.prerananawar1.repl.co/auth/login",
        {
          username,
          password,
        }
      );
      console.log({ response });
      if (response.status === 200) {
        // setUser({
        //   _id: response.data.user._id,
        //   username: response.data.user.username,
        //   email: response.data.user.email,
        // });
        // setToken(response.data.user.token);
        // localStorage?.setItem(
        //   "token",
        //   JSON.stringify({ token: response.data.user.token })
        // );
        // localStorage?.setItem(
        //   "user",
        //   JSON.stringify({
        //     _id: response.data.user._id,
        //     username: response.data.user.username,
        //     email: response.data.user.email,
        //   })
        // );
        // setupAuthHeaderForServiceCalls(response.data.user.token);
        setupUser(response, setUser, setToken);
        setStatus({
          success: `Login Successful. Welcome ${response.data.user.username}!`,
        } as Status);
      }
    } catch (error) {
      console.log(error.response);
      if (!error.success) {
        setStatus({ error: error.response.data.message } as Status);
      }
    }
  };

  const signUpUserWithCredentials = async (
    username: string,
    password: string,
    email: string
  ) => {
    try {
      setStatus({ loading: "Wait! Checking..." } as Status);
      const response = await axios.post(
        "https://api-quizzel.prerananawar1.repl.co/auth/signup",
        {
          username,
          password,
          email,
        }
      );
      console.log({ response });
      if (response.status === 201) {
        setupUser(response, setUser, setToken);
        setStatus({
          success: `Sign In Successful. Welcome ${response.data.user.username}!`,
        } as Status);
      }
    } catch (error) {
      console.log(error.response);
      if (!error.success) {
        setStatus({ error: error.response.data.message } as Status);
      }
    }
  };

  const logout = (): void => {
    setToken("");
    setStatus({ loading: "", success: "", error: "" });
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
