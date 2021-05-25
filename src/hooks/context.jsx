import { createContext, useContext } from "react";

export const RealmContext = createContext({ test: "this is a test" });

export const RealmProvider = ({ children }) => (
  <RealmContext.Provider value={{ test: "this is a test" }}>
    {children}
  </RealmContext.Provider>
);

export const useRealm = () => useContext(RealmContext);
