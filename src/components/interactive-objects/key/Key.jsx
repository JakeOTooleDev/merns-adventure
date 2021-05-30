import cx from "classnames";

import { ReactComponent as KeySvg } from "./key-solid.svg";

import styles from "./Key.module.scss";

export const Key = ({ className, onItemClick }) => {
  return (
    <button
      className={cx(className)}
      onClick={(event) => onItemClick("key", event)}
    >
      <KeySvg className={styles.key} />
    </button>
  );
};
export default Key;
