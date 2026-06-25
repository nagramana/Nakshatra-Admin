import axios from "axios";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function Users() {
  // const [users, setUsers] = useState([
  //   {
  //     id: "USR001",
  //     name: "Ramana",
  //     email: "ramana@gmail.com",
  //     orders: 12,
  //     status: "Active",
  //     joined: "2025-01-10",
  //   },
  //   {
  //     id: "USR002",
  //     name: "Kiran",
  //     email: "kiran@gmail.com",
  //     orders: 5,
  //     status: "Active",
  //     joined: "2025-03-15",
  //   },
  // ]);
  const [users, setUsers] =
    useState([]);

  const [message, setMessage] = useState("");
  const [selectedUser, setSelectedUser] =
    useState(null);

  const [currentPage, setCurrentPage] =
    useState(1);

const [search, setSearch] =
  useState("");

  const usersPerPage = 10;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
  try {
    const response =
      await axios.get(
        "http://localhost:5000/api/users"
      );

    console.log(
      "USERS API DATA:",
      response.data
    );

    setUsers(response.data);
  } catch (error) {
    console.log(error);
  }
};
  const toggleStatus = (id) => {
    setUsers(
      users.map((user) =>
        user._id === id
          ? {
            ...user,
            status:
              user.status === "Active"
                ? "Blocked"
                : "Active",
          }
          : user
      )
    );

    setMessage("✅ User Status Updated");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const deleteUser = (id) => {
  setUsers(
    users.filter(
      (user) => user._id !== id
    )
  );

  setMessage("🗑 User Deleted");

  setTimeout(() => {
    setMessage("");
  }, 3000);
};

  const indexOfLastUser =
    currentPage * usersPerPage;

  const indexOfFirstUser =
    indexOfLastUser -
    usersPerPage;

    const filteredUsers =
  users.filter(
    (user) =>
      user.name
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||
      user.email
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
  );

  const currentUsers =
  filteredUsers.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  const totalPages = Math.ceil(
  filteredUsers.length /
  usersPerPage
);

const exportUsersPDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text(
    "Users Report",
    14,
    15
  );

  autoTable(doc, {
    startY: 25,

    head: [[
      "Name",
      "Email",
      "Status",
      "Joined",
    ]],

    body: users.map((user) => [
      user.name,
      user.email,
      user.status,
      new Date(
        user.createdAt
      ).toLocaleDateString(),
    ]),
  });

  doc.save(
    "Users_Report.pdf"
  );
};
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-content">
        <Navbar />

        <div className="dashboard-wrapper">
          <h1 className="page-title">
            Users Management
          </h1>

          {message && (
            <div
              style={{
                background: "#22c55e",
                color: "#fff",
                padding: "12px",
                borderRadius: "10px",
                marginBottom: "20px",
              }}
            >
              {message}
            </div>
          )}

          <div className="stats-grid">

            <div className="stat-card">
              <h4>Total Users</h4>
              <h2>{users.length}</h2>
            </div>

            <div className="stat-card">
              <h4>Active Users</h4>
              <h2>
                {
                  users.filter(
                    (u) => u.status === "Active"
                  ).length
                }
              </h2>
            </div>

            <div className="stat-card">
              <h4>Blocked Users</h4>
              <h2>
                {
                  users.filter(
                    (u) => u.status === "Blocked"
                  ).length
                }
              </h2>
            </div>

            {/* <div className="stat-card">
              <h4>Total Orders</h4>
              <h2>
                {
                  users.reduce(
                    (total, user) =>
                      total + (user.orders || 0),
                    0
                  )
                }
              </h2>
            </div> */}

            <div className="stat-card">
              <h4>New Users</h4>
              <h2>
                {
                  users.filter(
                    (u) =>
                      new Date(u.createdAt).getMonth() ===
                      new Date().getMonth()
                  ).length
                }
              </h2>
            </div>

            {/* <div className="stat-card">
              <h4>Total Revenue</h4>
              <h2>
                ₹
                {users.reduce(
                  (total, user) =>
                    total +
                    (user.orders || 0) *
                    500,
                  0
                )}
              </h2>
            </div> */}

          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
              gap: "15px",
            }}
          >
            <input
  type="text"
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
  placeholder="🔍 Search User..."
  className="form-control"
  style={{
    maxWidth: "350px",
    height: "50px",
    borderRadius: "12px",
    border: "1px solid #d1d5db",
    fontSize: "15px",
  }}
