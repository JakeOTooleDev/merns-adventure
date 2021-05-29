import { useEffect, useState } from "react";
import * as Realm from "realm-web";
import Main from "./pages/Main";

import styles from "./App.module.css";

const REALM_APP_ID = "mernadventure-ydamf";
const app = new Realm.App({ id: REALM_APP_ID });

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [currentPlayer, setCurrentPlayer] = useState({});

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
      const mongodb = app.currentUser.mongoClient("mongodb-atlas");

      const player = await mongodb
        .db("mernAdventure")
        .collection("player")
        .findOne({ username: "PotatoMan" });
      console.log(player);
      setCurrentPlayer(player);
    };
    loginTestUser();
  }, []);
  return (
    <div className={styles.App}>
      <Main currentUser={currentUser} currentPlayer={currentPlayer} />
    </div>
  );
}

export default App;
