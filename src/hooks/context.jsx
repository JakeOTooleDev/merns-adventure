import { createContext, useContext, useEffect, useState } from "react";
import * as Realm from "realm-web";

// !--------------------------------------------------------------
// ! This is currently broken and needs to be fixed.
// ! There is an issue with order in which stuff is being executed and how the 2 contexts are nested ... i think
// !--------------------------------------------------------------

// * Created Login and UserDetail following the Realm Web quickstart guide: https://docs.mongodb.com/realm/web/react-web-quickstart/
const REALM_APP_ID = "mernadventure-ydamf";
const app = new Realm.App({ id: REALM_APP_ID });

export const RealmContext = createContext({});
export const PlayerContext = createContext({});

export const RealmProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  // * Created collection handle following the MongoDB Data Access setup guide: https://docs.mongodb.com/realm/web/mongodb/#set-up-your-project
  const mongodb = app.currentUser.mongoClient("mongodb-atlas");
  const players = mongodb.db("mernAdventure").collection("player");

  useEffect(() => {
    const loginTestUser = async () => {
      const testCredentials = Realm.Credentials.emailPassword(
        "test@test.com",
        "testtest"
      );
      const cUser = await app.logIn(testCredentials);
      console.log(cUser);
      setCurrentUser(cUser);
    };
    loginTestUser();
  }, []);

  return (
    <RealmContext.Provider value={{ app, Realm, currentUser }}>
      {children}
    </RealmContext.Provider>
  );
};

export const PlayerProvider = ({ children }) => (
  <PlayerContext.Provider value={{ players }}>
    {children}
  </PlayerContext.Provider>
);

export const useRealm = () => useContext(RealmContext);
export const usePlayer = () => useContext(PlayerContext);
