// * Created Login and UserDetail following the Realm Web quickstart guide: https://docs.mongodb.com/realm/web/react-web-quickstart/
export const UserDetail = ({ currentUser, currentPlayer }) => {
  return (
    <div>
      <p>User ID: {currentUser?.id}</p>
      <p>Username: {currentPlayer.username}</p>
    </div>
  );
};

export default UserDetail;
