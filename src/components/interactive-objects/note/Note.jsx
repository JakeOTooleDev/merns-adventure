import cx from "classnames";

import { ReactComponent as NoteSvg } from "./sticky-note-regular.svg";

import styles from "./Note.module.scss";

export const Note = ({ className, onItemClick }) => {
  return (
    <button
      className={cx(className)}
      onClick={(event) => onItemClick("note", event)}
    >
      <NoteSvg className={styles.note} />
    </button>
  );
};
export default Note;
