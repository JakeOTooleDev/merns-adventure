import UserDetails from "../components/UserDetail";

export const Main = ({ currentPlayer, currentUser }) => {
  return (
    <>
      <header>
        <h1>MERN's Point and Click Adventure</h1>
        <UserDetails currentUser={currentUser} currentPlayer={currentPlayer} />
      </header>
      <section aria-label="gameplay">The scene will be located here.</section>
      <section aria-label="communication">
        Communications to the player will appear here.
      </section>
      <section aria-label="inventory">
        The user's inventory will be shown here
      </section>
      <nav>Any menu options or navigation will go here.</nav>
    </>
  );
};

export default Main;
