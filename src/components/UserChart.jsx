import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function UserChart({ users }) {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
    ],

    datasets: [
      {
        label:
          "User Registrations",

        data: [
          users.length * 0.2,
          users.length * 0.3,
          users.length * 0.5,
          users.length * 0.7,
          users.length * 0.8,
          users.length,
        ],

        borderColor:
          "#082A78",

        backgroundColor:
          "#082A78",

        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,

    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div
      className="product-table-card"
      style={{
        marginTop: "25px",
      }}
    >
      <h3
        style={{
          marginBottom: "20px",
          color: "#082A78",
        }}
      >
        User Registration Analytics
      </h3>

      <Line
        data={data}
        options={options}
      />
    </div>
  );
}

export default UserChart;