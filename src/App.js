import { useState } from "react";
import * as Realm from "realm-web";

import Authentication from "./pages/Authentication";
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

  const REALM_APP_ID = "mernadventure-ydamf";
  const app = new Realm.App({ id: REALM_APP_ID });

  return (
    <div className={`${styles.outer}`}>
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
