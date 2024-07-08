import { getCurrentUser } from "./db/apiAuth";
import useFetch from "./hooks/useFetch";

const { createContext, useEffect, useContext } = require("react");

const UrlContext = createContext();

const UrlProvider = ({ children }) => {
  const {
    loading,
    data: user,
    error,
    fn: fetchUser,
  } = useFetch(getCurrentUser);
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
