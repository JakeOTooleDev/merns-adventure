import { createContext, useContext } from "react";
import * as Realm from "realm-web";

// * Created Login and UserDetail following the Realm Web quickstart guide: https://docs.mongodb.com/realm/web/react-web-quickstart/
const REALM_APP_ID = "mernadventure-ydamf";
const app = new Realm.App({ id: REALM_APP_ID });

// * Created collection handle following the MongoDB Data Access setup guide: https://docs.mongodb.com/realm/web/mongodb/#set-up-your-project
const mongodb = app.currentUser.mongoClient("mongodb-atlas");
const player = mongodb.db("mernAdventure").collection("player");

export const RealmContext = createContext({});
export const PlayerContext = createContext({});

export const RealmProvider = ({ children }) => (
  <RealmContext.Provider value={{ app, Realm }}>
    {children}
  </RealmContext.Provider>
);

export const PlayerProvider = ({ children }) => (
  <PlayerContext.Provider value={{ player }}>{children}</PlayerContext.Provider>
);

export const useRealm = () => useContext(RealmContext);
export const usePlayer = () => useContext(PlayerContext);
