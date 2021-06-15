import { useState } from "react";
import styles from "./Demo.module.scss";

import outside from "./outside.png";
import livingRoom from "./livingRoom.png";
import study from "./study.png";

export const DemoLocation = ({
  players,
  currentPlayer,
  currentUser,
  updatePlayer,
}) => {
  const [location, setLocation] = useState("outside");

  const updateLocation = async (newLocation) => {
    await players.updateOne(
      { _id: currentUser.id },
      { $set: { location: newLocation } }
    );
    setLocation(newLocation);
  };

  const playerLoc = {
    outside: <img src={outside} />,
    livingRoom: <img src={livingRoom} />,
    study: <img src={study} />,
  };

  return (
    <div className={styles.demo}>
      <h1>Demo</h1>
      <div className={styles.game}>
        <h2>Game</h2>
        <div>{playerLoc[currentPlayer.location]}</div>
        <div className={styles.locations}>
          <button onClick={() => updateLocation("outside")}>outside</button>
          <button onClick={() => updateLocation("livingRoom")}>
            livingRoom
          </button>
          <button onClick={() => updateLocation("study")}>study</button>
        </div>
        <div className={styles.update}>
          <button onClick={() => updatePlayer()}>Update Game State</button>
        </div>
      </div>
      <div className={styles.info}>
        <h2>MongoDB</h2>
        <p>"location": {JSON.stringify(location)}</p>
        <p>"inventory": {JSON.stringify(currentPlayer.inventory)}</p>
        <p>"gameProgress": {JSON.stringify(currentPlayer.gameProgress)}</p>
      </div>
    </div>
  );
};

export default DemoLocation;
