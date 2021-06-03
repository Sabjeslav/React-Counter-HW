import React, { useState, useEffect } from "react";
import style from "./Counter.module.sass";
import Button from "./Button";

function Counter() {
  const [counter, setCounter] = useState(0);
  const [step, setStep] = useState(1);
  const [incMode, setMode] = useState(true);
  const [autoClick, setAutoClick] = useState(false);
  const [timeoutDelay, setTimeoutDelay] = useState(1000);

  const increaseCounter = () => {
    setCounter(counter + step);
  };
  const decreaseCounter = () => {
    setCounter(counter - step);
  };

  const [action, setAction] = useState({
    function: increaseCounter,
    caption: "Add",
  });

  const toggleCounterMode = () => {
    setMode(!incMode);
  };
  useEffect(() => {
    setAction({
      caption: incMode ? "Add" : "Subtract",
      function: incMode ? increaseCounter : decreaseCounter,
    });
  }, [counter, incMode, step]);

  const stepInputValidator = ({ target: { value } }) => {
    if (value < 1 || isNaN(value)) value = 1;
    if (value > 100) value = 100;
    setStep(Number(value));
  };

  const timeoutDelayValidator = ({ target: { value } }) => {
    if (value < 0.001 || isNaN(value)) value = 1;
    if (value > 3600) value = 3600;
    setTimeoutDelay(value * 1000);
  };

  const autoClickHandler = () => {
    setAutoClick(!autoClick);
  };
  useEffect(() => {
    let timeout = null;
    if (autoClick) {
      timeout = setTimeout(action.function, timeoutDelay);
    }
    return () => clearTimeout(timeout);
  });

  return (
    <div className={style.counterWrapper}>
      <header>
        <h1>React counter</h1>
      </header>
      <main>
        <div className={style.counterSection}>
          <div className={style.counterValue}>{counter}</div>
          <div className={style.counterBtnWrapper}>
            <Button caption={action.caption} handler={action.function} />
            <Button caption="Change counter mode" handler={toggleCounterMode} />
            <Button caption="Auto Click" handler={autoClickHandler} />
          </div>
        </div>
        <div className={style.settingsSection}>
          <div className={style.inputBlock}>
            Step:
            <input
              id="numInput"
              type="number"
              min="1"
              max="100"
              value={step}
              onChange={stepInputValidator}
            />
          </div>
          <div className={style.inputBlock}>
            Delay (s):
            <input
              id="delayInput"
              type="number"
              min="0.001"
              max="3600"
              step="0.1"
              value={timeoutDelay / 1000}
              onChange={timeoutDelayValidator}
            />
          </div>
          <div className={style.inputBlock}>
            AutoClick: <span>{autoClick ? "Active" : "Disabled"}</span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Counter;
