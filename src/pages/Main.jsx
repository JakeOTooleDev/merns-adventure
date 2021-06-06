import cx from "classnames";
import { useState } from "react";

import LivingRoom from "../components/scences/living-room/LivingRoom";
import Outside from "../components/scences/outside/Outside";
import Study from "../components/scences/study/Study";

import { Key } from "../components/interactive-objects/key";
import Note from "../components/interactive-objects/note/Note";
import { ReactComponent as Lock } from "./lock-solid.svg";

import PlayerNavButton from "../components/PlayerNavButton";
import UserDetails from "../components/UserDetail";

import styles from "./Main.module.scss";

export const Main = ({ className, currentPlayer, currentUser, mongodb }) => {
  const [activeItem, setActiveItem] = useState("");
  // storing location in app. Location is also stored in the database
  // current strategy is to use app state for location to try and speed up application
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");

  const onPlayerNavClick = (location) => {
    setLocation(location);
  };

  const onSceneItemClick = async (item) => {
    const outcome = await currentUser.functions.pickUpItem(item);
    setMessage(`${outcome} on picking up ${item}.`);
  };

  const onInventoryItemClick = (item) => {
    console.log(`inventory item ${item} clicked`);
    setActiveItem(item);
  };

  const cursorStyle = {
    [styles.keyCursor]: activeItem === "key",
    [styles.noteCursor]: activeItem === "note",
  };

  const locations = {
    livingRoom: <LivingRoom className={styles.scene} />,
    outside: <Outside className={styles.scene} />,
    study: <Study className={styles.scene} />,
  };

  const inventoryItems = {
    key: (
      <Key
        className={cx({ [styles.activeItem]: activeItem === "key" })}
        onItemClick={onInventoryItemClick}
      />
    ),
    note: (
      <Note
        className={cx({ [styles.activeItem]: activeItem === "note" })}
        onItemClick={onInventoryItemClick}
      />
    ),
  };

  return (
    <div
      className={cx(styles.main, className)}
      onMouseDown={() => {
        setMessage("");
        setActiveItem("");
      }}
    >
      <header className={styles.header}>
        <h1>MERN's Point and Click Adventure</h1>
        <UserDetails currentUser={currentUser} currentPlayer={currentPlayer} />
      </header>
      <section
        className={cx(styles.gameplay, cursorStyle)}
        aria-label="gameplay"
        onMouseDown={() => setActiveItem("")}
      >
        <PlayerNavButton
          mongodb={mongodb}
          onPlayerNavClick={onPlayerNavClick}
          label="Left Nav"
          className={styles.leftNav}
          to="livingRoom"
        />

        <div className={styles.sceneContainer}>
          {/* When app initially loads, get last location from player data. */}
          {/* Once the player has used a nav button, it will be using the apps state to figure out the location. */}
          {/* The theory is this will be more perfomative. The database will still be updated with the current location everytime. */}
          {/* Current risk is if the user loses their connection, they will be able to move around, but their location will not be saved */}
          {location ? locations[location] : locations[currentPlayer?.location]}
        </div>
        {!currentPlayer?.inventory?.includes("key") && (
          <Key className={styles.item} onItemClick={onSceneItemClick} />
        )}
        {!currentPlayer?.inventory?.includes("note") && (
          <Note className={styles.item} onItemClick={onSceneItemClick} />
        )}
        <PlayerNavButton
          mongodb={mongodb}
          onPlayerNavClick={onPlayerNavClick}
          label="Right Nav"
          className={styles.rightNav}
          to="study"
        />
        <PlayerNavButton
          mongodb={mongodb}
          onPlayerNavClick={onPlayerNavClick}
          label="Center Nav"
          className={styles.centerNav}
          to="outside"
        />
        <button className={styles.lock}>
          <Lock />
        </button>
      </section>
      <section className={styles.communication} aria-label="communication">
        Communications to the player will appear here.
        <div>{message}</div>
      </section>
      <section className={styles.inventory} aria-label="inventory">
        The user's inventory will be shown here
        {currentPlayer?.inventory &&
          currentPlayer?.inventory.map((item, index) => (
            <div key={`${item}-${index}`}>{inventoryItems[item]}</div>
          ))}
      </section>
      <nav className={styles.nav}>
        Any menu options or navigation will go here.
      </nav>
    </div>
  );
};

export default Main;
