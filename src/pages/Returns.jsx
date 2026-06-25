import axios from "axios";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Returns() {
  const [returns, setReturns] =
    useState([]);

  const [currentPage, setCurrentPage] =
    useState(1);

  const [message, setMessage] =
    useState("");

  const returnsPerPage = 10;



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




  useEffect(() => {
    fetchReturns();
  }, []);

  const fetchReturns =
    async () => {
      try {
        const response =
          await axios.get(
            "https://nakshatra-mart-backend.onrender.com/api/orders"
          );

        const returnOrders =
          response.data.filter(
            (order) =>
              order.returnRequested === true
          );

        setReturns(returnOrders);
      } catch (error) {
        console.log(error);
      }
    };

  // useEffect(() => {
  //   localStorage.setItem(
  //     "returns",
  //     JSON.stringify(returns)
  //   );
  // }, [returns]);

    const updateStatus = async (
    id,
    status
  ) => {
    try {
      if (
        status === "Approved"
      ) {
        await axios.put(
          `https://nakshatra-mart-backend.onrender.com/api/orders/approve-return/${id}`
        );
      } else {
        await axios.put(
          `https://nakshatra-mart-backend.onrender.com/api/orders/reject-return/${id}`
        );
      }

      fetchReturns();

      setMessage(
        `✅ Return ${status}`
      );

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const indexOfLastReturn =
    currentPage * returnsPerPage;

  const indexOfFirstReturn =
    indexOfLastReturn -
    returnsPerPage;

  const currentReturns =
    returns.slice(
      indexOfFirstReturn,
      indexOfLastReturn
    );

  const totalPages = Math.ceil(
    returns.length /
    returnsPerPage
  );

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

          <div
            className="product-table-card"
            style={{
              overflowX: "auto",
              overflowY: "auto",
              maxHeight: "600px",
            }}
          >

            <table className="order-table">

              <thead>
    <tr>
      <th>S.No</th>
      <th>Return ID</th>
      <th>Product</th>
      <th>Customer</th>
      <th>Reason</th>
      <th>Status</th>
      <th>Action</th>
    </tr>
  </thead>

              <tbody>

                {currentReturns.map(
                  (item, index) => (
                    <tr key={item._id}>
                      <td>
                        {(currentPage - 1) *
                          returnsPerPage +
                          index +
                          1}
                      </td>
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
                              item._id,
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
                              item._id,
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

            <p
              style={{
                marginTop: "20px",
                fontWeight: "600",
              }}
            >
              Total Returns:
              {returns.length}
            </p>

            <div
              style={{
                display: "flex",
                justifyContent:
                  "center",
                alignItems: "center",
                gap: "10px",
                marginTop: "15px",
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

              <span>
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
          </div>

        </div>

      </div>

    </div>
  );
}

export default Returns;