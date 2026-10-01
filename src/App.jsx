import { useEffect, useRef, useState } from "react";
import "./index.css";
import { Timer } from "./components/Timer";
import DrillList from "./components/DrillList";
import { useLocalStorage } from "./useLocalStorage";

export default function App() {
  const [activeDrill, setActiveDrill] = useState(null);
  const [theme, setTheme] = useLocalStorage("drill-theme", "dark");
  const [todayProgress, setTodayProgress] = useLocalStorage("today-progress", []);
  const [completionMessage, setCompletionMessage] = useState("");
  const lastCompletedKeyRef = useRef("");

  useEffect(() => {
    if (!completionMessage) return;

    const timer = setTimeout(() => {
      setCompletionMessage("");
    }, 2600);

    return () => clearTimeout(timer);
  }, [completionMessage]);

  function handleDoItNow(drill) {
    lastCompletedKeyRef.current = "";
    setActiveDrill(drill);
    setCompletionMessage("");
  }

  function handleCancelDrill(id) {
    setActiveDrill((current) => (current && current.id === id ? null : current));
  }

  function handleClearProgress() {
    setTodayProgress([]);
  }

  function handleExportPdf() {
    if (typeof window !== "undefined") {
      window.print();
    }
  }

  function handleTimerComplete() {
    if (!activeDrill) return;

    const completedKey = `${activeDrill.id}-${activeDrill.name}-${activeDrill.reps}`;

    if (lastCompletedKeyRef.current === completedKey) {
      setActiveDrill(null);
      return;
    }

    lastCompletedKeyRef.current = completedKey;

    setTodayProgress((prev) => {
      if (prev.some((item) => item.key === completedKey)) {
        return prev;
      }

      return [
        ...prev,
        {
          id: Date.now(),
          key: completedKey,
          name: activeDrill.name,
          reps: activeDrill.reps,
        },
      ];
    });

    setCompletionMessage(
      `Congratulations! You completed ${activeDrill.name}. Great work.`
    );
    setActiveDrill(null);
  }

  return (
    <div className={`app-shell ${theme}`}>
      {completionMessage && (
        <div className="completion-overlay" aria-live="polite">
          <div className="completion-modal">
            <h3>Congratulations</h3>
            <p>{completionMessage}</p>
          </div>
        </div>
      )}

      <div className="container">
        <div className="topbar">
          <h1>Drill Timer</h1>
          <button
            type="button"
            className="theme-toggle"
            onClick={() => setTheme(theme === "dark" ? "day" : "dark")}
          >
            {theme === "dark" ? "Day mode" : "Dark mode"}
          </button>
        </div>

        <Timer activeDrill={activeDrill} onComplete={handleTimerComplete} />
        <DrillList onDoItNow={handleDoItNow} onCancelDrill={handleCancelDrill} />
      </div>

      <div className="progress-summary">
        <div className="progress-header">
          <h2>Today's progress</h2>
          <div className="progress-actions">
            <button type="button" className="progress-button" onClick={handleExportPdf}>
              Export PDF
            </button>
            <button
              type="button"
              className="progress-button secondary"
              onClick={handleClearProgress}
              disabled={todayProgress.length === 0}
            >
              Clear progress
            </button>
          </div>
        </div>

        {todayProgress.length === 0 ? (
          <p className="empty-progress">Nothing completed yet.</p>
        ) : (
          <ul>
            {todayProgress.map((p) => (
              <li key={p.id}>
                <span>{p.name}</span>
                <strong>{p.reps} reps</strong>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
