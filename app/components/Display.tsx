import styles from "../page.module.css";

interface DisplayType {
  displayValue: string;
}

export const Display = ({ displayValue }: DisplayType) => {
  return (
    <div className={styles.displayOutline}>
      <div className={styles.displayInner}>
        <div className={styles.display}>{displayValue}</div>
      </div>
    </div>
  );
};
