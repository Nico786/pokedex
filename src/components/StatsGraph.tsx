import React, { useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Stat } from "@/lib/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface StatsGraphProps {
  stats: Stat;
}

const StatsGraph: React.FC<StatsGraphProps> = ({ stats }) => {
  const chartRef = useRef<ChartJS | null>(null);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  const data = {
    labels: Object.keys(stats),
    datasets: [
      {
        label: "Stats",
        data: Object.values(stats),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return <Bar ref={chartRef} data={data} />;
};

export default StatsGraph;
