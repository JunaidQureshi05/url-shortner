import { getCurrentUser } from "./db/apiAuth";
import useFetch from "./hooks/useFetch";

import { createContext, useEffect, useContext } from "react";
const UrlContext = createContext();

const UrlProvider = ({ children }) => {
  const {
    loading,
    data: user,
    error,
    fn: fetchUser,
  } = useFetch(getCurrentUser);
  console.log("@@@@@@Junaid", user);
  const isAuthenticated = user?.role === "authenticated";

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <UrlContext.Provider value={{ user, fetchUser, loading, isAuthenticated }}>
      {children}
    </UrlContext.Provider>
  );
};

export const urlState = () => {
  return useContext(UrlContext);
};

export default UrlProvider;
