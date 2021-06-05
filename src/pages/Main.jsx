import cx from "classnames";
import { useState } from "react";

import LivingRoom from "../components/scences/living-room/LivingRoom";
import Outside from "../components/scences/outside/Outside";
import Study from "../components/scences/study/Study";

import PlayerNavButton from "../components/PlayerNavButton";
import UserDetails from "../components/UserDetail";

import styles from "./Main.module.scss";

export const Main = ({ className, currentPlayer, currentUser, mongodb }) => {
  const [activeItem, setActiveItem] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");

  const onPlayerNavClick = (location) => {
    setLocation(location);
  };

  const onItemClick = (item, event) => {
    console.log(`onItemClick occurred. ${item} has been clicked`);
    console.log(event.target.style);
    setActiveItem(item);
    setMessage(`You picked up the ${item}`);
  };

  const cursorStyle = {
    [styles.keyCursor]: activeItem === "key",
  };

  const locations = {
    livingRoom: <LivingRoom className={styles.scene} />,
    outside: <Outside className={styles.scene} />,
    study: <Study className={styles.scene} />,
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
          {location ? locations[location] : <Outside />}
        </div>
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
      </section>
      <section className={styles.communication} aria-label="communication">
        Communications to the player will appear here.
        <div>{message}</div>
      </section>
      <section className={styles.inventory} aria-label="inventory">
        The user's inventory will be shown here
        {currentPlayer.inventory &&
          currentPlayer.inventory.map((item, index) => (
            <div key={`${item}-${index}`}>{item}</div>
          ))}
      </section>
      <nav className={styles.nav}>
        Any menu options or navigation will go here.
      </nav>
    </div>
  );
};

export default Main;
