import { useState, useRef } from "react";

export function Timer() {
  const [duration, setDuration] = useState(30);   // the configurable starting value
  const [seconds, setSeconds] = useState(30);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  function start() {
    setRunning(true);
    intervalRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  function stop() {
    setRunning(false);
    clearInterval(intervalRef.current);
  }

  function reset() {
    stop();
    setSeconds(duration);   // resets to whatever was configured, not a hardcoded 30
  }

  function handleDurationChange(e) {
    const value = Number(e.target.value);
    setDuration(value);
    setSeconds(value);   // keep the display in sync while stopped
  }

  return (
    <div className="timer">
      <div className="duration-setting">
        <label>Set time (seconds): </label>
        <input
          type="number"
          min="1"
          value={duration}
          onChange={handleDurationChange}
          disabled={running}
        />
      </div>

      <h1>Timer: {seconds}s</h1>
      <div className="timer-btns">
        <button onClick={start} disabled={running}>Start</button>
        <button onClick={stop} disabled={!running}>Stop</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default Timer;