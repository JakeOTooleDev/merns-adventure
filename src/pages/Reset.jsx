import { useState } from "react";
import { useHistory } from "react-router-dom";
import cx from "classnames";

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Password } from "primereact/password";

import { Header } from "../components/layout/Header";

import styles from "./Reset.module.scss";

export const Reset = ({ app }) => {
  const [newPassword, setNewPassword] = useState("");
  // https://reactrouter.com/web/api/Hooks/usehistory
  let history = useHistory();
  // MongoDB Reset instructions on https://docs.mongodb.com/realm/authentication/email-password/#password-resets
  // To get query I followed instructions on https://www.sitepoint.com/get-url-parameters-with-javascript/
  // Later found that react-router-dom has a hook that does something very similiar https://reactrouter.com/web/example/url-params
  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);
  const token = urlParams.get("token");
  const tokenId = urlParams.get("tokenId");

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
      <Header />
      <div className="p-d-flex p-jc-center p-ai-center">
        <Card className={cx("p-m-5", styles.reset)} title="Reset Your Password">
          <form onSubmit={resetMernPassword}>
            <label className="p-m-2" htmlFor="newPassword">
              New Password
            </label>
            <Password
              id="newPassword"
              className="p-m-2"
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
              value={newPassword}
            />
            <Button className="p-m-2" label="Reset Password" icon="pi pi-check" />
          </form>
        </Card>
      </div>
    </div>
  );
};
export default Reset;
