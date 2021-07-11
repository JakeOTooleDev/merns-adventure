import { useState } from "react";
import { useHistory } from "react-router-dom";

import { Button } from "primereact/button";
import { Password } from "primereact/password";

export const Reset = ({ app }) => {
  const [newPassword, setNewPassword] = useState("");
  // https://reactrouter.com/web/api/Hooks/usehistory
  let history = useHistory();
  // MongoDB Reset instructions on https://docs.mongodb.com/realm/authentication/email-password/#password-resets
  // To get query I followed instructions on https://www.sitepoint.com/get-url-parameters-with-javascript/
  // Later found that react-router-dom has a hook that does something very similiar https://reactrouter.com/web/example/url-params
  const queryString = window.location.search;
  console.log(queryString);
  const urlParams = new URLSearchParams(queryString);
  const token = urlParams.get("token");
  const tokenId = urlParams.get("tokenId");
  console.log(token, tokenId);
  const resetMernPassword = async (event) => {
    event.preventDefault();
    try {
      await app.emailPasswordAuth.resetPassword(token, tokenId, newPassword);
      history.push("/");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <h1>Reset Your Password!</h1>
      <form onSubmit={resetMernPassword}>
        <label htmlFor="newPassword">New Password</label>
        <Password
          id="newPassword"
          onChange={(e) => {
            setNewPassword(e.target.value);
          }}
          value={newPassword}
        />
        <Button label="Reset Password" icon="pi pi-check" />
      </form>
    </div>
  );
};
export default Reset;
