import { useEffect, useRef, useState } from "react";
import * as Realm from "realm-web";

import Main from "./pages/Main";

import styles from "./App.module.scss";

const REALM_APP_ID = "mernadventure-ydamf";
const app = new Realm.App({ id: REALM_APP_ID });

function App() {
  const [currentPlayer, setCurrentPlayer] = useState({
    inventory: [],
  });
  const [currentUser, setCurrentUser] = useState({});
  // * https://reactjs.org/docs/hooks-reference.html#useref
  // ? Still unsure if useRef is the proper hook to use in this case.
  // ? I think creating the mongodb object would make more sense if a normal login/logout setup existed. You'd want to re-render/update mongodb if a new user logged in.
  let mongodb = useRef({});

  useEffect(() => {
    const loginTestUser = async () => {
      // * MongoDB Realm email/password login: https://docs.mongodb.com/realm/web/authenticate/#std-label-web-login-email-password
      const testCredentials = Realm.Credentials.emailPassword(
        "test@test.com",
        "testtest"
      );
      const user = await app.logIn(testCredentials);
      setCurrentUser(user);

      // * Created collection handle following the MongoDB Data Access setup guide: https://docs.mongodb.com/realm/web/mongodb/#set-up-your-project
      mongodb.current = app.currentUser.mongoClient("mongodb-atlas");

      const player = await mongodb.current
        .db("mernsAdventure")
        .collection("players")
        .findOne({ username: "PotatoMan" });
      console.log(player);
      setCurrentPlayer(player);
    };
    loginTestUser();
  }, []);
  return (
    <div className={`${styles.outer}`}>
      <Main
        className={styles.inner}
        currentUser={currentUser}
        currentPlayer={currentPlayer}
        mongodb={mongodb}
      />
    </div>
  );
}

export default App;
