import { useState } from "react";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";

export const Authentication = ({
  app,
  setCurrentUser,
  setCurrentPlayer,
  setPlayers,
  Realm,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const signUpUser = async (event) => {
    event.preventDefault();
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
      setEmail("");
      setPassword("");
      setupPlayer();
      setCurrentUser(user);
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
  };

  return (
    <div>
      <h1>MERN's Point and Click Adventure</h1>
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
          <label htmlFor="newEmail">E-mail</label>
          <InputText
            id="newEmail"
            onChange={(e) => {
              setNewEmail(e.target.value);
            }}
            value={newEmail}
          />
          <label htmlFor="newPassword">Password</label>
          <Password
            id="newPassword"
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
            value={newPassword}
          />
          <Button label="Submit" icon="pi pi-check" />
        </form>
      </div>
      <div>
        <ul>
          <li>
            Source Code:{" "}
            <a href="https://github.com/JakeOTooleDev/merns-adventure">
              Repository
            </a>
          </li>
          <li>
            Created by: <a href="https://www.jakeotoole.com">Jake O'Toole</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Authentication;
