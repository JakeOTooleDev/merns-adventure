import { useEffect, useState } from "react";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";

import { handleAuthenticationError } from "../utils/MongoDB";

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
  const [signUpMessage, setSignUpMessage] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  // Followed code from MongoDB example for error handling https://github.com/mongodb-university/realm-tutorial-web/blob/final/src/components/LoginScreen.js
  const [error, setError] = useState({});

  // Used to clear messages to the user when the component re-renders
  useEffect(() => {
    setError({});
    setSignUpMessage("");
    setResetMessage("");
  }, []);

  const signUpUser = async (event) => {
    event.preventDefault();
    try {
      await app.emailPasswordAuth.registerUser(newEmail, newPassword);
      setSignUpMessage("Success! Check your e-mail to confirm your account!");
    } catch (error) {
      handleAuthenticationError(error, setError);
      console.error(error);
    }
  };

  const loginUser = async (event) => {
    event.preventDefault();
    // * MongoDB Realm email/password login: https://docs.mongodb.com/realm/web/authenticate/#std-label-web-login-email-password
    const credentials = Realm.Credentials.emailPassword(email, password);
    try {
      const user = await app.logIn(credentials);
      setEmail("");
      setPassword("");
      setupPlayer();
      setCurrentUser(user);
    } catch (error) {
      handleAuthenticationError(error, setError);
      console.error(error);
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

  const resetPassword = async () => {
    try {
      // https://docs.mongodb.com/realm/web/manage-email-password-users/#reset-a-user-s-password
      // await app.emailPasswordAuth.sendResetPasswordEmail(email);
      setResetMessage(
        "Password has been reset! Check for e-mail for further instructions."
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>MERN's Point and Click Adventure</h1>
      <div>
        <h2>Log In</h2>
        <form onSubmit={loginUser}>
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
          <Button label="Log In" icon="pi pi-check" />
        </form>
        <Button
          label="Reset Password"
          icon="pi pi-check"
          onClick={resetPassword}
        />
        <p>{resetMessage}</p>
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
          <Button label="Sign Up" icon="pi pi-check" />
          <p>{signUpMessage}</p>
          <p>{error.password}</p>
          <p>{error.email}</p>
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
