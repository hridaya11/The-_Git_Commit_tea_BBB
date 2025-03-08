"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register the required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

interface MonthlyRevenueChartProps {
  /**
   * Array of revenue data points, e.g. [3000, 4000, 4500, 5000, 5800, 6200]
   */
  dataPoints?: number[];

  /**
   * Labels for each data point, e.g. ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
   */
  labels?: string[];
}

export function MonthlyRevenueChart({
  dataPoints = [3000, 4000, 4500, 5000, 5800, 6200],
  labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
}: MonthlyRevenueChartProps) {
  // Build the data object for Chart.js
  const data = {
    labels,
    datasets: [
      {
        label: "Revenue",
        data: dataPoints,
        borderColor: "#6366f1", // Indigo-500
        fill: true,
        tension: 0.3, // Curved line
        backgroundColor: (context: any) => {
          // Safely create a gradient fill
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            // Return a fallback color if chartArea isn't ready yet
            return "rgba(99, 102, 241, 0.5)";
          }
          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          );
          gradient.addColorStop(0, "rgba(99, 102, 241, 0.5)"); // semi-transparent Indigo
          gradient.addColorStop(1, "rgba(99, 102, 241, 0)");   // fully transparent
          return gradient;
        },
      },
    ],
  };

  // Chart.js configuration
  const options: ChartJS.ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <div className="h-60 w-full">
      <Line data={data} options={options} />
    </div>
  );
}
