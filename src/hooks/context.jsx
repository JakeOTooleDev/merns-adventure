import { createContext, useContext } from "react";
import * as Realm from "realm-web";

// * Created Login and UserDetail following the Realm Web quickstart guide: https://docs.mongodb.com/realm/web/react-web-quickstart/
const REALM_APP_ID = "mernadventure-ydamf";
const app = new Realm.App({ id: REALM_APP_ID });

export const RealmContext = createContext({});

export const RealmProvider = ({ children }) => (
  <RealmContext.Provider value={{ app, Realm }}>
    {children}
  </RealmContext.Provider>
);

export const useRealm = () => useContext(RealmContext);
