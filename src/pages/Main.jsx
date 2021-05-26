import { useState } from "react";

import { useRealm } from "../hooks/context";
import Login from "../components/Login";
import UserDetails from "../components/UserDetail";

export const Main = () => {
  const { app, Realm } = useRealm();
  const [user, setUser] = useState(app.currentUser);
  return (
    <>
      {user ? (
        <UserDetails user={user} />
      ) : (
        <Login app={app} Realm={Realm} setUser={setUser} />
      )}
    </>
  );
};

export default Main;
