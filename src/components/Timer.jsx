import { useEffect, useRef, useState } from "react";

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function Timer({ activeDrill, onComplete }) {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!activeDrill) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setSeconds(0);
      return;
    }

    const totalSeconds = activeDrill.duration * 60;
    setSeconds(totalSeconds);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          onComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [activeDrill, onComplete]);

  return (
    <div className="timer">
      <h1>{formatTime(seconds)}</h1>
      {activeDrill ? <p>Doing: {activeDrill.name}</p> : <p>Select a drill to begin.</p>}
    </div>
  );
}
