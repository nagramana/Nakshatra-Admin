import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/Dashboard.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

function Dashboard() {


  
  const cards = [
    {
      title: "Total Products",
      value: "580",
    },
    {
      title: "Total Categories",
      value: "12",
    },
    {
      title: "Total Stock Units",
      value: "4520",
    },
    {
      title: "Low Stock Products",
      value: "18",
    },
    {
      title: "Inventory Value",
      value: "₹8.7L",
    },
    {
      title: "Orders",
      value: "2542",
    },
    {
      title: "Users",
      value: "16300",
    },
    {
      title: "Revenue",
      value: "₹50,120",
    },
  ];

  const salesData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Sales",
        data: [10, 20, 15, 30, 25, 40, 35, 50, 55, 65, 70, 85],
        borderColor: "#4F46E5",
        backgroundColor: "rgba(79,70,229,0.15)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const categoryData = {
    labels: [
      "Electronics",
      "Fashion",
      "Groceries",
      "Beauty",
    ],
    datasets: [
      {
        data: [40, 25, 20, 15],
        backgroundColor: [
          "#4F46E5",
          "#06B6D4",
          "#10B981",
          "#F59E0B",
        ],
      },
    ],
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div
  className="dashboard-content"
  style={{
    flex: 1,
    display: "flex",
    flexDirection: "column",
  }}
>
        <Navbar />

        <div
  className="dashboard-wrapper"
  style={{
    padding: "20px",
    margin: 0,
  }}
>

          <h1 className="dashboard-title">
            E-Commerce Dashboard
          </h1>

          {/* Cards */}
          <div className="cards-grid">
            {cards.map((card, index) => (
              <div
                key={index}
                className="dashboard-card"
              >
                <p className="card-title">
                  {card.title}
                </p>

                <h2 className="card-value">
                  {card.value}
                </h2>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="analytics-grid">

            <div className="chart-card">
              <h3>Sales Overview</h3>

              <Line data={salesData} />
            </div>

            <div className="right-panel">

              <div className="balance-card">
                <h2>₹ 9,470</h2>
                <p>Active Balance</p>

                <div className="balance-item">
                  <span>Income</span>
                  <strong>₹1699</strong>
                </div>

                <div className="balance-item">
                  <span>Expenses</span>
                  <strong>₹799</strong>
                </div>

                <div className="balance-item">
                  <span>Taxes</span>
                  <strong>₹199</strong>
                </div>
              </div>

              <div
  style={{
    width: "280px",
    height: "280px",
    margin: "0 auto",
  }}
>
  <Doughnut
    data={categoryData}
    options={{
      responsive: true,
      maintainAspectRatio: false,
      cutout: "70%",
      plugins: {
        legend: {
          position: "top",
        },
      },
    }}
  />
</div>

            </div>

          </div>

          {/* Orders */}
          <div className="table-card">
            <h2>Recent Orders</h2>

            <table className="order-table">

              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                <tr>
                  <td>#1001</td>
                  <td>Ramana</td>
                  <td>₹1200</td>
                  <td>
                    <span className="status delivered">
                      Delivered
                    </span>
                  </td>
                </tr>

                <tr>
                  <td>#1002</td>
                  <td>Kiran</td>
                  <td>₹850</td>
                  <td>
                    <span className="status processing">
                      Processing
                    </span>
                  </td>
                </tr>

                <tr>
                  <td>#1003</td>
                  <td>Ravi</td>
                  <td>₹2500</td>
                  <td>
                    <span className="status shipped">
                      Shipped
                    </span>
                  </td>
                </tr>

              </tbody>

            </table>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;