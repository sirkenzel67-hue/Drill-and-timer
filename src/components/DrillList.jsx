import DrillRow from "./DrillRow";
import AddDrillForm from "./AddDrillForm";
import { useLocalStorage } from "../useLocalStorage";
import { useCallback } from "react";

export default function DrillList({ onDoItNow, onCancelDrill }) {
  const [drills, setDrills] = useLocalStorage("drill-list", [
    { id: 1, name: "Free throws", duration: 30, reps: 10 },
    { id: 2, name: "Layup drill", duration: 60, reps: 15 },
    { id: 3, name: "Suicides", duration: 45, reps: 8 },
  ]);

  const handleCancel = useCallback(
    (id) => {
      setDrills((prev) => prev.filter((d) => d.id !== id));
      onCancelDrill?.(id);
    },
    [onCancelDrill, setDrills]
  );

  function handleAddDrill(drill) {
    setDrills((prev) => [...prev, drill]);
  }

  return (
    <div>
      <h2>Drills</h2>
      <AddDrillForm onAdd={handleAddDrill} />
      {drills.map((d) => (
        <DrillRow
          key={d.id}
          drill={d}
          onDoItNow={onDoItNow}
          onCancel={handleCancel}
        />
      ))}
    </div>
  );
}
