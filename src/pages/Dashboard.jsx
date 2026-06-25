import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/Dashboard.css";
import axios from "axios";
import { useState, useEffect } from "react";

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

  const [orders, setOrders] =
    useState([]);

  const [currentPage, setCurrentPage] =
    useState(1);

  const ordersPerPage = 10;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response =
        await axios.get(
          "https://nakshatra-mart-backend.onrender.com/api/orders"
        );

      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };



  const totalOrders =
    orders.length;

  const deliveredOrders =
    orders.filter(
      (order) =>
        order.orderStatus ===
        "Delivered"
    ).length;

  const shippedOrders =
    orders.filter(
      (order) =>
        order.orderStatus ===
        "Shipped"
    ).length;

  const pendingOrders =
    orders.filter(
      (order) =>
        order.orderStatus ===
        "Order Placed"
    ).length;

  const totalRevenue =
    orders.reduce(
      (sum, order) =>
        sum + (order.total || 0),
      0
    );

    const ordersToday = orders.filter(
  (order) => {
    const orderDate = new Date(
      order.createdAt ||
      order.createdOn ||
      order.date
    );

    const today = new Date();

    return (
      orderDate.getDate() ===
        today.getDate() &&
      orderDate.getMonth() ===
        today.getMonth() &&
      orderDate.getFullYear() ===
        today.getFullYear()
    );
  }
).length;


  const lastIndex =
    currentPage *
    ordersPerPage;

  const firstIndex =
    lastIndex -
    ordersPerPage;

  const currentOrders =
    orders.slice(
      firstIndex,
      lastIndex
    );

  const totalPages =
    Math.ceil(
      orders.length /
      ordersPerPage
    );
  const cards = [
  {
    title: "Total Orders",
    value: totalOrders,
  },
  {
    title: "Orders Today",
    value: ordersToday,
  },
  {
    title: "Pending Orders",
    value: pendingOrders,
  },
  {
    title: "Shipped Orders",
    value: shippedOrders,
  },
  {
    title: "Delivered Orders",
    value: deliveredOrders,
  },
  {
    title: "Revenue",
    value: `₹${totalRevenue}`,
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
                  <th>S.No</th>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>

              {/* <tbody>
                {currentOrders.map((order, index) => (
                  <tr
                    key={
                      order._id ||
                      order.id
                    }
                  >
                    <td>
                      {order.id}
                    </td>

                    <td>
                      {
                        order.customer
                          ?.name
                      }
                    </td>

                    <td>
                      ₹
                      {order.total}
                    </td>

                    <td>
                      <span
                        className="status"
                      >
                        {
                          order.orderStatus
                        }
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody> */}
              <tbody>
                {currentOrders.map((order, index) => (
                  <tr key={order._id}>

                    <td>
                      {(currentPage - 1) * ordersPerPage + index + 1}
                    </td>

                    <td>
                      {order.id
                        ? order.id
                        : `ORD-${order._id.slice(-6)}`}
                    </td>

                    <td>
                      {order.customer?.name}
                    </td>

                    <td>
                      ₹{order.total}
                    </td>

                    <td>
                      {order.orderStatus}
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

            <p
              style={{
                marginTop: "20px",
                marginBottom: "20px",
                fontSize: "18px",
                fontWeight: "600",
              }}
            >
              Total Orders: {orders.length}
            </p>



            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                marginTop: "10px",
              }}
            >
              <button
                onClick={() =>
                  setCurrentPage(
                    currentPage - 1
                  )
                }
                disabled={currentPage === 1}
                className="btn btn-secondary"
              >
                Previous
              </button>

              <span
                style={{
                  fontWeight: "600",
                  fontSize: "18px",
                }}
              >
                Page {currentPage} of{" "}
                {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage(
                    currentPage + 1
                  )
                }
                disabled={
                  currentPage === totalPages
                }
                className="btn btn-secondary"
              >
                Next
              </button>
            </div>


            {/* <div
              className="d-flex justify-content-center align-items-center gap-2 mt-4 flex-wrap"
            >
              <button
                className="btn btn-outline-primary"
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage(currentPage - 1)
                }
              >
                ←
              </button>

              {[...Array(totalPages)].map(
                (_, index) => (
                  <button
                    key={index}
                    className={
                      currentPage === index + 1
                        ? "btn btn-primary"
                        : "btn btn-outline-primary"
                    }
                    onClick={() =>
                      setCurrentPage(index + 1)
                    }
                  >
                    {index + 1}
                  </button>
                )
              )}

              <button
                className="btn btn-outline-primary"
                disabled={
                  currentPage === totalPages
                }
                onClick={() =>
                  setCurrentPage(currentPage + 1)
                }
              >
                →
              </button>
            </div> */}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;