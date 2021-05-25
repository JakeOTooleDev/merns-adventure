// * Created Login and UserDetail following the Realm Web quickstart guide: https://docs.mongodb.com/realm/web/react-web-quickstart/
export const Login = ({ app, Realm, setUser }) => {
  const loginAnonymous = async () => {
    try {
      const user = await app.logIn(Realm.Credentials.anonymous());
      setUser(user);
    } catch (err) {
      console.error("Error occurred trying to login", err);
    }
  };
  return <button onClick={loginAnonymous}>Log In</button>;
};

export default Login;
