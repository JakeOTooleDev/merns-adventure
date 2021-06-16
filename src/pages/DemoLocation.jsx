import { useState } from "react";
import styles from "./Demo.module.scss";
import ReactJson from "react-json-view";

import outside from "./outside.png";
import livingRoom from "./livingRoom.png";
import study from "./study.png";

export const DemoLocation = ({
  players,
  currentPlayer,
  currentUser,
  updatePlayer,
}) => {
  const [demoCurrentPlayer, setDemoCurrentPlayer] = useState(currentPlayer);

  const updateLocation = async (newLocation) => {
    await players.updateOne(
      { _id: currentUser.id },
      { $set: { location: newLocation } }
    );
    console.log(newLocation);
    setDemoCurrentPlayer({
      ...currentPlayer,
      _id: "abc123",
      location: newLocation,
    });
  };

  const playerLoc = {
    outside: <img src={outside} />,
    livingRoom: <img src={livingRoom} />,
    study: <img src={study} />,
  };

  return (
    <div className={styles.demo}>
      <div className={styles.game}>
        <h2>React</h2>
        <div>{playerLoc[currentPlayer.location]}</div>
        <div className={styles.locations}></div>
        <div className={styles.update}>
          <button onClick={() => updatePlayer()}>updatePlayer()</button>
        </div>
      </div>
      <div className={styles.nav}>
        <button onClick={() => updateLocation("outside")}>outside</button>
        <button onClick={() => updateLocation("livingRoom")}>livingRoom</button>
        <button onClick={() => updateLocation("study")}>study</button>
      </div>
      <div className={styles.info}>
        <h2>MongoDB</h2>
        {/* <p>"location": {JSON.stringify(demoCurrentPlayer.location)}</p>
        <p>"inventory": {JSON.stringify(currentPlayer.inventory)}</p>
        <p>"gameProgress": {JSON.stringify(currentPlayer.gameProgress)}</p> */}

        <ReactJson src={demoCurrentPlayer} style={{ fontSize: "34px" }} />
        <em>* Created with react-json-view</em>
      </div>
    </div>
  );
};

export default DemoLocation;
