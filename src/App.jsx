import "./index.css";
import { Timer } from "./components/Timer";
import DrillRow from "./components/DrillRow";
import DrillList from "./components/DrillList";
import AddDrillForm from "./components/AddDrillForm";
export default function App() {

  return (
    <div>
      <div className="container">
        <h1>Drill Timer</h1>
        <Timer />
        <DrillList />
      </div>
    </div>
  );
}
