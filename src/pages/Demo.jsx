import { useState } from "react";
import styles from "./Demo.module.scss";

export const Demo = ({ players, currentPlayer, currentUser, updatePlayer }) => {
  const [inventory, setInventory] = useState([]);

  const updateInventory = async (item) => {
    await players.updateOne(
      { _id: currentUser.id },
      { $push: { inventory: item } }
    );
    setInventory([item, ...inventory]);
    // updatePlayer();
  };

  return (
    <div className={styles.demo}>
      <h1>Demo</h1>
      <div className={styles.items}>
        <h2>Game</h2>
        <button onClick={() => updateInventory("key")}>key</button>
        <button onClick={() => updateInventory("note")}>note</button>
        <button onClick={() => updateInventory("microscope")}>
          microscope
        </button>
      </div>
      <div className={styles.info}>
        <h2>MongoDB</h2>
        <p>"location": {JSON.stringify(currentPlayer.location)}</p>
        <p>"inventory": {JSON.stringify(inventory)}</p>
        <p>"gameProgress": {JSON.stringify(currentPlayer.gameProgress)}</p>
      </div>
      <div className={styles.inventory}>
        <h2>Inventory</h2>
        {currentPlayer &&
          currentPlayer.inventory.map((item) => <button>{item}</button>)}
      </div>
      <div>
        <button onClick={() => updatePlayer()}>Update Game State</button>
      </div>
    </div>
  );
};

export default Demo;
