import { useHistory } from "react-router-dom";

export const Confirmation = ({ app }) => {
  // https://reactrouter.com/web/api/Hooks/usehistory
  let history = useHistory();
  // MongoDB Confirmation instructions on https://docs.mongodb.com/realm/authentication/email-password/#std-label-email-password-authentication-confirmation
  // To get query I followed instructions on https://www.sitepoint.com/get-url-parameters-with-javascript/
  // Later found that react-router-dom has a hook that does something very similiar https://reactrouter.com/web/example/url-params
  const queryString = window.location.search;
  console.log(queryString);
  const urlParams = new URLSearchParams(queryString);
  const token = urlParams.get("token");
  const tokenId = urlParams.get("tokenId");
  console.log(token, tokenId);
  const confirmMernUser = async () => {
    try {
      await app.emailPasswordAuth.confirmUser(token, tokenId);
      history.push("/");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <h1>Confirm your E-mail Address!</h1>
      <button onClick={() => confirmMernUser()}>Confirm!</button>
    </div>
  );
};
export default Confirmation;