/>

            <button
  className="btn btn-success"
  onClick={exportUsersPDF}
>
  📄 Export PDF
</button>
          </div>
          <div className="product-table-card">
            <table className="order-table">
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>S.No</th>
                  <th>User</th>
                  <th>Email</th>
                  <th>Orders</th>
                  <th>Status</th>
                  <th>Joined</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {currentUsers.map((user, index) => (
                  <tr key={user._id}>
                    {/* <td>{user.id}</td>

                    <td>
                      {(currentPage - 1) *
                        usersPerPage +
                        index +
                        1}
                    </td>
                    <td>{user.id}</td>
                    <td>
                      {(currentPage - 1) * usersPerPage + index + 1}
                    </td> */}

                    <td>
                      {user._id.slice(-6)}
                    </td>

                    <td>
                      {(currentPage - 1) *
                        usersPerPage +
                        index +
                        1}
                    </td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <div
                          style={{
                            width: "42px",
                            height: "42px",
                            borderRadius: "50%",
                            background:
                              "linear-gradient(135deg,#082A78,#2563eb)",
                            color: "#fff",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontWeight: "700",
                          }}
                        >
                          {user.name
                            ?.charAt(0)
                            ?.toUpperCase()}
                        </div>

                        <span>{user.name}</span>
                      </div>
                    </td>
                    <td>{user.email}</td>
                  <td>
  <span
    style={{
      background: "#3b82f6",
      color: "#fff",
      padding: "6px 12px",
      borderRadius: "20px",
      fontWeight: "600",
    }}
  >
    {user.orders || 0}
  </span>
</td>

                    <td>
                      <span
                        style={{
                          background:
                            user.status ===
                              "Active"
                              ? "#22c55e"
                              : "#ef4444",
                          color: "#fff",
                          padding:
                            "6px 12px",
                          borderRadius:
                            "20px",
                          fontSize:
                            "13px",
                        }}
                      >
                        {user.status}
                      </span>
                    </td>

                    <td>
                      {new Date(
                        user.createdAt
                      ).toLocaleDateString()}
                    </td>

                    <td>
                      <button
                        className="edit-btn"
                        onClick={() =>
                          toggleStatus(user._id)
                        }
                        style={{
                          background: "#f59e0b",
                          marginRight: "10px",
                        }}
                      >
                        {user.status === "Active"
                          ? "Block"
                          : "Unblock"}
                      </button>

                      <button
                        className="edit-btn"
                        style={{
                          background: "#3b82f6",
                          marginRight: "10px",
                        }}
                        onClick={() =>
                          setSelectedUser(user)
                        }
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p
              style={{
                marginTop: "20px",
                fontWeight: "600",
              }}
            >
              Total Users:
              {users.length}
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
        
{selectedUser && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background:
        "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
    }}
  >
    <div
      style={{
        background: "#fff",
        width: "450px",
        padding: "25px",
        borderRadius: "15px",
      }}
    >
      <h3>User Details</h3>

      <hr />

      <p>
        <strong>Name:</strong>{" "}
        {selectedUser.name}
      </p>

      <p>
        <strong>Email:</strong>{" "}
        {selectedUser.email}
      </p>

      <p>
        <strong>Status:</strong>{" "}
        {selectedUser.status}
      </p>

      <p>
        <strong>Joined:</strong>{" "}
        {new Date(
          selectedUser.createdAt
        ).toLocaleDateString()}
      </p>

      <button
        className="btn btn-danger"
        onClick={() =>
          setSelectedUser(null)
        }
      >
        Close
      </button>
    </div>
  </div>
)}

      </div>
    </div>
  );

  
}

export default Users;