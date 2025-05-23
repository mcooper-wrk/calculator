import styles from "../page.module.css";
import { CustomSlider } from "./CustomSlider";
import CustomThumbComponent from "./CustomThumb";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import { Dispatch, SetStateAction } from "react";

interface SliderRowTypes {
  setRoundValue: Dispatch<SetStateAction<string>>;
  cutPaper: () => void;
  feed: () => void;
}

export const SliderRow = ({
  setRoundValue,
  cutPaper,
  feed,
}: SliderRowTypes) => {
  const handleOnChange = (event: Event, value: number | number[]) => {
    if (event.isTrusted) {
      switch (value) {
        case 0:
          setRoundValue("F");
          break;
        case 1:
          setRoundValue("6");
          break;
        case 2:
          setRoundValue("3");
          break;
        case 3:
          setRoundValue("2");
          break;
        case 4:
          setRoundValue("1");
          break;
        case 5:
          setRoundValue("0");
          break;
      }
    }
  };

  const sliderOneMarks = [
    {
      value: 0,
      label: "F",
    },
    {
      value: 1,
      label: "6",
    },
    {
      value: 2,
      label: "3",
    },
    {
      value: 3,
      label: "2",
    },
    {
      value: 4,
      label: "1",
    },
    {
      value: 5,
      label: "0",
    },
  ];

  return (
    <div className={styles.knobsRow}>
      <button className={styles.button} onClick={() => cutPaper()}>
        <ContentCutIcon />
      </button>
      <CustomSlider
        slots={{ thumb: CustomThumbComponent }}
        track={false}
        aria-label="Slider One"
        defaultValue={3}
        valueLabelDisplay="off"
        step={1}
        marks={sliderOneMarks}
        min={0}
        max={5}
        onChange={handleOnChange}
      />
      <button className={styles.button} onClick={() => feed()}>
        <KeyboardDoubleArrowUpIcon />
      </button>
    </div>
  );
};
