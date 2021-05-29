import UserDetails from "../components/UserDetail";

export const Main = ({ currentPlayer, currentUser }) => {
  return (
    <>
      <h1>Hello World</h1>
      <UserDetails currentUser={currentUser} currentPlayer={currentPlayer} />
    </>
  );
};

export default Main;
