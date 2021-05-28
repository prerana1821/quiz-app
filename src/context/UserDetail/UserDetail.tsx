import axios, { AxiosError } from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import { userDetailsReducer } from "../../reducer/UserDetail/userDetails.reducer";
import { InitialUserDetailsState } from "../../reducer/UserDetail/UserDetails.types";
import { useAuth } from "../Auth/AuthProvider";
import { ServerError, Status } from "../utils.types";
import { InitialUserDetailsContext, UserDetails } from "./userDetails.types";

export const UserDetailContext = createContext({} as InitialUserDetailsContext);

export const initialUserDetailsState: InitialUserDetailsState = {
  _id: "",
  knowledgeLevel: 0,
  totalScore: 0,
  coins: 0,
  status: {} as Status,
  solvedQuizzes: [],
};

export const getUserDetails = async (): Promise<UserDetails | ServerError> => {
  try {
    const response = await axios.get<{ userDetails: UserDetails }>(
      "https://api-quizzel.prerananawar1.repl.co/user-details"
    );
    console.log({ response });
    return response.data.userDetails;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      if (serverError && serverError.response) {
        return {
          errorMessage: serverError.response.data.errorMessage,
          errorCode: serverError.response.status,
        };
      }
    }
    console.log(error);
    return {
      errorMessage: "Something went wrong, Try Again!!",
      errorCode: 403,
    };
  }
};

export const UserDetailProvider = ({ children }) => {
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      (async () => {
        userDetailsDispatch({
          type: "SET_STATUS",
          payload: { status: { loading: "Loading data from server..." } },
        });
        const userDetails = await getUserDetails();
        if ("_id" in userDetails) {
          userDetailsDispatch({
            type: "SET_STATUS",
            payload: { status: { loading: "" } },
          });
          return userDetailsDispatch({
            type: "SET_USER_DETAILS",
            payload: { data: userDetails },
          });
        }
        userDetailsDispatch({
          type: "SET_STATUS",
          payload: { status: { error: userDetails } },
        });
      })();
    }
  }, [token]);

  const [userDetailsState, userDetailsDispatch] = useReducer(
    userDetailsReducer,
    initialUserDetailsState
  );

  console.log({ userDetailsState });

  return (
    <UserDetailContext.Provider
      value={{ userDetailsState, userDetailsDispatch }}
    >
      {children}
    </UserDetailContext.Provider>
  );
};

export const useUserDetail = () => {
  return useContext<InitialUserDetailsContext>(UserDetailContext);
};
