import { useHistory } from "react-router-dom";
import cx from "classnames";

import { Button } from "primereact/button";
import { Card } from "primereact/card";

import { Header } from "../components/layout/Header";

import styles from "./Confirmation.module.scss";

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
      <Header />
      <div className="p-d-flex p-jc-center p-ai-center">
        <Card className={cx("p-m-5", styles.confirmation)} title="Confirm your e-mail address!">
          <div className="p-d-flex p-jc-center">
            <Button className="p-button-lg" label="Confirm" onClick={() => confirmMernUser()} icon="pi pi-check" />
          </div>
        </Card>
      </div>
    </div>
  );
};
export default Confirmation;
