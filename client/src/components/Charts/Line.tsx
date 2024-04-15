"use client";

import {
  CategoryScale,
  ChartData,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

export default function LineChart({
  data,
  options,
}: {
  data: ChartData<"line">;
  options: any;
}) {
  return <Line data={data} options={options} />;
}
