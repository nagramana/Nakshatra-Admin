import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function Settings() {
  const [settings, setSettings] = useState({
    storeName: "Nakshatra Mart",
    email: "admin@nakshatra.com",
    phone: "+91 9876543210",
    notifications: true,
    darkMode: false,
    themeColor: "#082A78",
  });


  // ADD HERE 👇

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Products Report", 14, 20);

    autoTable(doc, {
      head: [["ID", "Name", "Category", "Price", "Stock"]],
      body: [
        ["1781790000001", "Apple", "Fruits", "120", "50"],
        ["1781790000002", "Milk", "Dairy", "60", "5"],
      ],
    });

    doc.save("Products_Report.pdf");
  };


  const [profileImage, setProfileImage] = useState(
    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  );

  const [storeLogo, setStoreLogo] = useState(
    "https://cdn-icons-png.flaticon.com/512/3081/3081559.png"
  );

  const logs = [
    "Added Product",
    "Updated Product",
    "Deleted Product",
    "Downloaded PDF Report",
    "Created New Category",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } =
      e.target;

    setSettings({
      ...settings,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });
  };

  const saveSettings = () => {
    localStorage.setItem(
      "settings",
      JSON.stringify(settings)
    );

    alert("Settings Saved Successfully");
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-content">
        <Navbar />

        <div style={{ padding: "30px" }}>
          <h1
            style={{
              color: "#082A78",
              marginBottom: "25px",
            }}
          >
            Settings
          </h1>

          {/* Store Info */}

          <div className="settings-card">
            <h3>Store Information</h3>

            <div className="settings-grid">
              <input
                type="text"
                name="storeName"
                value={settings.storeName}
                onChange={handleChange}
                placeholder="Store Name"
              />

              <input
                type="email"
                name="email"
                value={settings.email}
                onChange={handleChange}
                placeholder="Email"
              />

              <input
                type="text"
                name="phone"
                value={settings.phone}
                onChange={handleChange}
                placeholder="Phone"
              />
            </div>
          </div>

          {/* Profile Image */}

          <div className="settings-card">
            <h3>Profile Image</h3>

            <img
              src={profileImage}
              alt="profile"
              width="120"
              style={{
                borderRadius: "50%",
                marginBottom: "15px",
              }}
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file =
                  e.target.files[0];

                if (file) {
                  setProfileImage(
                    URL.createObjectURL(file)
                  );
                }
              }}
            />
          </div>

          {/* Store Logo */}

          <div className="settings-card">
            <h3>Store Logo</h3>

            <img
              src={storeLogo}
              alt="logo"
              width="120"
              style={{
                marginBottom: "15px",
              }}
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file =
                  e.target.files[0];

                if (file) {
                  setStoreLogo(
                    URL.createObjectURL(file)
                  );
                }
              }}
            />
          </div>

          {/* Security */}

          <div className="settings-card">
            <h3>Security Settings</h3>

            <div className="settings-grid">
              <input
                type="password"
                placeholder="Current Password"
              />

              <input
                type="password"
                placeholder="New Password"
              />

              <input
                type="password"
                placeholder="Confirm Password"
              />
            </div>

            <button className="save-btn">
              Update Password
            </button>
          </div>

          {/* Theme */}

          <div className="settings-card">
            <h3>Theme Settings</h3>

            <label>
              Select Theme Color
            </label>

            <br />

            <input
              type="color"
              name="themeColor"
              value={settings.themeColor}
              onChange={handleChange}
            />
          </div>

          {/* Notifications */}

          <div className="settings-card">
            <h3>Preferences</h3>

            <label>
              <input
                type="checkbox"
                name="notifications"
                checked={
                  settings.notifications
                }
                onChange={handleChange}
              />
              Enable Notifications
            </label>

            <br />
            <br />

            <label>
              <input
                type="checkbox"
                name="darkMode"
                checked={
                  settings.darkMode
                }
                onChange={handleChange}
              />
              Enable Dark Mode
            </label>
          </div>

          {/* Backup */}

          {/* <div className="settings-card">
            <h3>Backup & Export</h3>

            <button className="save-btn">
              Export Products PDF
            </button>

            <button
  className="save-btn"
  style={{ marginLeft: "10px" }}
  onClick={createBackup}
>
  Create Backup
</button>
          </div> */}

          {/* Logs */}

          <div className="settings-card">
            <h3>Admin Activity Logs</h3>

            {logs.map((log, index) => (
              <div
                key={index}
                className="activity-item"
              >
                🔹 {log}
              </div>
            ))}
          </div>

          <button
            onClick={saveSettings}
            className="save-btn"
          >
            Save All Settings
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;