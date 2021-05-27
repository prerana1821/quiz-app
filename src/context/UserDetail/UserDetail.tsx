import { createContext, useContext } from "react";

export const UserDetailContext = createContext({});

export const UserDetailProvider = () => {
  return <UserDetailContext.Provider value={{}}></UserDetailContext.Provider>;
};

export const useUserDetail = () => {
  return useContext<{}>(UserDetailContext);
};
