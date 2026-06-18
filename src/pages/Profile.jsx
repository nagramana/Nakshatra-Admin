import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Profile() {
  const [profile, setProfile] = useState({
    image:
      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    id: "ADM001",
    name: "Venkata Ramana",
    age: "25",
    email: "admin@nakshatra.com",
    phone: "+91 9876543210",
    address: "Vijayawada, Andhra Pradesh",
    role: "Administrator",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = () => {
    localStorage.setItem(
      "adminProfile",
      JSON.stringify(profile)
    );

    alert("Profile Updated Successfully");
    setIsEditing(false);
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
              fontWeight: "700",
            }}
          >
            My Profile
          </h1>

          <div
            style={{
              background: "#fff",
              borderRadius: "25px",
              overflow: "hidden",
              boxShadow:
                "0 10px 30px rgba(0,0,0,0.08)",
            }}
          >
            {/* Header */}

            <div
              style={{
                background:
                  "linear-gradient(135deg,#082A78,#1E40AF)",
                height: "220px",
                position: "relative",
              }}
            >
              <img
                src={profile.image}
                alt="Profile"
                style={{
                  width: "160px",
                  height: "160px",
                  borderRadius: "50%",
                  border: "6px solid white",
                  position: "absolute",
                  bottom: "-80px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  objectFit: "cover",
                }}
              />
            </div>

            {/* Body */}

            <div
              style={{
                padding: "110px 35px 35px",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  marginBottom: "35px",
                }}
              >
                <h2>{profile.name}</h2>

                <span
                  style={{
                    background: "#082A78",
                    color: "#fff",
                    padding: "8px 18px",
                    borderRadius: "20px",
                    fontSize: "14px",
                  }}
                >
                  {profile.role}
                </span>
              </div>

              {!isEditing ? (
                <>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit,minmax(250px,1fr))",
                      gap: "20px",
                    }}
                  >
                    <div className="profile-card">
                      <h4>Admin ID</h4>
                      <p>{profile.id}</p>
                    </div>

                    <div className="profile-card">
                      <h4>Age</h4>
                      <p>{profile.age}</p>
                    </div>

                    <div className="profile-card">
                      <h4>Email</h4>
                      <p>{profile.email}</p>
                    </div>

                    <div className="profile-card">
                      <h4>Phone</h4>
                      <p>{profile.phone}</p>
                    </div>

                    <div className="profile-card">
                      <h4>Address</h4>
                      <p>{profile.address}</p>
                    </div>

                    <div className="profile-card">
                      <h4>Status</h4>
                      <p>🟢 Active</p>
                    </div>
                  </div>

                  <div
                    style={{
                      textAlign: "center",
                      marginTop: "30px",
                    }}
                  >
                    <button
                      onClick={() =>
                        setIsEditing(true)
                      }
                      style={{
                        background: "#082A78",
                        color: "#fff",
                        border: "none",
                        padding:
                          "14px 30px",
                        borderRadius: "12px",
                        cursor: "pointer",
                        fontWeight: "600",
                      }}
                    >
                      Edit Profile
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "1fr 1fr",
                      gap: "20px",
                    }}
                  >
                    <input
                      name="name"
                      value={profile.name}
                      onChange={handleChange}
                      placeholder="Name"
                    />

                    <input
                      name="age"
                      value={profile.age}
                      onChange={handleChange}
                      placeholder="Age"
                    />

                    <input
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                      placeholder="Email"
                    />

                    <input
                      name="phone"
                      value={profile.phone}
                      onChange={handleChange}
                      placeholder="Phone"
                    />

                    <textarea
                      name="address"
                      value={profile.address}
                      onChange={handleChange}
                      placeholder="Address"
                      style={{
                        gridColumn:
                          "1 / span 2",
                        minHeight: "100px",
                      }}
                    />
                  </div>

                  <div
                    style={{
                      marginTop: "25px",
                      display: "flex",
                      gap: "15px",
                    }}
                  >
                    <button
                      onClick={saveProfile}
                      style={{
                        background: "#22c55e",
                        color: "#fff",
                        border: "none",
                        padding:
                          "12px 25px",
                        borderRadius: "10px",
                        cursor: "pointer",
                      }}
                    >
                      Save Changes
                    </button>

                    <button
                      onClick={() =>
                        setIsEditing(false)
                      }
                      style={{
                        background: "#ef4444",
                        color: "#fff",
                        border: "none",
                        padding:
                          "12px 25px",
                        borderRadius: "10px",
                        cursor: "pointer",
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;