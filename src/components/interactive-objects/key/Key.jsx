import { ReactComponent as KeySvg } from "./key-solid.svg";

import styles from "./Key.module.scss";

export const Key = () => {
  return (
    <button onClick={() => console.log("Key Clicked!")}>
      <KeySvg className={styles.key} />
    </button>
  );
};
export default Key;
