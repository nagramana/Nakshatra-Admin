import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Users() {
  const [users, setUsers] = useState([
    {
      id: "USR001",
      name: "Ramana",
      email: "ramana@gmail.com",
      orders: 12,
      status: "Active",
      joined: "2025-01-10",
    },
    {
      id: "USR002",
      name: "Kiran",
      email: "kiran@gmail.com",
      orders: 5,
      status: "Active",
      joined: "2025-03-15",
    },
  ]);

  const [message, setMessage] = useState("");

  const toggleStatus = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id
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
    setUsers(users.filter((user) => user.id !== id));

    setMessage("🗑 User Deleted");

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

  <div className="stat-card">
    <h4>Total Orders</h4>
    <h2>
      {
        users.reduce(
          (total, user) =>
            total + user.orders,
          0
        )
      }
    </h2>
  </div>

</div>

          <div className="product-table-card">
            <table className="order-table">
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>User</th>
                  <th>Email</th>
                  <th>Orders</th>
                  <th>Status</th>
                  <th>Joined</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
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
      {user.name.charAt(0)}
    </div>

    <span>{user.name}</span>
  </div>
</td>
                    <td>{user.email}</td>
                    <td>{user.orders}</td>

                    <td>
                      <span
  className={
    user.status === "Active"
      ? "status-approved"
      : "status-rejected"
  }
>
  {user.status}
</span>
                    </td>

                    <td>{user.joined}</td>

                    <td>
                      <button
                         className="edit-btn"
  onClick={() =>
    toggleStatus(user.id)
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
                        className="delete-btn"
  onClick={() =>
    deleteUser(user.id)
  }
                        style={{
                          background: "#ef4444",
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;