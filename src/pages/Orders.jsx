import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";

const API_URL =
  "https://nakshatra-mart-backend.onrender.com";

function Orders() {
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] =
    useState(null);


  const [currentPage, setCurrentPage] =
    useState(1);

  const ordersPerPage = 10;

  // const [orders, setOrders] = useState(() => {
  //   const savedOrders =
  //     localStorage.getItem("orders");

  //   try {
  //     return savedOrders
  //       ? JSON.parse(savedOrders)
  //       : [];
  //   } catch {
  //     return [];
  //   }
  // });
  const [orders, setOrders] =
    useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/orders`
      );

      console.log("Orders Data:", res.data);

      setOrders(res.data);
    } catch (error) {
      console.error(
        "Error fetching orders:",
        error
      );
    }
  };

  // const [orders, setOrders] = useState(() => {
  //   const savedOrders =
  //     localStorage.getItem("orders");

  // return savedOrders
  //   ? JSON.parse(savedOrders)
  //   : [
  //     {
  //       id: "#1001",
  //       customer: "Ramana",
  //       amount: "₹1200",
  //       status: "Delivered",
  //       phone: "9876543210",
  //       address: "Vijayawada",
  //       payment: "UPI",

  //       items: [
  //         {
  //           name: "Wireless Headphones",
  //           image: "https://picsum.photos/100/100?random=1",
  //           price: 1200,
  //           qty: 1,
  //         },
  //       ],
  //     },
  //     {
  //       id: "#1002",
  //       customer: "Kiran",
  //       amount: "₹850",
  //       status: "Processing",
  //       phone: "9876543211",
  //       address: "Guntur",
  //       payment: "COD",

  //       items: [
  //         {
  //           name: "Bluetooth Speaker",
  //           image: "https://picsum.photos/100/100?random=2",
  //           price: 850,
  //           qty: 1,
  //         },
  //       ],
  //     },
  //     {
  //       id: "#1003",
  //       customer: "Ravi",
  //       amount: "₹2500",
  //       status: "Shipped",
  //       phone: "9876543212",
  //       address: "Hyderabad",
  //       payment: "Card",

  //       items: [
  //         {
  //           name: "Smart Watch",
  //           image: "https://picsum.photos/100/100?random=3",
  //           price: 2500,
  //           qty: 1,
  //         },
  //       ],
  //     },
  //   ];

  //     const [orders, setOrders] = useState(() => {
  //   const savedOrders =
  //     localStorage.getItem("orders");

  //   return savedOrders
  //     ? JSON.parse(savedOrders)
  //     : [];
  // });

  //   const [orders, setOrders] =
  //     useState([]);
  // });

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


  const totalOrders = orders?.length || 0;


  const deliveredOrders =
    (orders || []).filter(
      (order) =>
        (
          order.orderStatus ||
          order.status
        ) === "Delivered"
    ).length;

  const processingOrders = orders.filter(
    (order) => order.status === "Processing"
  ).length;

  const shippedOrders =
    orders.filter(
      (order) =>
        (
          order.orderStatus ||
          order.status
        ) === "Shipped"
    ).length;

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const cancelledOrders =
    orders.filter(
      (order) =>
        (
          order.orderStatus ||
          order.status
        ) === "Cancelled"
    ).length;

  // ==========================
  // END HERE
  // ==========================



  // const updateStatus = (id, newStatus) => {
  //   const updatedOrders =
  //     orders.map((order) =>
  //       order.id === id
  //         ? {
  //           ...order,
  //           status: newStatus,
  //         }
  //         : order
  //     );




  const updateStatus = async (
    id,
    newStatus
  ) => {
    try {
      await axios.put(
        `${API_URL}/api/orders/status/${id}`,
        {
          orderStatus: newStatus,
        }
      );

      fetchOrders();
    } catch (error) {
      console.error(
        "Status update failed:",
        error
      );
    }
  };

  const deleteOrder = async (id) => {
    try {
      await axios.delete(
        `${API_URL}/api/orders/${id}`
      );

      fetchOrders();
    } catch (error) {
      console.error(
        "Delete failed:",
        error
      );
    }
  };

  // useEffect(() => {
  //   localStorage.setItem(
  //     "orders",
  //     JSON.stringify(orders)
  //   );
  // }, [orders]);

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
        (
          order.orderStatus ||
          order.status
        ) === "Cancelled"
    )
    .reduce((total, order) => {
      const amount = Number(
        order.total ||
        order.amount ||
        0
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
        (
          order.orderStatus ||
          order.status
        ) === "Delivered"
    )
    .reduce((total, order) => {
      return (
        total +
        Number(
          order.total ||
          order.totalAmount ||
          order.amount ||
          0
        )
      );
    }, 0);
  console.log(
    "Orders Data:",
    orders
  );
  const allRevenue = orders.reduce(
    (total, order) => {
      return (
        total +
        Number(
          order.total ||
          order.totalAmount ||
          order.amount ||
          0
        )
      );
    },
    0
  );


  // ==========================
  // PAGINATION CODE START
  // ==========================

  const filteredOrders = orders.filter(
    (order) => {

      const customerName = String(
        order.userId?.name ||
        order.customer?.name ||
        order.customer ||
        ""
      );

      const orderId = String(
        order.id ||
        order.orderId ||
        order._id ||
        ""
      );

      return (
        customerName
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        orderId
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
      );
    }
  );

  const indexOfLastOrder =
    currentPage * ordersPerPage;

  const indexOfFirstOrder =
    indexOfLastOrder -
    ordersPerPage;

  const currentOrders =
    filteredOrders.slice(
      indexOfFirstOrder,
      indexOfLastOrder
    );

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredOrders.length /
      ordersPerPage
    )
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

            {/* <div className="premium-card">
              <h4>Processing</h4>
              <h2>{processingOrders}</h2>
            </div> */}

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
          <div
            className="table-card"
            style={{
              overflow: "visible",
              maxHeight: "none",
            }}
          >

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
                  <th>S.No</th>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              {/* <tbody>
                {orders
                  .filter(
                    (order) =>
                      String(order.id || "")
                        .toLowerCase()
                        .includes(
                          search.toLowerCase()
                        ) ||
                      (
                        typeof order.customer === "object"
                          ? order.customer?.name || ""
                          : order.customer || ""
                      )
                        .toLowerCase()
                        .includes(
                          search.toLowerCase()
                        )
                  )

                  .map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>

                      <td>
                        {typeof order.customer === "object"
                          ? order.customer?.name
                          : order.customer}
                      </td>

                      <td>
                        ₹
                        {order.total
                          ? order.total.toFixed(2)
                          : order.amount}
                      </td>

                      <td>
                        <select
                          className="status-select"
                          value={
                            order.orderStatus ||
                            order.status
                          }
                          onChange={(e) =>
                            updateStatus(
                              order.id,
                              e.target.value
                            )
                          }
                        >
                          <option>Order Placed</option>
                          <option>Confirmed</option>
                          <option>Shipped</option>
                          <option>Delivered</option>
                          <option>Order Returned</option>
                          <option>Cancelled</option>
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
              </tbody> */}
              {/* <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>
                      {order.orderId ||
                        order._id}
                    </td>

                    <td>
                      {order.userId?.name ||
                        order.customer?.name ||
                        order.customer ||
                        "N/A"}
                    </td>

                    <td>
                      ₹
                      {order.total ||
                        order.totalAmount ||
                        order.amount ||
                        0}
                    </td>

                    <td>
                      <select
                        className="status-select"
                        value={
                          order.orderStatus ||
                          order.status
                        }
                        onChange={(e) =>
                          updateStatus(
                            order._id,
                            e.target.value
                          )
                        }
                      >
                        <option>
                          Order Placed
                        </option>
                        <option>
                          Confirmed
                        </option>
                        <option>
                          Shipped
                        </option>
                        <option>
                          Delivered
                        </option>
                        <option>
                          Order Returned
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
                          deleteOrder(order._id)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody> */}

              <tbody>
                {currentOrders.map(
                  (order, index) => (

                    <tr key={order._id}>
                      {/* S.No */}
                      <td>
                        {(currentPage - 1) *
                          ordersPerPage +
                          index +
                          1}
                      </td>

                      {/* Order ID */}
                      <td>
                        {order.id || order.orderId || order._id}
                      </td>

                      {/* Customer */}
                     <td>
  {typeof order.customer === "object"
    ? order.customer?.name
    : order.customer || "N/A"}
</td>

                      {/* Amount */}
                      <td>
                        ₹
                        {order.total ||
                          order.totalAmount ||
                          order.amount ||
                          0}
                      </td>

                      {/* Status */}
                      <td>
                        <select
  className="status-select"
  value={
    order.orderStatus ||
    order.status
  }
  onChange={(e) =>
    updateStatus(
      order._id,
      e.target.value
    )
  }
>
                          <option>Order Placed</option>
                          <option>Confirmed</option>
                          <option>Shipped</option>
                          <option>Delivered</option>
                          <option>Order Returned</option>
                          <option>Cancelled</option>
                        </select>
                      </td>

                      {/* Action */}
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
                            deleteOrder(order._id)
                          }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>

            </table>

            <p>
              Total Orders:
              {filteredOrders.length}
            </p>

            <p
              style={{
                marginTop: "20px",
                fontWeight: "600",
              }}
            >
              Total Orders:
              {filteredOrders.length}
            </p>
            {/* <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                marginTop: "20px",
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
                  fontWeight: "bold",
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
            </div> */}

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                marginTop: "20px",
              }}
            >
              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.max(prev - 1, 1)
                  )
                }
                disabled={currentPage === 1}
              >
                Previous
              </button>

              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(
                      prev + 1,
                      totalPages
                    )
                  )
                }
                disabled={
                  currentPage === totalPages
                }
              >
                Next
              </button>
            </div>

            {selectedOrder && (
              <div className="modal-overlay">

                <div className="order-modal">

                  {/* <h2>Order Details</h2>

                  <p>
                    <strong>Order ID:</strong>
                    {selectedOrder.id ||
                      selectedOrder.orderId ||
                      selectedOrder._id}
                  </p>

                  <p>
                    <strong>Customer:</strong>{" "}
                    {typeof selectedOrder.customer === "object"
                      ? selectedOrder.customer?.name
                      : selectedOrder.customer}
                  </p>

                  <p>
                    <strong>Phone:</strong>{" "}
                    {selectedOrder.customer?.phone ||
                      selectedOrder.phone}
                  </p>

                  <p>
                    <strong>Address:</strong>{" "}
                    {selectedOrder.customer?.address ||
                      selectedOrder.address}
                  </p>

                  <p>
                    <strong>Payment:</strong>{" "}
                    {selectedOrder.paymentMethod ||
                      selectedOrder.payment}
                  </p>


                  <p>
                    <strong>Transaction ID:</strong>{" "}
                    {selectedOrder.transactionId}
                  </p>

                  {selectedOrder.transactionId && (
                    <a
                      href={selectedOrder.transactionId}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-primary"
                    >
                      View Payment Proof
                    </a>
                  )}

                  {selectedOrder.transactionId && (

                    <div
                      style={{
                        marginTop: "10px",
                      }}
                    >
                      <strong>
                        Payment Proof:
                      </strong>

                      <br />

                      <a
                        href={
                          selectedOrder.transactionId
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-primary mt-2"
                      >
                        View Payment Proof
                      </a>

                    </div>

                  )}
                  <p>
                    <strong>Amount:</strong>{" "}
                    ₹
                    {selectedOrder.total
                      ? selectedOrder.total.toFixed(2)
                      : selectedOrder.amount}
                  </p>


                  <p>
                    <strong>
                      Return Status:
                    </strong>{" "}
                    {selectedOrder.returnStatus ||
                      "No Request"}
                  </p>

                  <p>
                    <strong>
                      Return Reason:
                    </strong>{" "}
                    {selectedOrder.returnReason ||
                      "-"}
                  </p> */}


                  <div className="order-section">

                    <div className="section-header">
                      Customer Information
                    </div>

                    <div className="section-body">

                      <div className="info-row">
                        <span>Order ID</span>
                        <span>
                          {selectedOrder.id ||
                            selectedOrder.orderId ||
                            selectedOrder._id}
                        </span>
                      </div>

                      <div className="info-row">
                        <span>Customer</span>
                        <span>
                          {selectedOrder.customer?.name ||
                            selectedOrder.customer}
                        </span>
                      </div>

                      <div className="info-row">
                        <span>Phone</span>
                        <span>
                          {selectedOrder.customer?.phone ||
                            "-"}
                        </span>
                      </div>

                      <div className="info-row">
                        <span>Payment</span>
                        <span>
                          {selectedOrder.paymentMethod ||
                            selectedOrder.payment ||
                            "-"}
                        </span>
                      </div>

                      <div className="info-row">
                        <span>Amount</span>
                        <span>
                          ₹
                          {selectedOrder.total ||
                            selectedOrder.amount ||
                            0}
                        </span>
                      </div>

                      <div className="info-row">
                        <span>Status</span>
                        <span>
                          {selectedOrder.orderStatus ||
                            selectedOrder.status}
                        </span>
                      </div>

                    </div>

                  </div>

                  <div className="order-section">

                    <div className="section-header">
                      Delivery Address
                    </div>

                    <div className="section-body">
                      {selectedOrder.customer?.address ||
                        selectedOrder.address ||
                        "No Address"}
                    </div>

                  </div>
                  {/* <h3>Products</h3>

                  

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
                              Qty: {item.quantity || item.qty}
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
                  )} */}



                  <div className="order-section">

                    <div className="section-header">
                      Products (
                      {selectedOrder?.items?.length || 0}
                      )
                    </div>

                    <div className="section-body">

                      {selectedOrder?.items?.length > 0 ? (

                        <table className="product-table">

                          <thead>
                            <tr>
                              <th>Image</th>
                              <th>Product</th>
                              <th>Qty</th>
                              <th>Price</th>
                              <th>Total</th>
                            </tr>
                          </thead>

                          <tbody>

                            {selectedOrder.items.map(
                              (item, index) => (
                                <tr key={index}>

                                  <td>
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      style={{
                                        width: "60px",
                                        height: "60px",
                                        objectFit: "cover",
                                        borderRadius: "8px",
                                      }}
                                    />
                                  </td>

                                  <td>
                                    {item.name}
                                  </td>

                                  <td>
                                    {item.quantity ||
                                      item.qty}
                                  </td>

                                  <td>
                                    ₹{item.price}
                                  </td>

                                  <td>
                                    ₹
                                    {item.price *
                                      (item.quantity ||
                                        item.qty)}
                                  </td>

                                </tr>
                              )
                            )}

                          </tbody>

                        </table>

                      ) : (

                        <p
                          style={{
                            color: "#64748b",
                          }}
                        >
                          No Products Found
                        </p>

                      )}

                    </div>

                  </div>



                  {selectedOrder.returnRequested &&
                    selectedOrder.returnStatus ===
                    "Pending" && (
                      <div
                        style={{
                          marginTop: "15px",
                          display: "flex",
                          gap: "10px",
                        }}
                      >
                        <button
                          className="btn btn-success"
                          onClick={() => {
                            updateStatus(
                              selectedOrder.id,
                              "Order Returned"
                            );

                            const updatedOrders =
                              orders.map(
                                (order) =>
                                  order.id ===
                                    selectedOrder.id
                                    ? {
                                      ...order,
                                      returnStatus:
                                        "Approved",
                                    }
                                    : order
                              );

                            setOrders(
                              updatedOrders
                            );

                            setSelectedOrder({
                              ...selectedOrder,
                              returnStatus:
                                "Rejected",
                            });

                            localStorage.setItem(
                              "orders",
                              JSON.stringify(
                                updatedOrders
                              )
                            );
                          }}
                        >
                          Approve Return
                        </button>

                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            const updatedOrders =
                              orders.map(
                                (order) =>
                                  order.id ===
                                    selectedOrder.id
                                    ? {
                                      ...order,
                                      returnStatus:
                                        "Rejected",
                                    }
                                    : order
                              );

                            setOrders(
                              updatedOrders
                            );

                            localStorage.setItem(
                              "orders",
                              JSON.stringify(
                                updatedOrders
                              )
                            );
                          }}
                        >
                          Reject Return
                        </button>
                      </div>
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