import { useState } from "react";

import { useRealm, usePlayer } from "../hooks/context";
import Login from "../components/Login";
import UserDetails from "../components/UserDetail";

export const Main = () => {
  const { app, Realm } = useRealm();
  const { player } = usePlayer();
  const [user, setUser] = useState(app.currentUser);

  const getPlayer = async () => {
    const players = await player.find({});
    console.log(players);
  };
  return (
    <>
      <h1>Hello World</h1>
      {user ? (
        <UserDetails user={user} />
      ) : (
        <Login app={app} Realm={Realm} setUser={setUser} />
      )}
      <button onClick={() => getPlayer()}>Get Player</button>
    </>
  );
};

export default Main;
