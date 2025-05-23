import styles from "../page.module.css";
import ClearIcon from "@mui/icons-material/Clear";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

interface SectionOneTypes {
  handleNumberClick: (number: string) => void;
  handleOperatorClick: (op: string) => void;
  grandTotal: () => void;
  handleClear: () => void;
  feed: () => void;
  displayValue: string;
}

export const SectionOne = ({
  handleNumberClick,
  handleOperatorClick,
  grandTotal,
  handleClear,
  feed,
  displayValue,
}: SectionOneTypes) => {
  return (
    <div className={styles.mainButtonSection}>
      <div className={styles.row}>
        <div className={styles.sectionOne}>
          <button
            className={styles.button}
            onClick={() => (displayValue === "0" ? feed() : grandTotal())}
          >
            GT
          </button>
        </div>
        <div className={styles.sectionTwo}>
          <button
            className={styles.buttonWhitish}
            onClick={() => handleNumberClick("7")}
          >
            7
          </button>
          <button
            className={styles.buttonWhitish}
            onClick={() => handleNumberClick("8")}
          >
            8
          </button>
          <button
            className={styles.buttonWhitish}
            onClick={() => handleNumberClick("9")}
          >
            9
          </button>
        </div>
        <div className={styles.sectionThree}>
          <button
            className={styles.buttonRed}
            onClick={() => handleOperatorClick("-")}
          >
            -=
          </button>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.sectionOne}>
          <button
            className={styles.button}
            onClick={() => handleOperatorClick("/")}
          >
            /
          </button>
        </div>
        <div className={styles.sectionTwo}>
          <button
            className={styles.buttonWhitish}
            onClick={() => handleNumberClick("4")}
          >
            4
          </button>
          <button
            className={styles.buttonWhitish}
            onClick={() => handleNumberClick("5")}
          >
            5
          </button>
          <button
            className={styles.buttonWhitish}
            onClick={() => handleNumberClick("6")}
          >
            6
          </button>
        </div>
        <div className={styles.sectionThree}>
          <button
            className={styles.buttonTripleTall}
            onClick={() => handleOperatorClick("+")}
          >
            <span>+</span>
            <span>=</span>
          </button>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.sectionOne}>
          <button
            className={styles.button}
            onClick={() => handleOperatorClick("*")}
          >
            <ClearIcon />
          </button>
        </div>
        <div className={styles.sectionTwoVariant}>
          <button
            className={styles.buttonWhitish}
            onClick={() => handleNumberClick("1")}
          >
            1
          </button>
          <button
            className={styles.buttonWhitish}
            onClick={() => handleNumberClick("2")}
          >
            2
          </button>
          <button
            className={styles.buttonWhitish}
            onClick={() => handleNumberClick("3")}
          >
            3
          </button>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.sectionOneVariant}>
          <button
            className={styles.button}
            style={{ fontSize: "small" }}
            onClick={() => handleClear()}
          >
            C/CE
          </button>
        </div>
        <div className={styles.sectionTwoVariant}>
          <button
            className={styles.variantOne}
            onClick={() => handleNumberClick("0")}
          >
            0
          </button>
          <button
            className={styles.buttonWhitish}
            onClick={() => handleNumberClick("00")}
          >
            00
          </button>
          <button
            className={styles.variantOne}
            onClick={() => handleNumberClick(".")}
          >
            <FiberManualRecordIcon style={{ fontSize: "14px" }} />
          </button>
        </div>
      </div>
    </div>
  );
};
