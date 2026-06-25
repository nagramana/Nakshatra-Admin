import {
  FaTachometerAlt,
  FaShoppingCart,
  FaBoxOpen,
  FaUndo,
  FaUsers,
  FaBell,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
  FaBullhorn,
} from "react-icons/fa";

import {
  Link,
  useLocation,
} from "react-router-dom";

function Sidebar() {

  const location =
    useLocation();

  const menuItems = [

    {
      name: "Dashboard",
      path: "/",
      icon: <FaTachometerAlt />,
    },

    {
      name: "Orders",
      path: "/orders",
      icon: <FaShoppingCart />,
    },

    {
      name: "Products",
      path: "/products",
      icon: <FaBoxOpen />,
    },

    {
      name: "Returns",
      path: "/returns",
      icon: <FaUndo />,
    },

    {
      name: "Users",
      path: "/users",
      icon: <FaUsers />,
    },

    // ✅ NEW ADS MENU
    {
      name: "Ads Management",
      path: "/ads",
      icon: <FaBullhorn />,
    },

    {
      name: "Notifications",
      path: "/notifications",
      icon: <FaBell />,
    },

    {
      name: "My Profile",
      path: "/profile",
      icon: <FaUserCircle />,
    },

    {
      name: "Settings",
      path: "/settings",
      icon: <FaCog />,
    },

  ];

  const logout = () => {

    localStorage.clear();

    window.location.href = "/";

  };

  return (

    <div
      style={{
        width: "270px",
        minHeight: "100vh",
        background: "#082A78",
        color: "#fff",
        padding: "25px 15px",
        display: "flex",
        flexDirection: "column",
      }}
    >

      <h2
        style={{
          marginBottom: "40px",
          textAlign: "center",
          fontWeight: "700",
          color: "#fff",
        }}
      >
        Nakshatra Admin
      </h2>

      <div style={{ flex: 1 }}>

        {menuItems.map((item) => (

          <Link
            key={item.path}
            to={item.path}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              padding: "14px 18px",
              marginBottom: "10px",
              borderRadius: "12px",
              textDecoration: "none",
              color: "#fff",

              background:
                location.pathname ===
                item.path
                  ? "rgba(255,255,255,0.15)"
                  : "transparent",

              transition: "0.3s",

              fontSize: "16px",
              fontWeight: "500",
            }}
          >

            <span
              style={{
                fontSize: "18px",
              }}
            >
              {item.icon}
            </span>

            {item.name}

          </Link>

        ))}

      </div>

      <button
        onClick={logout}
        style={{
          width: "100%",
          padding: "14px",
          background: "#ef4444",
          color: "#fff",
          border: "none",
          borderRadius: "12px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          fontWeight: "600",
        }}
      >

        <FaSignOutAlt />

        Logout

      </button>

    </div>

  );

}

export default Sidebar;