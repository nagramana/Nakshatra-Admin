import axios from "axios";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { uploadImage } from "../api/uploadApi";
import { useProducts } from "../context/ProductContext";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const API_URL =
  "https://nakshatra-mart-backend.onrender.com";

function Products() {
  // const [products, setProducts] = useState([
  //   {
  //     id: "1781790000001",
  //     name: "Apple",
  //     price: 120,
  //     stock: 50,
  //     category: "Fruits",
  //     image:
  //       "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=200",
  //   },
  //   {
  //     id: "1781790000002",
  //     name: "Milk",
  //     price: 60,
  //     stock: 5,
  //     category: "Dairy",
  //     image:
  //       "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=200",
  //   },
  // ]);

  const { products, setProducts } =
    useProducts();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/api/products`
    );

    setProducts(response.data);
  } catch (error) {
    console.log(
      "Error Fetching Products",
      error
    );
  }
};

  const [nextId, setNextId] =
    useState(() => Date.now());

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");



  const [discount, setDiscount] =
    useState("0% OFF");

  const [description, setDescription] =
    useState("");
  const [categories, setCategories] = useState([
    "Fruits",
    "Vegetables",
    "Dairy",
    "Groceries",
  ]);
  const [image, setImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [selectedProduct, setSelectedProduct] =
    useState(null);

  const activeProducts = products.filter(
    (product) => product.stock > 0
  ).length;

  const outOfStockProducts = products.filter(
    (product) => product.stock === 0
  ).length;

  // const highestPriceProduct =
  //   products.length > 0
  //     ? products.reduce((max, product) =>
  //       product.price > max.price
  //         ? product
  //         : max
  //     )
  //     : null;

  const exportCSV = () => {
    const headers = [
      "ID",
      "Name",
      "Category",
      "Price",
      "Stock",
    ];

    const rows = products.map((product) => [
      product.id,
      product.name,
      product.category,
      product.price,
      product.stock,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob(
      [csvContent],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const url =
      window.URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download = "products.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  const totalInventoryItems =
    products.reduce(
      (total, product) =>
        total + product.stock,
      0
    );

  const inStockCount = products.filter(
    (p) => p.stock >= 10
  ).length;

  const lowStockCount = products.filter(
    (p) => p.stock > 0 && p.stock < 10
  ).length;

  const outOfStockCount = products.filter(
    (p) => p.stock === 0
  ).length;

  const orders =
    JSON.parse(
      localStorage.getItem("orders")
    ) || [];

  const soldToday = orders.filter(
    (order) =>
      new Date(order.date).toDateString() ===
      new Date().toDateString()
  ).length;

  // Today's Date
  const today = new Date().toDateString();

  // Products Added Today
  const productsAddedToday = products.filter(
    (product) =>
      product.createdAt &&
      new Date(product.createdAt).toDateString() ===
      today
  ).length;

  // Total Remaining Stock
  const remainingStock = products.reduce(
    (total, product) =>
      total + Number(product.stock),
    0
  );

  const addProduct = async () => {
    try {
      if (
        !name ||
        !price ||
        !stock ||
        !category ||
        !selectedFile
      ) {
        setMessage(
          "⚠ Please fill all product details"
        );

        setMessageType("error");

        setTimeout(() => {
          setMessage("");
        }, 3000);

        return;
      }

      setLoading(true);

      const imageUrl =
        await uploadImage(
          selectedFile
        );

      const newProduct = {
        id: String(nextId),

        name,

        price: Number(price),

        stock: Number(stock),

        initialStock: Number(stock),

        category,

        image: imageUrl,

        discount,

        description,

        createdAt: new Date().toISOString(),
      };
      // setProducts([
      //   ...products,
      //   newProduct,
      // ]);

     await axios.post(
  `${API_URL}/api/products`,
  newProduct
);

      fetchProducts();

      setNextId(nextId + 1);

      setMessage(
        "✅ Product Added Successfully"
      );

      setMessageType("success");

      setTimeout(() => {
        setMessage("");
      }, 3000);

      setName("");
      setPrice("");
      setStock("");
      setCategory("");
      setImage("");
      setSelectedFile(null);



      setDiscount("0% OFF");

      setDescription("");
    } catch (error) {
      console.error(error);

      setMessage("❌ Upload Failed");

      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };


  const deleteProduct = async (id) => {
    try {
      await axios.delete(
        `${API_URL}/api/products/${id}`
      );
      fetchProducts();

      setMessage(
        "🗑 Product Deleted Successfully"
      );

      setMessageType("success");

    } catch (error) {
      console.error(error);

      setMessage(
        "❌ Delete Failed"
      );

      setMessageType("error");
    }
  };
  const editProduct = (product) => {
    setName(product.name);
    setPrice(product.price);
    setStock(product.stock);
    setCategory(product.category);
    setImage(product.image);

    setDiscount(
      product.discount || "0% OFF"
    );

    setDescription(
      product.description || ""
    );

    setEditId(product._id);

    setIsEditing(true);
  };

  const updateProduct = async () => {
    try {
      await axios.put(
        `${API_URL}/api/products/${editId}`,
        {
          name,
          price,
          stock,
          category,
          discount,
          description,
          image,
        }
      );

      fetchProducts();

      setMessage(
        "✅ Product Updated Successfully"
      );

      setMessageType("success");

      setTimeout(() => {
        setMessage("");
      }, 3000);

      setName("");
      setPrice("");
      setStock("");
      setCategory("");
      setImage("");
      setDescription("");

      setEditId(null);
      setIsEditing(false);

    } catch (error) {
      console.log(error);

      setMessage(
        "❌ Product Update Failed"
      );

      setMessageType("error");

      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };



  const downloadPDF = () => {
    const doc = new jsPDF();

    // Header
    doc.setFillColor(8, 42, 120);
    doc.rect(0, 0, 210, 25, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("Nakshatra Mart", 14, 15);

    doc.setFontSize(10);
    doc.text(
      `Generated: ${new Date().toLocaleDateString()}`,
      150,
      15
    );

    // Title
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(18);
    doc.text("Products Inventory Report", 14, 40);

    // Summary Cards
    doc.setFillColor(240, 240, 240);
    doc.roundedRect(14, 50, 55, 20, 3, 3, "F");
    doc.roundedRect(78, 50, 55, 20, 3, 3, "F");
    doc.roundedRect(142, 50, 55, 20, 3, 3, "F");

    doc.setFontSize(11);
    doc.text(
      `Products: ${products.length}`,
      20,
      62
    );

    doc.text(
      `Stock Units: ${totalInventoryItems}`,
      84,
      62
    );

    const inventoryValue = products.reduce(
      (total, item) =>
        total + item.price * item.stock,
      0
    );

    doc.text(
      `Value: Rs. ${inventoryValue}`,
      148,
      62
    );

    // Product Table
    autoTable(doc, {
      startY: 85,

      head: [
        [
          "ID",
          "Name",
          "Category",
          "Price",
          "Stock",
        ],
      ],

      body: products.map((product) => [
        product.id,
        product.name,
        product.category,
        `Rs. ${product.price}`,
        product.stock,
      ]),

      theme: "grid",

      headStyles: {
        fillColor: [8, 42, 120],
        textColor: [255, 255, 255],
        fontStyle: "bold",
        halign: "center",
      },

      bodyStyles: {
        halign: "center",
      },

      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
    });

    // Footer
    const pageHeight =
      doc.internal.pageSize.height;

    doc.setFontSize(10);
    doc.setTextColor(100);

    doc.text(
      "Generated by Nakshatra Mart Admin Panel",
      14,
      pageHeight - 10
    );

    doc.save("Nakshatra-Mart-Products-Report.pdf");
  };


  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-content">
        <Navbar />

        <div className="dashboard-wrapper">
          <h1 className="dashboard-title">
            Products Management
          </h1>

          {message && (
            <div
              style={{
                background:
                  messageType === "error"
                    ? "#ef4444"
                    : "#22c55e",
                color: "#fff",
                padding: "12px",
                borderRadius: "10px",
                marginBottom: "20px",
              }}
            >

              {message}
            </div>
          )}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(220px,1fr))",
              gap: "20px",
              marginBottom: "25px",
            }}
          >


            {/* Total Products */}
            <div className="card-box">
              <h4>Total Products</h4>
              <h2>{products.length}</h2>
            </div>
            <div className="card-box">
              <h4>Orders Today</h4>
              <h2>{soldToday}</h2>
            </div>

            <div className="card-box">
              <h4>Products Added Today</h4>
              <h2>{productsAddedToday}</h2>
            </div>

            <div className="card-box">
              <h4>Remaining Stock</h4>
              <h2>{remainingStock}</h2>
            </div>

            {/* Low Stock */}
            {/* <div className="card-box">
              <h4>Low Stock Items</h4>
              <h2>
                {
                  products.filter(
                    (p) => p.stock < 10
                  ).length
                }
              </h2>
            </div> */}

            {/* Categories */}
            <div className="card-box">
              <h4>Total Categories</h4>
              <h2>
                {
                  [...new Set(
                    products.map(
                      (p) => p.category
                    )
                  )].length
                }
              </h2>
            </div>

            {/* Inventory Value */}
            <div className="card-box">
              <h4>Inventory Value</h4>
              <h2>
                ₹
                {products.reduce(
                  (total, item) =>
                    total +
                    item.price *
                    item.stock,
                  0
                )}
              </h2>
            </div>

            <div className="card-box">
              <h4>Active Products</h4>
              <h2>{activeProducts}</h2>
            </div>

            <div className="card-box">
              <h4>Out Of Stock</h4>
              <h2>{outOfStockProducts}</h2>
            </div>

            <div className="card-box">
              <h4>In Stock</h4>
              <h2>{inStockCount}</h2>
            </div>

            <div className="card-box">
              <h4>Low Stock</h4>
              <h2>{lowStockCount}</h2>
            </div>

            <div className="card-box">
              <h4>Total Stock Units</h4>
              <h2>{totalInventoryItems}</h2>
            </div>

            {/* <div className="card-box">
              <h4>Highest Price Product</h4>

              <h5>
                {highestPriceProduct?.name ||
                  "N/A"}
              </h5>

              <p>
                ₹
                {highestPriceProduct?.price ||
                  0}
              </p>
            </div> */}
          </div>


          <div className="product-table-card">

            <h2>Add Product</h2>

            <div
              style={{
                background: "#fff",
                padding: "25px",
                borderRadius: "16px",
                boxShadow:
                  "0 4px 20px rgba(0,0,0,0.08)",
                marginBottom: "25px",
              }}
            >

              {/* First Row */}

              <div
                style={{
                  display: "flex",
                  gap: "15px",
                  alignItems: "center",
                  marginBottom: "20px",
                  flexWrap: "wrap",
                }}
              >
                <input
                  type="text"
                  placeholder="🔍 Search Product"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  style={{
                    width: "300px",
                  }}
                />




                <button
                  type="button"
                  onClick={() => {
                    const categoryName = prompt(
                      "Enter Category Name"
                    );

                    if (
                      categoryName &&
                      !categories.includes(categoryName)
                    ) {
                      setCategories([
                        ...categories,
                        categoryName,
                      ]);

                      setMessage(
                        "✅ Category Added"
                      );

                      setMessageType("success");
                    }
                  }}
                  style={{
                    background: "#22c55e",
                    color: "#fff",
                    border: "none",
                    padding: "10px 15px",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  + Category
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (!category) {
                      alert(
                        "Select category first"
                      );
                      return;
                    }

                    setCategories(
                      categories.filter(
                        (cat) =>
                          cat !== category
                      )
                    );

                    setCategory("");

                    setMessage(
                      "🗑 Category Deleted"
                    );

                    setMessageType("error");
                  }}
                  style={{
                    background: "#ef4444",
                    color: "#fff",
                    border: "none",
                    padding: "10px 15px",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  🗑 Delete
                </button>

                <button
                  onClick={downloadPDF}
                  style={{
                    background: "#ef4444",
                    color: "#fff",
                    border: "none",
                    padding: "10px 15px",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  📄 Download PDF
                </button>
              </div>

              {/* Second Row */}

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "2fr 1fr 1fr 1fr 2fr 2fr",
                  gap: "15px",
                  alignItems: "center",
                }}
              >
                <input
                  type="text"
                  placeholder="Product Name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                />

                <input
                  type="number"
                  placeholder="Price"
                  value={price}
                  onChange={(e) =>
                    setPrice(e.target.value)
                  }
                />

                <input
                  type="number"
                  placeholder="Stock"
                  value={stock}
                  onChange={(e) =>
                    setStock(e.target.value)
                  }
                />

                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value)
                  }
                >
                  <option value="">
                    Category
                  </option>

                  {categories.map((cat) => (
                    <option
                      key={cat}
                      value={cat}
                    >
                      {cat}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                />

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];

                    if (file) {
                      setSelectedFile(file);

                      const previewUrl =
                        URL.createObjectURL(file);

                      setImage(previewUrl);
                    }
                  }}
                />
              </div>

              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                {isEditing ? (
                  <button
                    onClick={updateProduct}
                    style={{
                      background: "#22c55e",
                      color: "#fff",
                      border: "none",
                      padding: "12px 25px",
                      borderRadius: "10px",
                      cursor: "pointer",
                      fontWeight: "600",
                    }}
                  >
                    Save Product
                  </button>
                ) : (
                  <button
                    onClick={addProduct}
                    disabled={loading}
                    style={{
                      background: "#082A78",
                      color: "#fff",
                      border: "none",
                      padding: "12px 25px",
                      borderRadius: "10px",
                      cursor: "pointer",
                      fontWeight: "600",
                    }}
                  >
                    {loading
                      ? "Uploading..."
                      : "Add Product"}
                  </button>
                )}
              </div>
            </div>
            {/* {loading
                    ? "Uploading..."
                    : "Add Product"}
                </button>
              )} */}
          </div>

          {image && (
            <div
              style={{
                marginBottom: "20px",
              }}
            >
              <p>Image Preview</p>

              <img
                src={image}
                alt="Preview"
                width="120"
                height="120"
                style={{
                  borderRadius: "10px",
                  objectFit: "cover",
                }}
              />
            </div>
          )}

          <table className="order-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {products
                .filter((product) => {
                  const searchText =
                    search.toLowerCase();

                  return (
                    product.id
                      .toString()
                      .includes(searchText) ||
                    product.name
                      .toLowerCase()
                      .includes(searchText) ||
                    product.category
                      .toLowerCase()
                      .includes(searchText) ||
                    product.price
                      .toString()
                      .includes(searchText)
                  );
                })
                .map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>

                    <td>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="product-img"
                      />
                    </td>

                    <td>{product.name}</td>

                    <td>
                      {product.category}
                    </td>

                    <td>
                      ₹{product.price}
                    </td>

                    <td>
                      {product.stock === 0 ? (
                        <span
                          style={{
                            background: "#ef4444",
                            color: "#fff",
                            padding: "5px 10px",
                            borderRadius: "20px",
                          }}
                        >
                          Out Of Stock
                        </span>
                      ) : product.stock < 10 ? (
                        <span
                          style={{
                            background: "#f59e0b",
                            color: "#fff",
                            padding: "5px 10px",
                            borderRadius: "20px",
                          }}
                        >
                          Low Stock ({product.stock})
                        </span>
                      ) : (
                        <span
                          style={{
                            background: "#22c55e",
                            color: "#fff",
                            padding: "5px 10px",
                            borderRadius: "20px",
                          }}
                        >
                          In Stock ({product.stock})
                        </span>
                      )}
                    </td>

                    <td>
                      <td>
  <div
    style={{
      display: "flex",
      gap: "8px",
      alignItems: "center",
    }}
  >
                          <button
                            className="view-btn"
                            onClick={() =>
                              setSelectedProduct(product)
                            }
                          >
                            👁 View
                          </button>

                          <button
                            className="edit-btn"
                            onClick={() =>
                              editProduct(product)
                            }
                          >
                            ✏ Edit
                          </button>

                          <button
                            className="delete-btn"
                            onClick={() =>
                              deleteProduct(product._id)
                            }
                          >
                            🗑 Delete
                          </button>
                        </div>
                      </td>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {selectedProduct && (
            <div className="modal-overlay">

              <div className="product-modal">

                <h2>
                  Product Details
                </h2>

                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  style={{
                    width: "180px",
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "12px",
                    marginBottom: "20px",
                  }}
                />

                <p>
                  <strong>ID:</strong>{" "}
                  {selectedProduct.id}
                </p>

                <p>
                  <strong>Name:</strong>{" "}
                  {selectedProduct.name}
                </p>

                <p>
                  <strong>Category:</strong>{" "}
                  {selectedProduct.category}
                </p>

                <p>
                  <strong>Price:</strong> ₹
                  {selectedProduct.price}
                </p>

                <p>
                  <strong>Stock:</strong>{" "}
                  {selectedProduct.stock}
                </p>

                <p>
                  <strong>Description:</strong>{" "}
                  {selectedProduct.description ||
                    "No Description"}
                </p>

                <p>
                  <strong>Created Date:</strong>{" "}
                  {selectedProduct.createdAt
                    ? new Date(
                      selectedProduct.createdAt
                    ).toLocaleString()
                    : "N/A"}
                </p>

                <button
                  className="close-btn"
                  onClick={() =>
                    setSelectedProduct(null)
                  }
                >
                  Close
                </button>

              </div>

            </div>
          )}
        </div>
      </div>
    </div>

  );
}

export default Products;