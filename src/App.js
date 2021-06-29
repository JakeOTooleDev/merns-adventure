import { useEffect, useState } from "react";
import * as Realm from "realm-web";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";

import Main from "./pages/Main";

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import styles from "./App.module.scss";

function App() {
  const [currentPlayer, setCurrentPlayer] = useState({
    inventory: [],
  });
  const [currentUser, setCurrentUser] = useState({});
  const [players, setPlayers] = useState({});
  // * https://reactjs.org/docs/hooks-reference.html#useref
  // ? Still unsure if useRef is the proper hook to use in this case.
  // ? I think creating the mongodb object would make more sense if a normal login/logout setup existed. You'd want to re-render/update mongodb if a new user logged in.
  // let mongodb = useRef({});

  useEffect(() => {
    const REALM_APP_ID = "mernadventure-ydamf";
    const app = new Realm.App({ id: REALM_APP_ID });

    const loginTestUser = async () => {
      // * MongoDB Realm email/password login: https://docs.mongodb.com/realm/web/authenticate/#std-label-web-login-email-password
      const testCredentials = Realm.Credentials.emailPassword(
        "test@test.com",
        "testtest"
      );
      try {
        const user = await app.logIn(testCredentials);
        setCurrentUser(user);
      } catch (err) {
        console.error(err);
      }

      // * Created collection handle following the MongoDB Data Access setup guide: https://docs.mongodb.com/realm/web/mongodb/#set-up-your-project
      const mongodb = app.currentUser.mongoClient("mongodb-atlas");
      const playerCollection = mongodb
        .db("mernsAdventure")
        .collection("players");
      setPlayers(playerCollection);
      console.log("currentUser", app.currentUser);
      try {
        // Have to use playerCollection, because players will not have a value until after the first render cycle
        const player = await playerCollection.findOne({
          _id: app.currentUser.id,
        });
        setCurrentPlayer(player);
      } catch (err) {
        console.error(err);
      }
    };
    loginTestUser();
  }, []);

  const updatePlayer = async () => {
    try {
      const player = await players.findOne({
        _id: currentUser.id,
      });
      setCurrentPlayer(player);
    } catch (err) {
      console.error("Error updating player:", err);
    }
  };

  return (
    <div className={`${styles.outer}`}>
      <div>
        <form>
          <label htmlFor="email">E-mail</label>
          <InputText id="email" />
          <label htmlFor="password">Password</label>
          <Password id="password" />
          <Button label="Submit" icon="pi pi-check" />
        </form>
      </div>
      {/* <Main
        className={styles.inner}
        currentUser={currentUser}
        currentPlayer={currentPlayer}
        players={players}
        updatePlayer={updatePlayer}
      /> */}
    </div>
  );
}

export default App;
