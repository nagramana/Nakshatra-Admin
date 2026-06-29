import { FaBell, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  // Notification Count
  const notificationCount = 3;

  return (
    <header
      style={{
        width: "100%",
        height: "70px",
        background: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 25px",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxSizing: "border-box",
      }}
    >
      {/* Left Side */}
      <div>
        <h2
          style={{
            margin: 0,
            fontSize: "22px",
            color: "#111827",
            fontWeight: "700",
          }}
        >
          Dashboard
        </h2>
      </div>

      {/* Right Side */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "25px",
        }}
      >
        {/* Notification */}
        <div
          onClick={() => navigate("/notifications")}
          style={{
            position: "relative",
            cursor: "pointer",
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            background: "#f3f4f6",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transition: "0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#e5e7eb";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#f3f4f6";
          }}
        >
          <FaBell size={20} color="#374151" />

          {notificationCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-5px",
                right: "-5px",
                background: "#ef4444",
                color: "#fff",
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "11px",
                fontWeight: "bold",
              }}
            >
              {notificationCount}
            </span>
          )}
        </div>

        {/* User */}
        <div
          onClick={() => navigate("/users")}
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <FaUserCircle
            size={38}
            color="#4f46e5"
            style={{
              transition: "0.3s",
            }}
          />

          <div>
            <div
              style={{
                fontWeight: "600",
                fontSize: "15px",
                color: "#111827",
              }}
            >
              Admin
            </div>

            <div
              style={{
                fontSize: "12px",
                color: "#6b7280",
              }}
            >
              Super Admin
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;