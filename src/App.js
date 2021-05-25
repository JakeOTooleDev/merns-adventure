import { useState } from "react";
import "./App.css";
import * as Realm from "realm-web";

import UserDetail from "./components/UserDetail";
import Login from "./components/Login";

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
    </div>
  );
}

export default App;
