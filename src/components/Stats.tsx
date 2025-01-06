import { ProgressBar } from "react-bootstrap";
import { Stat } from "@/lib/types";

interface StatsProps {
  stats: Stat;
}

const Stats: React.FC<StatsProps> = ({ stats }) => {
  const statEntries = Object.entries(stats) as [keyof Stat, number][];
  statEntries.shift(); //hide "_typename"

  return (
    <div>
      {statEntries.map(([key, value], index) => (
        <div key={index} className="mb-2">
          <h5>{key.toUpperCase()}</h5>
          <ProgressBar now={value} max={100} label={`${value}`} />
        </div>
      ))}
    </div>
  );
};

export default Stats;
