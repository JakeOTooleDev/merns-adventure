// * Created Login and UserDetail following the Realm Web quickstart guide: https://docs.mongodb.com/realm/web/react-web-quickstart/
export const UserDetail = ({ currentUser, currentPlayer }) => {
  return (
    <div>
      <h1>Loggid in with user id: {currentUser?.id}</h1>
      <h1>{JSON.stringify(currentPlayer)}</h1>
    </div>
  );
};

export default UserDetail;
