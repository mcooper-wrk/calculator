"use client";
import { useEffect, useRef, useState } from "react";
import { Display } from "./components/Display";
import { SectionOne } from "./components/SectionOne";
import { SliderRow } from "./components/SliderRow";
import styles from "./page.module.css";
import html2canvas from "html2canvas";

export default function Home() {
  const [displayValue, setDisplayValue] = useState<string>("0");
  const [currentNumber, setCurrentNumber] = useState<string>("0");
  const [roundValue, setRoundValue] = useState<string>("2");
  const [output, setOutput] = useState<string[]>([]);
  const [result, setResult] = useState<number>(0);
  const [operator, setOperator] = useState<string>("+");
  const calculatorRef = useRef<HTMLInputElement>(null); // Ref to the calculator div
  const outputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLInputElement>(null);
  
  const formatNumberWithCommas = (number: string) => {
    const numStr = number.toString().replace(/,/g, "");
    const parts = numStr.split("."); // Split into integer and decimal parts
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add commas to integer part
    return parts.join("."); // Join back together
  };

  const handleNumberClick = (number: string) => {
    const newNumber =
      result.toString() === currentNumber ? number : currentNumber + number;
    setCurrentNumber(newNumber);
    setDisplayValue(formatNumberWithCommas(newNumber));
  };

  const handleOperatorClick = (op: string) => {
    setOperator(op);
    setOutput([...output, displayValue + op]);
    handleCalculate();
  };

  const handleCalculate = () => {
    let rounded;
    let localResult;
    switch (operator) {
      case "+":
        localResult = result + parseFloat(currentNumber);
        break;
      case "-":
        localResult = result - parseFloat(currentNumber);
        break;
      case "*":
        localResult =
          result !== 0
            ? result * parseFloat(currentNumber)
            : parseFloat(currentNumber);
        break;
      case "/":
        localResult =
          result !== 0
            ? result / parseFloat(currentNumber)
            : parseFloat(currentNumber);
        break;
      default:
        return;
    }
    if (roundValue !== "F") {
      const factor = Math.pow(10, parseFloat(roundValue));
      rounded = Math.round(localResult * factor) / factor;
    } else if (roundValue === "F") {
      const factor = Math.pow(10, 10);
      rounded = Math.round(localResult * factor) / factor;
    }
    const newResult = rounded ?? localResult;
    setResult(newResult);
    setDisplayValue(newResult.toString());
    setCurrentNumber(newResult.toString());
  };

  const handleClear = () => {
    setDisplayValue("0");
    setCurrentNumber("0");
    setResult(0);
    setOperator("+");
  };

  const grandTotal = () => {
    let rounded;
    let localResult;
    switch (operator) {
      case "+":
        localResult = result + parseFloat(currentNumber);
        break;
      case "-":
        localResult = result - parseFloat(currentNumber);
        break;
      case "*":
        localResult =
          result !== 0
            ? result * parseFloat(currentNumber)
            : parseFloat(currentNumber);
        break;
      case "/":
        localResult =
          result !== 0
            ? result / parseFloat(currentNumber)
            : parseFloat(currentNumber);
        break;
      default:
        return;
    }
    if (roundValue !== "F") {
      const factor = Math.pow(10, parseFloat(roundValue));
      rounded = Math.round(localResult * factor) / factor;
    } else if (roundValue === "F") {
      const factor = Math.pow(10, 10);
      rounded = Math.round(localResult * factor) / factor;
    }
    const newResult = rounded ?? localResult;
    setOutput([
      ...output,
      displayValue + operator,
      formatNumberWithCommas(newResult.toString()),
      "",
    ]);
    handleClear();
  };

  const feed = () => {
    setOutput([...output, ""]);
  };

  const saveOutput = async () => {
    if (!outputRef.current) return;

    const canvas = await html2canvas(outputRef.current, {
      allowTaint: true,
      useCORS: true,
      logging: false,
      scale: window.devicePixelRatio,
    });

    const dataURL = canvas.toDataURL("image/jpeg");

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "output.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setOutput([]);
    handleClear();
  };

  useEffect(() => {
    // Format the display value whenever it changes. Important for calculation results
    if (displayValue) {
      setDisplayValue(formatNumberWithCommas(displayValue));
    }
  }, [displayValue]);

  useEffect(() => {
    const currentRef = calculatorRef.current;
    const handleKeyDown = (event: { key: string; }) => {
      const key = event.key;

      if (/[0-9]/.test(key)) {
        handleNumberClick(key);
      } else if (["+", "-", "*", "/"].includes(key)) {
        handleOperatorClick(key);
      } else if (key === "=" || key === "Enter") {
        if (displayValue === "0") {
          feed();
        } else {
          grandTotal();
        }
      } else if (key === "c" || key === "Escape") {
        handleClear();
      } else if (key === ".") {
        handleNumberClick(".");
      } else if (key === "t") {
        grandTotal();
      } else if (key === "x") {
        if (output.length > 0) saveOutput();
      } else if (key === "f") {
        feed();
      }
    };

    // Add event listener to the calculator div
    if (currentRef) {
      currentRef.focus(); // Focus the calculator on mount
      currentRef.addEventListener("keydown", handleKeyDown);
    }

    // Clean up the event listener on unmount
    return () => {
      if (currentRef) {
        currentRef.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [handleNumberClick, handleCalculate, handleClear]); // Dependencies to avoid stale closures

  useEffect(() => {
    // Scroll to the bottom when messages change
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [output]);

  return (
    <div
      className={styles.page}
      ref={calculatorRef}
      tabIndex={0}
      style={{ outline: "none" }}
    >
      <main className={styles.main}>
        <div className={styles.paper} ref={outputRef}>
          <div className={styles.output}>
            <p>
              {output?.length > 0 &&
                output.map((value, index) => (
                  <span key={index}>
                    {value}
                    <br />
                  </span>
                ))}
            </p>
          </div>
          <div ref={bottomRef} />
        </div>
        <div className={styles.calculator}>
          <Display displayValue={displayValue} />
          <SliderRow
            setRoundValue={setRoundValue}
            cutPaper={saveOutput}
            feed={feed}
          />
          <SectionOne
            grandTotal={grandTotal}
            handleClear={handleClear}
            handleNumberClick={handleNumberClick}
            handleOperatorClick={handleOperatorClick}
            feed={feed}
            displayValue={displayValue}
          />
        </div>
      </main>
    </div>
  );
}
