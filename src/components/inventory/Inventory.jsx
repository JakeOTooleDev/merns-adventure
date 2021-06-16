import cx from "classnames";

import keyImg from "./key.png";
import microscopeImg from "./microscope.png";
import noteImg from "./note.png";

import styles from "./Inventory.module.scss";

export const Inventory = ({ className, currentPlayer }) => {
  const inventoryItems = {
    key: keyImg,
    note: noteImg,
    microscope: microscopeImg,
  };

  return (
    <section className={cx(className)} aria-label="inventory">
      <div className={styles.items}>
        {currentPlayer?.inventory &&
          currentPlayer?.inventory.map((item, index) => {
            return (
              <div className={styles.item} key={`${item}-${index}`}>
                <img alt={item} src={inventoryItems[item]} />
              </div>
            );
          })}
      </div>
    </section>
  );
};
export default Inventory;
