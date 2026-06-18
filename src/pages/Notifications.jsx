import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Notifications() {
  const notifications = [
    "New Order Received",
    "Low Stock Alert",
    "Product Added Successfully",
    "User Registered",
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-content">
        <Navbar />

        <div className="dashboard-wrapper">
          <h1>Notifications</h1>

          {notifications.map((item, index) => (
            <div
              key={index}
              style={{
                background: "#fff",
                padding: "15px",
                borderRadius: "12px",
                marginBottom: "10px",
                boxShadow:
                  "0 4px 15px rgba(0,0,0,0.08)",
              }}
            >
              🔔 {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Notifications;