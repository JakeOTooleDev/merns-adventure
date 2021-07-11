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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const REALM_APP_ID = "mernadventure-ydamf";
  const app = new Realm.App({ id: REALM_APP_ID });

  const logOutUser = async () => {
    try {
      await app.currentUser.logOut();
    } catch (err) {
      console.error(err);
    }
  };

  const signUpUser = async (event) => {
    event.preventDefault();
    console.log("SIGN ME UP SON!", email, password);
    try {
      await app.emailPasswordAuth.registerUser(newEmail, newPassword);
      setEmail(newEmail);
      setPassword(newPassword);
      loginTestUser(event);
    } catch (err) {
      console.error(err);
    }
  };

  const loginTestUser = async (event) => {
    event.preventDefault();
    // * MongoDB Realm email/password login: https://docs.mongodb.com/realm/web/authenticate/#std-label-web-login-email-password
    const credentials = Realm.Credentials.emailPassword(email, password);
    try {
      const user = await app.logIn(credentials);
      console.log("Logged In:", user);
      setCurrentUser(user);
      setEmail("");
      setPassword("");
      setupPlayer();
    } catch (err) {
      console.error(err);
    }
  };

  const setupPlayer = async () => {
    // * Created collection handle following the MongoDB Data Access setup guide: https://docs.mongodb.com/realm/web/mongodb/#set-up-your-project
    const mongodb = app.currentUser.mongoClient("mongodb-atlas");
    const playerCollection = mongodb.db("mernsAdventure").collection("players");
    setPlayers(playerCollection);

    try {
      // Have to use playerCollection, because players will not have a value until after the first render cycle
      const player = await playerCollection.findOne({
        _id: app.currentUser.id,
      });
      setCurrentPlayer(player);
    } catch (err) {
      console.error(err);
    }
    console.log("User Logged In");
  };

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
        <h2>Log In</h2>
        <form onSubmit={loginTestUser}>
          <label htmlFor="email">E-mail</label>
          <InputText
            id="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
          <label htmlFor="password">Password</label>
          <Password
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
          <Button label="Submit" icon="pi pi-check" />
        </form>
      </div>
      <div>
        <h2>Sign Up</h2>
        <form onSubmit={signUpUser}>
          <label htmlFor="email">E-mail</label>
          <InputText
            id="email"
            onChange={(e) => {
              setNewEmail(e.target.value);
            }}
            value={newEmail}
          />
          <label htmlFor="password">Password</label>
          <Password
            id="password"
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
            value={newPassword}
          />
          <Button label="Submit" icon="pi pi-check" />
        </form>
      </div>
      <div>
        <h2>Log Out</h2>
        <Button
          label="Logout"
          onClick={() => {
            console.log("Get me out of here!");
            logOutUser();
          }}
        />
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
