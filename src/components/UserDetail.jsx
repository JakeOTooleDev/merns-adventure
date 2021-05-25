import { useRealm } from "../hooks/context";

// * Created Login and UserDetail following the Realm Web quickstart guide: https://docs.mongodb.com/realm/web/react-web-quickstart/
export const UserDetail = ({ user }) => {
  const app = useRealm();
  console.log(app);
  return (
    <div>
      <h1>Loggid in with anonymus id: {user.id}</h1>
    </div>
  );
};

export default UserDetail;
