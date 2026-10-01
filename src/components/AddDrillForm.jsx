import { useState } from "react";

export default function AddDrillForm({ onAdd }) {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [reps, setReps] = useState("");
  const [errors, setErrors] = useState({});

  function validate() {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!duration || Number(duration) <= 0) newErrors.duration = "Enter a positive number";
    if (!reps || Number(reps) <= 0) newErrors.reps = "Enter a positive number";
    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const foundErrors = validate();
    setErrors(foundErrors);

    if (Object.keys(foundErrors).length > 0) return; // stop here if anything's wrong

    onAdd({
      id: Date.now(),
      name,
      duration: Number(duration),
      reps: Number(reps),
    });

    setName("");
    setDuration("");
    setReps("");
    setErrors({});
  }

  return (
    <form onSubmit={handleSubmit} className="drill-form">
      <div>
        <input
          placeholder="Drill name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>

      <div>
        <input
          placeholder="Duration (minutes)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        {errors.duration && <p className="error">{errors.duration}</p>}
      </div>

      <div>
        <input
          placeholder="Reps"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
        />
        {errors.reps && <p className="error">{errors.reps}</p>}
      </div>

      <button type="submit">Add Drill</button>
    </form>
  );
}