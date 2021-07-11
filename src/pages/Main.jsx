import cx from "classnames";
import { useState } from "react";

import LivingRoom from "../components/scences/living-room/LivingRoom";
import Outside from "../components/scences/outside/Outside";
import Study from "../components/scences/study/Study";

import Inventory from "../components/inventory/Inventory";
// import UserDetails from "../components/UserDetail";

import styles from "./Main.module.scss";

export const Main = ({
  app,
  className,
  currentPlayer,
  currentUser,
  setCurrentUser,
  updatePlayer,
  players,
}) => {
  const [activeItem, setActiveItem] = useState("");
  // storing location in app. Location is also stored in the database
  // current strategy is to use app state for location to try and speed up application
  const [message, setMessage] = useState("");

  const resetPlayer = async () => {
    await players.updateOne(
      { _id: currentUser.id },
      {
        _id: "60b2a06de0692265ebaeb90e",
        inventory: [],
        location: "outside",
        gameProgress: {
          keyPickedUp: false,
          microscopePickedUp: false,
          notePickedUp: false,
          livingLightOn: false,
          studyLightOn: false,
        },
      }
    );
    updatePlayer();
  };

  const logOutUser = async () => {
    try {
      await app.currentUser?.logOut();
      setCurrentUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  const onPlayerNavClick = async (to) => {
    try {
      await players.updateOne(
        { _id: currentUser.id },
        { $set: { location: to } }
      );
      updatePlayer();
    } catch (err) {
      console.error("Location not updated:", err);
    }
  };

  // const onSceneItemClick = async (item) => {
  //   const outcome = await currentUser.functions.pickUpItem(item);
  //   setMessage(`${outcome} on picking up ${item}.`);
  //   updatePlayer();
  // };

  const onInventoryItemClick = (item) => {
    setActiveItem(item);
  };

  const onLightClick = async (light) => {
    const lights = {
      livingRoom: {
        $set: {
          gameProgress: {
            ...currentPlayer.gameProgress,
            livingLightOn: !currentPlayer.gameProgress.livingLightOn,
          },
        },
      },
      study: {
        $set: {
          gameProgress: {
            ...currentPlayer.gameProgress,
            studyLightOn: !currentPlayer.gameProgress.studyLightOn,
          },
        },
      },
    };

    try {
      await players.updateOne({ _id: currentUser.id }, lights[light]);
      updatePlayer();
    } catch (err) {
      console.error("Error turning on light:", err);
    }
  };

  const onItemClick = async (item) => {
    const items = {
      key: {
        $set: {
          gameProgress: {
            ...currentPlayer.gameProgress,
            keyPickedUp: true,
          },
        },
      },
      note: {
        $set: {
          gameProgress: {
            ...currentPlayer.gameProgress,
            notePickedUp: true,
          },
        },
      },
      microscope: {
        $set: {
          gameProgress: {
            ...currentPlayer.gameProgress,
            microscopePickedUp: true,
          },
        },
      },
    };

    try {
      await players.updateOne(
        { _id: currentUser.id },
        { $push: { inventory: item } }
      );
      await players.updateOne({ _id: currentUser.id }, items[item]);
      updatePlayer();
    } catch (err) {
      console.error("Error adding item to inventory:", err);
    }
  };

  // const onActionItemClick = async (action) => {
  //   try {
  //     const outcome = await currentUser.functions.checkAction(
  //       action,
  //       activeItem
  //     );
  //     setMessage(`${outcome} on completing ${action}`);
  //   } catch (err) {
  //     console.error("Error executing action function:", err);
  //   }
  //   setActiveItem("");
  // };

  const cursorStyle = {
    [styles.keyCursor]: activeItem === "key",
    [styles.noteCursor]: activeItem === "note",
  };

  const locations = {
    livingRoom: (
      <LivingRoom
        className={styles.scene}
        onPlayerNavClick={onPlayerNavClick}
        sceneContainer={styles.sceneContainer}
        currentPlayer={currentPlayer}
        onLightClick={onLightClick}
        onItemClick={onItemClick}
      />
    ),
    outside: (
      <Outside
        className={styles.scene}
        onPlayerNavClick={onPlayerNavClick}
        sceneContainer={styles.sceneContainer}
        currentPlayer={currentPlayer}
        onLightClick={onLightClick}
      />
    ),
    study: (
      <Study
        className={styles.scene}
        onPlayerNavClick={onPlayerNavClick}
        sceneContainer={styles.sceneContainer}
        currentPlayer={currentPlayer}
        onLightClick={onLightClick}
        onItemClick={onItemClick}
      />
    ),
  };

  return (
    <div
      className={cx(styles.main, className)}
      onMouseDown={() => {
        setMessage("");
      }}
    >
      {/* <header className={styles.header}>
        <h1>MERN's Point and Click Adventure</h1>
        <UserDetails currentUser={currentUser} currentPlayer={currentPlayer} />
      </header> */}
      {/* <section
        className={cx(styles.gameplay, cursorStyle)}
        aria-label="gameplay"
      > */}
      {/* <div className={styles.sceneContainer}> */}
      {/* When app initially loads, get last location from player data. */}
      {/* Once the player has used a nav button, it will be using the apps state to figure out the location. */}
      {/* The theory is this will be more perfomative. The database will still be updated with the current location everytime. */}
      {/* Current risk is if the user loses their connection, they will be able to move around, but their location will not be saved */}
      {currentPlayer?.location
        ? locations[currentPlayer?.location]
        : locations[currentPlayer?.location]}
      {/* </div> */}
      {/* </section> */}
      <section className={styles.communication} aria-label="communication">
        <p>Communications to the player will appear here.</p>
        <div>{message}</div>
        <button onClick={resetPlayer}>Reset Player</button>
        <button
          onClick={() => {
            console.log("Get me out of here!");
            logOutUser();
            console.log("Current User", app.currentUser);
          }}
        >
          Logout
        </button>
      </section>
      <Inventory
        activeItem={activeItem}
        className={styles.inventory}
        currentPlayer={currentPlayer}
        onInventoryItemClick={onInventoryItemClick}
      />
      {/* <nav className={styles.nav}>
        Any menu options or navigation will go here.
      </nav> */}
    </div>
  );
};

export default Main;
