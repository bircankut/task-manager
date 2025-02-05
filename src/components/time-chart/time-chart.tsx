import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const WeekHoursChart = () => {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thus", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Hours Worked",
        data: [7, 6, 5, 5, 3, 6, 8], // Example data points
        borderColor: "rgb(118,75,192)",
        backgroundColor: "rgba(75, 192, 192, 1)",
        fill: true,
        pointRadius: 0, // Hide points
        tension: 0.3, // Smooth curve
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        min: 0,
        max: 8,
        ticks: {
          stepSize: 2,
        },
      },
      x: {
        grid: {
          drawBorder: false,
          drawTicks: false,
          display: false,
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default WeekHoursChart;
