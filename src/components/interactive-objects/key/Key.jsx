import { ReactComponent as KeySvg } from "./key-solid.svg";

import styles from "./Key.module.scss";

export const Key = ({ onItemClick }) => {
  return (
    <button onClick={(event) => onItemClick("key", event)}>
      <KeySvg className={styles.key} />
    </button>
  );
};
export default Key;
