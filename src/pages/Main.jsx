import cx from "classnames";

import UserDetails from "../components/UserDetail";

import styles from "./Main.module.css";

export const Main = ({ className, currentPlayer, currentUser }) => {
  console.log(className);
  return (
    <div className={cx(styles.main, className)}>
      <header className={styles.header}>
        <h1>MERN's Point and Click Adventure</h1>
        <UserDetails currentUser={currentUser} currentPlayer={currentPlayer} />
      </header>
      <section className={styles.gameplay} aria-label="gameplay">
        The scene will be located here.
      </section>
      <section className={styles.communication} aria-label="communication">
        Communications to the player will appear here.
      </section>
      <section className={styles.inventory} aria-label="inventory">
        The user's inventory will be shown here
      </section>
      <nav className={styles.nav}>
        Any menu options or navigation will go here.
      </nav>
    </div>
  );
};

export default Main;
