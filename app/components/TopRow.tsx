import styles from "../page.module.css";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

export const TopRow = () => {
  return (
    <div className={styles.topRow}>
      <button className={styles.variantTwo}><ArrowRightAltIcon /></button>
      <div className={styles.topRowSectionLeft}>
        <button className={styles.variantTwo}>COST</button>
        <button className={styles.variantTwo}>SELL</button>
        <button className={styles.variantTwo}>MGN</button>
      </div>
      <div className={styles.topRowSectionRight}>
        <button className={styles.variantTwo}>+/-</button>
        <button className={styles.variantTwo}>AVG</button>
        <button className={styles.variantTwoPurple}>GT</button>
      </div>
      <div className={styles.topRowSectionRight}>
        <button className={styles.buttonYellow}>TAX+</button>
        <button className={styles.buttonYellow}>TAX-</button>
      </div>
    </div>
  );
};
