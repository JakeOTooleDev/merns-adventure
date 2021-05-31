import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import cx from "classnames";

import { Key } from "../components/interactive-objects/key";
import LivingRoom from "../components/scences/living-room/LivingRoom";
import Study from "../components/scences/study/Study";
import PlayerNavButton from "../components/PlayerNavButton";
import UserDetails from "../components/UserDetail";

import styles from "./Main.module.scss";

export const Main = ({ className, currentPlayer, currentUser, mongodb }) => {
  const [activeItem, setActiveItem] = useState("");
  const [message, setMessage] = useState("");

  const onItemClick = (item, event) => {
    console.log(`onItemClick occurred. ${item} has been clicked`);
    console.log(event.target.style);
    setActiveItem(item);
    setMessage(`You picked up the ${item}`);
  };

  const cursorStyle = {
    [styles.keyCursor]: activeItem === "key",
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
        <Router>
          <PlayerNavButton
            mongodb={mongodb}
            label="Left Nav"
            className={styles.leftNav}
            to="/livingRoom"
          />

          <div className={styles.scene}>
            The scene will be located here.
            <Switch>
              <Route path="/livingRoom">
                <LivingRoom />
              </Route>
              <Route path="/study">
                <Study />
              </Route>
              <Route path="/">
                <div>Home</div>
                <Key
                  className={cx({ [styles.activeItem]: activeItem === "key" })}
                  onItemClick={onItemClick}
                />
              </Route>
            </Switch>
          </div>
          <PlayerNavButton
            mongodb={mongodb}
            label="Right Nav"
            className={styles.rightNav}
            to="/study"
          />
        </Router>
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
