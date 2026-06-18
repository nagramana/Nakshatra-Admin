import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
function Orders() {
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] =
    useState(null);

  const [orders, setOrders] = useState(() => {
    const savedOrders =
      localStorage.getItem("orders");

    return savedOrders
      ? JSON.parse(savedOrders)
      : [
        {
          id: "#1001",
          customer: "Ramana",
          amount: "₹1200",
          status: "Delivered",
          phone: "9876543210",
          address: "Vijayawada",
          payment: "UPI",

          items: [
            {
              name: "Wireless Headphones",
              image: "https://picsum.photos/100/100?random=1",
              price: 1200,
              qty: 1,
            },
          ],
        },
        {
          id: "#1002",
          customer: "Kiran",
          amount: "₹850",
          status: "Processing",
          phone: "9876543211",
          address: "Guntur",
          payment: "COD",

          items: [
            {
              name: "Bluetooth Speaker",
              image: "https://picsum.photos/100/100?random=2",
              price: 850,
              qty: 1,
            },
          ],
        },
        {
          id: "#1003",
          customer: "Ravi",
          amount: "₹2500",
          status: "Shipped",
          phone: "9876543212",
          address: "Hyderabad",
          payment: "Card",

          items: [
            {
              name: "Smart Watch",
              image: "https://picsum.photos/100/100?random=3",
              price: 2500,
              qty: 1,
            },
          ],
        },
      ];
  });

  // const updateStatus = (id, newStatus) => {
  //   setOrders(
  //     orders.map((order) =>
  //       order.id === id
  //         ? { ...order, status: newStatus }
  //         : order
  //     )
  //   );
  // };


  // ADD THIS CODE HERE
  // ==========================

  const totalOrders = orders.length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  const processingOrders = orders.filter(
    (order) => order.status === "Processing"
  ).length;

  const shippedOrders = orders.filter(
    (order) => order.status === "Shipped"
  ).length;

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const cancelledOrders = orders.filter(
    (order) => order.status === "Cancelled"
  ).length;

  // ==========================
  // END HERE
  // ==========================



  const updateStatus = (id, newStatus) => {
    const updatedOrders =
      orders.map((order) =>
        order.id === id
          ? {
            ...order,
            status: newStatus,
          }
          : order
      );

    setOrders(updatedOrders);

    localStorage.setItem(
      "orders",
      JSON.stringify(updatedOrders)
    );
  };
  const deleteOrder = (id) => {
    setOrders(
      orders.filter(
        (order) => order.id !== id
      )
    );
  };

  useEffect(() => {
    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );
  }, [orders]);

  // const totalOrders = orders.length;

  // const deliveredOrders =
  //   orders.filter(
  //     (order) =>
  //       order.status === "Delivered"
  //   ).length;

  // const processingOrders =
  //   orders.filter(
  //     (order) =>
  //       order.status === "Processing"
  //   ).length;

  // const pendingOrders =
  //   orders.filter(
  //     (order) =>
  //       order.status === "Pending"
  //   ).length;

  // const cancelledOrders =
  //   orders.filter(
  //     (order) =>
  //       order.status === "Cancelled"
  //   ).length;

  const cancelledRevenue = orders
    .filter(
      (order) =>
        order.status === "Cancelled"
    )
    .reduce((total, order) => {
      const amount = Number(
        String(order.amount || 0)
          .replace("₹", "")
          .replace(",", "")
      );

      return total + amount;
    }, 0);

  // const totalRevenue =
  //   orders.reduce(
  //     (total, order) =>
  //       total +
  //       Number(
  //         order.amount
  //           .replace("₹", "")
  //           .replace(",", "")
  //       ),
  //     0
  //   );

  const totalRevenue = orders
    .filter(
      (order) =>
        order.status !== "Cancelled"
    )
    .reduce((total, order) => {
      const amount = Number(
        String(order.amount || 0)
          .replace("₹", "")
          .replace(",", "")
      );

      return total + amount;
    }, 0);

  const allRevenue = orders.reduce(
    (total, order) => {
      const amount = Number(
        String(order.amount || 0)
          .replace("₹", "")
          .replace(",", "")
      );

      return total + amount;
    },
    0
  );

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-content">
        <Navbar />

        <div className="dashboard-wrapper">

          <h1 className="page-title">
            Orders Management
          </h1>

          {/* Analytics Cards */}
          <div className="stats-grid">

            <div className="premium-card">
              <h4>Total Orders</h4>
              <h2>{totalOrders}</h2>
            </div>

            <div className="premium-card">
              <h4>Delivered</h4>
              <h2>{deliveredOrders}</h2>
            </div>

            <div className="premium-card">
              <h4>Pending</h4>
              <h2>{pendingOrders}</h2>
            </div>

            <div className="premium-card">
              <h4>Processing</h4>
              <h2>{processingOrders}</h2>
            </div>

            <div className="premium-card">
              <h4>Shipped</h4>
              <h2>{shippedOrders}</h2>
            </div>

            <div className="premium-card">
              <h4>Cancelled</h4>
              <h2>{cancelledOrders}</h2>
            </div>

            <div className="premium-card">
              <h4>Delivered Revenue</h4>
              <h2>₹{totalRevenue}</h2>
            </div>

            <div className="premium-card">
              <h4>Cancelled Revenue</h4>
              <h2>₹{cancelledRevenue}</h2>
            </div>

            <div className="premium-card">
              <h4>Total Revenue</h4>
              <h2>₹{allRevenue}</h2>
            </div>

          </div>

          {/* Orders Table */}
          <div className="table-card">

            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
                marginBottom: "25px",
              }}
            >
              <h2>Orders List</h2>

              <div className="search-box">
                🔍
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }
                />
              </div>
            </div>

            <table className="order-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {orders
                  .filter(
                    (order) =>
                      order.id
                        .toLowerCase()
                        .includes(
                          search.toLowerCase()
                        ) ||
                      String(order.customer)
                        .toLowerCase()
                        .includes(search.toLowerCase())
                  )
                  .map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>

                      <td>{order.customer}</td>

                      <td>
                        {order.amount}
                      </td>

                      <td>
                        <select
                          className="status-select"
                          value={order.status}
                          onChange={(e) =>
                            updateStatus(
                              order.id,
                              e.target.value
                            )
                          }
                        >
                          <option>
                            Pending
                          </option>

                          <option>
                            Processing
                          </option>

                          <option>
                            Shipped
                          </option>

                          <option>
                            Delivered
                          </option>

                          <option>
                            Cancelled
                          </option>
                        </select>
                      </td>

                      <td>

                        <button
                          className="view-btn"
                          onClick={() =>
                            setSelectedOrder(order)
                          }
                        >
                          👁 View
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() =>
                            deleteOrder(order.id)
                          }
                        >
                          Delete
                        </button>

                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            {selectedOrder && (
              <div className="modal-overlay">

                <div className="order-modal">

                  <h2>Order Details</h2>

                  <p>
                    <strong>Order ID:</strong>
                    {" "}
                    {selectedOrder.id}
                  </p>

                  <p>
                    <strong>Customer:</strong>
                    {" "}
                    {selectedOrder.customer}
                  </p>

                  <p>
                    <strong>Phone:</strong>
                    {" "}
                    {selectedOrder.phone}
                  </p>

                  <p>
                    <strong>Address:</strong>
                    {" "}
                    {selectedOrder.address}
                  </p>

                  <p>
                    <strong>Payment:</strong>
                    {" "}
                    {selectedOrder.payment}
                  </p>

                  <p>
                    <strong>Amount:</strong>
                    {" "}
                    {selectedOrder.amount}
                  </p>

                  <h3>Products</h3>

                  {selectedOrder?.items &&
                    selectedOrder.items.length > 0 ? (
                    selectedOrder.items.map(
                      (item, index) => (
                        <div
                          key={index}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "15px",
                            padding: "10px",
                            borderBottom:
                              "1px solid #eee",
                          }}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{
                              width: "70px",
                              height: "70px",
                              objectFit: "cover",
                              borderRadius: "10px",
                            }}
                          />

                          <div>
                            <h4>{item.name}</h4>

                            <p>
                              Qty: {item.qty}
                            </p>

                            <p>
                              Price: ₹{item.price}
                            </p>
                          </div>
                        </div>
                      )
                    )
                  ) : (
                    <p
                      style={{
                        color: "#64748b",
                        marginTop: "10px",
                      }}
                    >
                      No Products Found
                    </p>
                  )}

                  <button
                    className="close-btn"
                    onClick={() =>
                      setSelectedOrder(null)
                    }
                  >
                    Close
                  </button>

                </div>

              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}

export default Orders;