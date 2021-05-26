import { useState } from "react";
import "./App.css";
import * as Realm from "realm-web";

import { RealmProvider } from "./hooks/context";
import Main from "./pages/Main";
import Login from "./components/Login";
import UserDetail from "./components/UserDetail";

// * Created Login and UserDetail following the Realm Web quickstart guide: https://docs.mongodb.com/realm/web/react-web-quickstart/
const REALM_APP_ID = "mernadventure-ydamf";
const app = new Realm.App({ id: REALM_APP_ID });

// * Created collection handle following the MongoDB Data Access setup guide: https://docs.mongodb.com/realm/web/mongodb/#set-up-your-project
const mongodb = app.currentUser.mongoClient("mongodb-atlas");
const player = mongodb.db("mernAdventure").collection("player");

function App() {
  const [user, setUser] = useState(app.currentUser);

  const getPlayer = async () => {
    const players = await player.find({});
    console.log(players);
  };

  return (
    <RealmProvider>
      <div className="App">
        <h1>Hello World</h1>
        <div>
          {user ? (
            <UserDetail user={user} />
          ) : (
            <Login app={app} Realm={Realm} setUser={setUser} />
          )}
        </div>
        <div>
          <button onClick={() => getPlayer()}>Find players</button>
        </div>
        <Main />
      </div>
    </RealmProvider>
  );
}

export default App;
