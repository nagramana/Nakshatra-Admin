import { FaBell, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "20px",
        background: "#fff",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "25px",
          alignItems: "center",
        }}
      >
        <div
          onClick={() => navigate("/notifications")}
          style={{
            cursor: "pointer",
            position: "relative",
          }}
        >
          <FaBell size={22} />

          <span
            style={{
              position: "absolute",
              top: "-8px",
              right: "-8px",
              background: "#ef4444",
              color: "#fff",
              borderRadius: "50%",
              width: "18px",
              height: "18px",
              fontSize: "11px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            3
          </span>
        </div>

        <FaUserCircle
          size={30}
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/users")}
        />
      </div>
    </div>
  );
}

export default Navbar;