import { useState, useEffect } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import { uploadImage } from "../api/uploadApi";

const API_URL =
  "https://nakshatra-mart-backend.onrender.com";

function Ads() {

  const [ads, setAds] =
    useState([]);

  const [title, setTitle] =
    useState("");

  const [description,
    setDescription] =
    useState("");

  const [buttonText,
    setButtonText] =
    useState("Shop Now");

  const [link, setLink] =
    useState("");

  const [selectedFile,
    setSelectedFile] =
    useState(null);

  const [loading,
    setLoading] =
    useState(false);

  const [message,
    setMessage] =
    useState("");

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {

    try {

      const response =
        await axios.get(
          `${API_URL}/api/ads`
        );

      setAds(
        response.data
      );

    } catch (error) {

      console.log(error);

    }

  };

  const addAd = async () => {

    try {

      if (
        !title ||
        !selectedFile
      ) {
        setMessage(
          "⚠ Title and Banner Required"
        );

        return;
      }

      setLoading(true);

      const imageUrl =
        await uploadImage(
          selectedFile
        );

      await axios.post(
        `${API_URL}/api/ads`,
        {
          title,
          description,

          image: imageUrl,

          buttonText,
          link,
        }
      );

      setMessage(
        "✅ Banner Added Successfully"
      );

      fetchAds();

      setTitle("");
      setDescription("");

      setButtonText(
        "Shop Now"
      );

      setLink("");

      setSelectedFile(
        null
      );

      setTimeout(() => {
        setMessage("");
      }, 3000);

    } catch (error) {

      console.log(error);

      setMessage(
        "❌ Upload Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  const deleteAd =
    async (id) => {

      try {

        await axios.delete(
          `${API_URL}/api/ads/${id}`
        );

        fetchAds();

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="dashboard-layout">

      <Sidebar />

      <div className="dashboard-content">

        <Navbar />

        <div
          style={{
            padding: "25px",
          }}
        >

          <h1
            style={{
              marginBottom:
                "25px",
            }}
          >
            📢 Ads Management
          </h1>

          {message && (

            <div
              style={{
                background:
                  "#22c55e",
                color: "#fff",
                padding:
                  "12px",
                borderRadius:
                  "10px",
                marginBottom:
                  "20px",
              }}
            >
              {message}
            </div>

          )}

          {/* ADD BANNER */}

          <div
            style={{
              background:
                "#fff",
              padding:
                "25px",
              borderRadius:
                "15px",
              boxShadow:
                "0 2px 10px rgba(0,0,0,.08)",
              marginBottom:
                "25px",
            }}
          >

            <h2
              style={{
                marginBottom:
                  "20px",
              }}
            >
              Add New Banner
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "1fr 1fr",
                gap: "15px",
              }}
            >

              <input
                type="text"
                placeholder="Banner Title"
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }
              />

              <input
                type="text"
                placeholder="Button Text"
                value={buttonText}
                onChange={(e) =>
                  setButtonText(
                    e.target.value
                  )
                }
              />

              <input
                type="text"
                placeholder="Offer Link"
                value={link}
                onChange={(e) =>
                  setLink(
                    e.target.value
                  )
                }
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setSelectedFile(
                    e.target.files[0]
                  )
                }
              />

            </div>

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              style={{
                width: "100%",
                marginTop:
                  "15px",
                minHeight:
                  "120px",
                padding:
                  "12px",
              }}
            />

            {selectedFile && (

              <div
                style={{
                  marginTop:
                    "20px",
                }}
              >

                <p>
                  Banner Preview
                </p>

                <img
                  src={URL.createObjectURL(
                    selectedFile
                  )}
                  alt=""
                  style={{
                    width: "350px",
                    height: "180px",
                    objectFit:
                      "cover",
                    borderRadius:
                      "12px",
                    border:
                      "1px solid #ddd",
                  }}
                />

              </div>

            )}

            <button
              onClick={addAd}
              disabled={loading}
              style={{
                marginTop:
                  "20px",
                background:
                  "#082A78",
                color:
                  "#fff",
                border:
                  "none",
                padding:
                  "14px 25px",
                borderRadius:
                  "12px",
                cursor:
                  "pointer",
                fontWeight:
                  "600",
              }}
            >
              {loading
                ? "Uploading..."
                : "Add Banner"}
            </button>

          </div>

          {/* EXISTING ADS */}

          <div
            style={{
              background:
                "#fff",
              padding:
                "25px",
              borderRadius:
                "15px",
              boxShadow:
                "0 2px 10px rgba(0,0,0,.08)",
            }}
          >

            <h2>
              Existing Ads
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill,minmax(350px,1fr))",
                gap: "20px",
                marginTop:
                  "20px",
              }}
            >

              {ads.map(
                (ad) => (

                  <div
                    key={ad._id}
                    style={{
                      border:
                        "1px solid #eee",
                      borderRadius:
                        "15px",
                      overflow:
                        "hidden",
                    }}
                  >

                    <img
                      src={
                        ad.image
                      }
                      alt={
                        ad.title
                      }
                      style={{
                        width:
                          "100%",
                        height:
                          "180px",
                        objectFit:
                          "cover",
                      }}
                    />

                    <div
                      style={{
                        padding:
                          "15px",
                      }}
                    >

                      <h3>
                        {ad.title}
                      </h3>

                      <p>
                        {
                          ad.description
                        }
                      </p>

                      <button
                        onClick={() =>
                          deleteAd(
                            ad._id
                          )
                        }
                        style={{
                          background:
                            "#ef4444",
                          color:
                            "#fff",
                          border:
                            "none",
                          padding:
                            "10px 15px",
                          borderRadius:
                            "8px",
                          cursor:
                            "pointer",
                        }}
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                )
              )}

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Ads;