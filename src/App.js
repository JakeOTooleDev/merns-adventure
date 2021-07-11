import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as Realm from "realm-web";

import Authentication from "./pages/Authentication";
import Confirmation from "./pages/Confirmation";
import Main from "./pages/Main";
import Reset from "./pages/Reset";

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import styles from "./App.module.scss";

function App() {
  const [currentPlayer, setCurrentPlayer] = useState({
    inventory: [],
  });
  const [currentUser, setCurrentUser] = useState(null);
  const [players, setPlayers] = useState({});

  const REALM_APP_ID = "mernadventure-ydamf";
  const app = new Realm.App({ id: REALM_APP_ID });

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
    <Router>
      <div className={`${styles.outer}`}>
        <Switch>
          <Route path="/reset">
            <Reset app={app} />
          </Route>
          <Route path="/confirmation">
            <Confirmation app={app} />
          </Route>
          <Route path="/">
            {currentUser ? (
              <Main
                app={app}
                className={styles.inner}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                currentPlayer={currentPlayer}
                players={players}
                updatePlayer={updatePlayer}
              />
            ) : (
              <Authentication
                app={app}
                Realm={Realm}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                currentPlayer={currentPlayer}
                setCurrentPlayer={setCurrentPlayer}
                players={players}
                setPlayers={setPlayers}
              />
            )}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
