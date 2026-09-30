import { memo } from "react";

const DrillRow = memo(function DrillRow({ drill, onComplete }) {
  return (
    <div className="drill-row">
      <div className="drill-info">
        <span className="drill-name">{drill.name}</span>
        <span className="drill-meta">{drill.duration}s · {drill.reps} reps</span>
      </div>
      <button onClick={() => onComplete(drill.id)}>Mark Complete</button>
    </div>
  );
});

export default DrillRow;