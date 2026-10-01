import { memo } from "react";

const DrillRow = memo(function DrillRow({ drill, onDoItNow, onCancel }) {
  return (
    <div className="drill-row">
      <div className="drill-info">
        <span className="drill-name">{drill.name}</span>
        <span className="drill-meta">
          {drill.duration} min · {drill.reps} reps
        </span>
      </div>

      <div className="drill-actions">
        <button onClick={() => onDoItNow(drill)}>Do It Now</button>
        <button onClick={() => onCancel(drill.id)} className="cancel-btn">
          Cancel
        </button>
      </div>
    </div>
  );
});

export default DrillRow;