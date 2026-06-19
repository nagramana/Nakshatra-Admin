import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Returns() {
const [returns, setReturns] =
  useState([]);
  // const [returns, setReturns] = useState(() => {
  //   const savedReturns =
  //     localStorage.getItem("returns");

  //   return savedReturns
  //     ? JSON.parse(savedReturns)
  //     : [
  //         {
  //           id: "RET001",
  //           product: "Apple",
  //           customer: "Ramana",
  //           reason: "Damaged Product",
  //           status: "Pending",
  //         },
  //         {
  //           id: "RET002",
  //           product: "Milk",
  //           customer: "Kiran",
  //           reason: "Wrong Item",
  //           status: "Pending",
  //         },
  //       ];
  // });

  const [message, setMessage] =
    useState("");

    useEffect(() => {
  const orders =
    JSON.parse(
      localStorage.getItem(
        "orders"
      )
    ) || [];

  const returnOrders =
    orders.filter(
      (order) =>
        order.returnRequested
    );

  setReturns(returnOrders);
}, []);

  // useEffect(() => {
  //   localStorage.setItem(
  //     "returns",
  //     JSON.stringify(returns)
  //   );
  // }, [returns]);

  const updateStatus = (
  id,
  status
) => {
  const orders =
    JSON.parse(
      localStorage.getItem(
        "orders"
      )
    ) || [];

  const updatedOrders =
    orders.map((order) =>
      order.id === id
        ? {
            ...order,
            returnStatus:
              status,
            orderStatus:
              status ===
              "Approved"
                ? "Order Returned"
                : order.orderStatus,
          }
        : order
    );

  localStorage.setItem(
    "orders",
    JSON.stringify(
      updatedOrders
    )
  );

  setReturns(
  updatedOrders.filter(
    (order) =>
      order.returnRequested === true
  )
);

setMessage(
  `✅ Return ${status}`
);

setTimeout(() => {
  setMessage("");
}, 3000);
  };

  return (
    <div className="dashboard-layout">

      <Sidebar />

      <div className="dashboard-content">

        <Navbar />

        <div className="dashboard-wrapper">

          <h1 className="page-title">
            Returns Management
          </h1>

          {message && (
            <div
              style={{
                background:
                  "#22c55e",
                color: "#fff",
                padding: "12px",
                borderRadius: "10px",
                marginBottom:
                  "20px",
              }}
            >
              {message}
            </div>
          )}

          {/* Analytics Cards */}

          <div className="stats-grid">

            <div className="stat-card">
              <h4>
                Total Returns
              </h4>
              <h2>
                {returns.length}
              </h2>
            </div>

            <div className="stat-card">
              <h4>Pending</h4>
              <h2>
                {
                  returns.filter(
                    (r) =>
                      r.returnStatus ===
"Pending"
                  ).length
                }
              </h2>
            </div>

            <div className="stat-card">
              <h4>Approved</h4>
              <h2>
                {
                  returns.filter(
                    (r) =>
                      r.returnStatus ===
"Approved"

                  ).length
                }
              </h2>
            </div>

            <div className="stat-card">
              <h4>Rejected</h4>
              <h2>
                {
                  returns.filter(
                    (r) =>
                      r.returnStatus ===
"Rejected"
                  ).length
                }
              </h2>
            </div>

          </div>

          {/* Table */}

          <div className="product-table-card">

            <table className="order-table">

              <thead>
                <tr>
                  <th>
                    Return ID
                  </th>
                  <th>
                    Product
                  </th>
                  <th>
                    Customer
                  </th>
                  <th>
                    Reason
                  </th>
                  <th>
                    Status
                  </th>
                  <th>
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>

                {returns.map(
                  (item) => (
                    <tr
                      key={
                        item.id
                      }
                    >
                      <td>
                        {item.id}
                      </td>

                      <td>
  {item.items?.[0]?.name ||
    "Product"}
</td>

                      <td>
  {item.customer?.name}
</td>

                      <td>
  {item.returnReason}
</td>
                      <td>
                        <span
  className={
    item.returnStatus ===
    "Approved"
      ? "status-approved"
      : item.returnStatus ===
        "Rejected"
      ? "status-rejected"
      : "status-pending"
  }
>
  {item.returnStatus}
</span>
                      </td>

                      <td>

                        <button
                          className="approve-btn"
                          onClick={() =>
                            updateStatus(
                              item.id,
                              "Approved"
                            )
                          }
                        >
                          ✓ Approve
                        </button>

                        <button
                          className="reject-btn"
                          onClick={() =>
                            updateStatus(
                              item.id,
                              "Rejected"
                            )
                          }
                        >
                          ✕ Reject
                        </button>

                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Returns;