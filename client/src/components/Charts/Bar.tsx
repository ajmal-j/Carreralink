"use client";

import {
  BarElement,
  CategoryScale,
  ChartData,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

export default function BarChart({
  data,
  options,
}: {
  data: ChartData<"bar">;
  options: any;
}) {
  return <Bar data={data} options={options} />;
}
