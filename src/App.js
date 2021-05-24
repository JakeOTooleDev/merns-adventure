import { useState } from "react";
import "./App.css";
import * as Realm from "realm-web";

// * Created using the realm web quickstart guide: https://docs.mongodb.com/realm/web/react-web-quickstart/
const REALM_APP_ID = "mernadventure-ydamf";
const app = new Realm.App({ id: REALM_APP_ID });

const UserDetail = ({ user }) => (
  <div>
    <h1>Loggid in with anonymus id: {user.id}</h1>
  </div>
);

const Login = ({ setUser }) => {
  const loginAnonymous = async () => {
    try {
      const user = await app.logIn(Realm.Credentials.anonymous());
      setUser(user);
    } catch (err) {
      console.error("Error occurred trying to login", err);
    }
  };
  return <button onClick={loginAnonymous}>Log In</button>;
};

function App() {
  const [user, setUser] = useState(app.currentUser);

  return (
    <div className="App">
      <h1>Hello World</h1>
      <div>
        {user ? <UserDetail user={user} /> : <Login setUser={setUser} />}
      </div>
    </div>
  );
}

export default App;
