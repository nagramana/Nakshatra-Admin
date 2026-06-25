import axios from "axios";
import "../styles/Products.css";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { uploadImage } from "../api/uploadApi";
import { useProducts } from "../context/ProductContext";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Cropper from "react-easy-crop";
import getCroppedImg from "../utils/cropImage";

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
    fetchCategories();

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

  const fetchCategories = async () => {
    try {

      const response =
        await axios.get(
          `${API_URL}/api/categories`
        );

      setCategories(
        response.data
      );

    } catch (error) {

      console.log(
        "Category Fetch Error",
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

  const [gender, setGender] = useState("");

  const [color, setColor] =
    useState("");

  const [fabric, setFabric] =
    useState("");

  const [size, setSize] =
    useState("");

  const [rating, setRating] =
    useState("4.3");

  const [occasion, setOccasion] =
    useState("");

  const [material, setMaterial] =
    useState("");

  const [combo, setCombo] =
    useState("");

  const [fitShape, setFitShape] =
    useState("");
  const [discount, setDiscount] = useState("");

  const [showInFlashSale,
    setShowInFlashSale] =
    useState(false);

  const [showInTrending,
    setShowInTrending] =
    useState(false);

  const [showOnHomePage,
    setShowOnHomePage] =
    useState(true);

  const [featured,
    setFeatured] =
    useState(false);

  const [bestSeller,
    setBestSeller] =
    useState(false);

  const [newArrival,
    setNewArrival] =
    useState(true);

  const [displayOrder,
    setDisplayOrder] =
    useState(0);

  const [bottomLength,
    setBottomLength] =
    useState("");



  const [description, setDescription] =
    useState("");
  const [categories, setCategories] =
    useState([]);
  const [image, setImage] = useState("");
  const [images, setImages] =
    useState([]);
  const [selectedFiles, setSelectedFiles] =
    useState([]);
  const [loading, setLoading] = useState(false);
  const [cropImage, setCropImage] =
    useState(null);

  const [crop, setCrop] =
    useState({ x: 0, y: 0 });

  const [zoom, setZoom] =
    useState(1);

  const [croppedAreaPixels,
    setCroppedAreaPixels] =
    useState(null);

  const [showCropper,
    setShowCropper] =
    useState(false);

    const [currentImageIndex,
  setCurrentImageIndex] =
  useState(0);

  const [search, setSearch] = useState("");

  const [currentPage,
    setCurrentPage] =
    useState(1);

  const productsPerPage = 10;
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

  const validateImageDimensions =
    (file) => {

      return new Promise(
        (resolve) => {

          const img =
            new Image();

          img.onload = () => {

            if (
              img.width >= 800 &&
              img.height >= 800
            ) {

              resolve(true);

            } else {

              resolve(false);

            }

          };

          img.src =
            URL.createObjectURL(file);

        }
      );

    };

  const addProduct = async () => {
    try {
      if (
        !name ||
        !price ||
        !stock ||
        !category ||
        selectedFiles.length === 0
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

      // Validate image dimensions

      // for (
      //   const file
      //   of selectedFiles
      // ) {

      //   const valid =
      //     await validateImageDimensions(
      //       file
      //     );

      //   if (!valid) {

      //     alert(
      //       "Image must be at least 800 x 800 px"
      //     );

      //     setLoading(false);

      //     return;
      //   }

      // }

      const imageUrls = [];

      for (const file of selectedFiles) {

        const url =
          await uploadImage(file);

        imageUrls.push(url);
      }

      const newProduct = {

        id: String(nextId),

        name,
        price: Number(price),
        stock: Number(stock),

        category,
        gender,

        color,
        fabric,
        size,

        rating,
        occasion,
        material,
        combo,

        fitShape,
        bottomLength,

        showInFlashSale,
        showInTrending,
        showOnHomePage,
        featured,
        bestSeller,
        newArrival,
        displayOrder,

        image: imageUrls[0],
        images: imageUrls,

        discount: Number(discount),

        description,

        createdAt:
          new Date().toISOString(),
      };

      console.log("NEW PRODUCT DATA");
      console.log(newProduct);
      // setProducts([
      //   ...products,
      //   newProduct,
      // ]);

      console.log(
        "Images Array:",
        imageUrls
      );

      console.log(
        "Product Data:",
        newProduct
      );

      console.log(
  "FINAL PRODUCT DATA"
);

console.log(
  JSON.stringify(
    newProduct,
    null,
    2
  )
);
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
      setGender("");
      setImage("");
      setColor("");
      setFabric("");
      setSize("");

      setRating("4.3");
      setOccasion("");
      setMaterial("");
      setCombo("");
      setFitShape("");
      setBottomLength("");
      setSelectedFiles([]);
      setImages([]);



      setDiscount("");

      setDescription("");
    } catch (error) {
      console.error(error);

      setMessage("❌ Upload Failed");

      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const toggleControl = async (
    id,
    field
  ) => {
    try {

      const product =
        products.find(
          (p) => p._id === id
        );

      await axios.put(
        `${API_URL}/api/products/${id}`,
        {
          [field]:
            !product[field]
        }
      );

      fetchProducts();

    } catch (error) {

      console.log(
        "Toggle Error",
        error
      );

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
    setGender(product.gender || "");
    setColor(product.color || "");

    setFabric(product.fabric || "");

    setSize(product.size || "");

    setRating(product.rating || "4.3");

    setOccasion(product.occasion || "");

    setMaterial(product.material || "");

    setCombo(product.combo || "");

    setFitShape(product.fitShape || "");

    setBottomLength(
      product.bottomLength || ""
    );
    setImage(product.image);

    setImages(
      product.images || []
    );

    setSelectedFiles([]);

    setDiscount(
      product.discount || 0
    );


    setShowInFlashSale(
      product.showInFlashSale || false
    );

    setShowInTrending(
      product.showInTrending || false
    );

    setShowOnHomePage(
      product.showOnHomePage ?? true
    );

    setFeatured(
      product.featured || false
    );

    setBestSeller(
      product.bestSeller || false
    );

    setNewArrival(
      product.newArrival ?? true
    );

    setDisplayOrder(
      product.displayOrder || 0
    );
    setDescription(
      product.description || ""
    );

    setEditId(product._id);

    setIsEditing(true);
  };

  const updateProduct = async () => {

    try {

      let imageUrls = images;

      if (selectedFiles.length > 0) {

        imageUrls = [];

        for (const file of selectedFiles) {

          const url = await uploadImage(file);

          console.log(
            "Cloudinary URL:",
            url
          );

          imageUrls.push(url);

        }
      }

      await axios.put(
        `${API_URL}/api/products/${editId}`,
        {
          name,
          price: Number(price),
          stock: Number(stock),

          category,
          gender,

          color,
          fabric,
          size,

          rating,
          occasion,
          material,
          combo,

          fitShape,
          bottomLength,

          showInFlashSale,
          showInTrending,
          showOnHomePage,
          featured,
          bestSeller,
          newArrival,
          displayOrder,

          image: imageUrls[0],
          images: imageUrls,

          discount: Number(discount),

          description,
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

      setGender("");
      setColor("");
      setFabric("");
      setSize("");

      setRating("4.3");

      setOccasion("");
      setMaterial("");
      setCombo("");

      setFitShape("");
      setBottomLength("");

      setDescription("");

      setImage("");
      setImages([]);

      setSelectedFiles([]);

      setEditId(null);

      setIsEditing(false);

    } catch (error) {

      console.log(error);

      setMessage(
        "❌ Product Update Failed"
      );

      setMessageType("error");
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


  const filteredProducts =
    products.filter((product) => {

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

    });

  const indexOfLast =
    currentPage *
    productsPerPage;

  const indexOfFirst =
    indexOfLast -
    productsPerPage;

  const currentProducts =
    filteredProducts.slice(
      indexOfFirst,
      indexOfLast
    );

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        filteredProducts.length /
        productsPerPage
      )
    );

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

          <div className="stats-grid">


            {/* Total Products */}
            <div className="card-box">
              <h4>Total Products</h4>
              <h2>{products.length}</h2>
            </div>

            <div className="card-box">
              <h4>Products Added Today</h4>
              <h2>{productsAddedToday}</h2>
            </div>

            {/* <div className="card-box">
  <h4>Total Categories</h4>
  <h2>{categories.length}</h2>
</div> */}



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
                  categories.length
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
              <h4>Remaining Stock</h4>
              <h2>{remainingStock}</h2>
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


          <div
            className="product-table-card"
            style={{
              overflow: "visible",
              maxHeight: "none",
            }}
          >

            <h2>Add Product</h2>

            <div className="product-form">

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
                  onChange={(e) => {

                    setSearch(
                      e.target.value
                    );

                    setCurrentPage(1);

                  }}
                />





                {/* <button
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
                </button> */}

                <button
                  type="button"
                  onClick={async () => {

                    const categoryName =
                      prompt(
                        "Enter Category Name"
                      );

                    if (!categoryName) return;

                    try {

                      await axios.post(
                        `${API_URL}/api/categories`,
                        {
                          name: categoryName
                        }
                      );

                      fetchCategories();

                      setCategory(
                        categoryName
                      );

                      setMessage(
                        "✅ Category Added"
                      );

                      setMessageType(
                        "success"
                      );

                    } catch (error) {

                      setMessage(
                        "❌ Category Exists"
                      );

                      setMessageType(
                        "error"
                      );

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
                  onClick={async () => {

                    const selectedCategory =
                      categories.find(
                        (cat) =>
                          cat.name === category
                      );

                    if (!selectedCategory) {
                      alert(
                        "Select category first"
                      );
                      return;
                    }

                    try {

                      await axios.delete(
                        `${API_URL}/api/categories/${selectedCategory._id}`
                      );

                      fetchCategories();

                      setCategory("");

                      setMessage(
                        "🗑 Category Deleted"
                      );

                      setMessageType(
                        "success"
                      );

                    } catch (error) {

                      console.log(error);

                    }

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
                    "repeat(7, 1fr)",
                  gap: "15px",
                  marginBottom: "15px",
                }}

              >

                <select
                  value={size}
                  onChange={(e) =>
                    setSize(e.target.value)
                  }
                >
                  <option value="">
                    Size
                  </option>

                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                </select>

                <select
                  value={rating}
                  onChange={(e) =>
                    setRating(e.target.value)
                  }
                >
                  <option value="4.3">
                    Rating 4.3
                  </option>

                  <option value="4.0">
                    Rating 4.0
                  </option>

                  <option value="3.5">
                    Rating 3.5
                  </option>
                </select>

                <select
                  value={occasion}
                  onChange={(e) =>
                    setOccasion(e.target.value)
                  }
                >
                  <option value="">
                    Occasion
                  </option>

                  <option value="Casual">
                    Casual
                  </option>

                  <option value="Party">
                    Party
                  </option>

                  <option value="Wedding">
                    Wedding
                  </option>
                </select>

                <select
                  value={material}
                  onChange={(e) =>
                    setMaterial(e.target.value)
                  }
                >
                  <option value="">
                    Material
                  </option>

                  <option value="Cotton">
                    Cotton
                  </option>

                  <option value="Polyester">
                    Polyester
                  </option>

                  <option value="Silk">
                    Silk
                  </option>
                </select>

                <select
                  value={combo}
                  onChange={(e) =>
                    setCombo(e.target.value)
                  }
                >
                  <option value="">
                    Combo
                  </option>

                  <option value="Single">
                    Single
                  </option>

                  <option value="Pack of 2">
                    Pack of 2
                  </option>

                  <option value="Pack of 3">
                    Pack of 3
                  </option>
                </select>

                <select
                  value={fitShape}
                  onChange={(e) =>
                    setFitShape(e.target.value)
                  }
                >
                  <option value="">
                    Fit Shape
                  </option>

                  <option value="Regular">
                    Regular
                  </option>

                  <option value="Slim">
                    Slim
                  </option>

                  <option value="Loose">
                    Loose
                  </option>
                </select>

                <select
                  value={bottomLength}
                  onChange={(e) =>
                    setBottomLength(
                      e.target.value
                    )
                  }
                >
                  <option value="">
                    Bottom Length
                  </option>

                  <option value="Short">
                    Short
                  </option>

                  <option value="Medium">
                    Medium
                  </option>

                  <option value="Long">
                    Long
                  </option>
                </select>

              </div>


              {/* <div className="form-row row1">

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
                  <option value="">Category</option>

                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>

              </div> */}

              {/* Row 3 */}

              {/* Product Basic Details */}

              <div className="form-row row1">

                <input
                  type="text"
                  placeholder="Product Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <input
                  type="number"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />

                <input
                  type="number"
                  placeholder="Stock"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Category</option>

                  {categories.map((cat) => (

                    <option
                      key={cat._id}
                      value={cat.name}
                    >
                      {cat.name}
                    </option>

                  ))}
                </select>

              </div>


              {/* Product Extra Details */}

              <div className="form-row row2">

                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Gender</option>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Boys">Boys</option>
                  <option value="Girls">Girls</option>
                </select>

                <select
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                >
                  <option value="">Color</option>
                  <option value="Black">Black</option>
                  <option value="White">White</option>
                  <option value="Blue">Blue</option>
                  <option value="Red">Red</option>
                </select>

                <select
                  value={fabric}
                  onChange={(e) => setFabric(e.target.value)}
                >
                  <option value="">Fabric</option>
                  <option value="Cotton">Cotton</option>
                  <option value="Silk">Silk</option>
                  <option value="Linen">Linen</option>
                </select>

                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                >
                  <option value="">Size</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                </select>

              </div>


              {/* Description + Image */}

              <div className="form-row row3">

                <input
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                />

                <div>

                  <input
  type="file"
  multiple
  accept="image/*"
  onChange={(e) => {

    const files =
      [...e.target.files];

    if (files.length === 0)
      return;

    setSelectedFiles(files);

    setCurrentImageIndex(0);

    const firstImage =
      URL.createObjectURL(
        files[0]
      );

    setCropImage(
      firstImage
    );

    setShowCropper(true);

  }}
/>

                  <p
                    style={{
                      fontSize: "12px",
                      color: "#666",
                      marginTop: "5px"
                    }}
                  >
                    Max 5 Images • JPG/PNG •
                    Max 2MB Each
                  </p>

                </div>

                <input
                  type="number"
                  placeholder="Enter Discount %"
                  value={discount}
                  onChange={(e) =>
                    setDiscount(e.target.value)
                  }
                />

              </div>

              {/* Row 2 */}

              {/* <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(7,1fr)",
                  gap: "15px",
                  marginBottom: "15px",
                }}
              > */}

              {/* <select
                  value={size}
                  onChange={(e) =>
                    setSize(e.target.value)
                  }
                >
                  <option value="">
                    Size
                  </option>

                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                </select>

                <select
                  value={rating}
                  onChange={(e) =>
                    setRating(e.target.value)
                  }
                >
                  <option value="4.3">
                    Rating 4.3
                  </option>

                  <option value="4.0">
                    Rating 4.0
                  </option>

                  <option value="3.5">
                    Rating 3.5
                  </option>
                </select>

                <select
                  value={occasion}
                  onChange={(e) =>
                    setOccasion(e.target.value)
                  }
                >
                  <option value="">
                    Occasion
                  </option>

                  <option value="Casual">
                    Casual
                  </option>

                  <option value="Party">
                    Party
                  </option>

                  <option value="Wedding">
                    Wedding
                  </option>
                </select>

                <select
                  value={material}
                  onChange={(e) =>
                    setMaterial(e.target.value)
                  }
                >
                  <option value="">
                    Material
                  </option>

                  <option value="Cotton">
                    Cotton
                  </option>

                  <option value="Polyester">
                    Polyester
                  </option>

                  <option value="Silk">
                    Silk
                  </option>
                </select>

                <select
                  value={combo}
                  onChange={(e) =>
                    setCombo(e.target.value)
                  }
                >
                  <option value="">
                    Combo
                  </option>

                  <option value="Single">
                    Single
                  </option>

                  <option value="Pack of 2">
                    Pack of 2
                  </option>

                  <option value="Pack of 3">
                    Pack of 3
                  </option>
                </select>

                <select
                  value={fitShape}
                  onChange={(e) =>
                    setFitShape(e.target.value)
                  }
                >
                  <option value="">
                    Fit Shape
                  </option>

                  <option value="Regular">
                    Regular
                  </option>

                  <option value="Slim">
                    Slim
                  </option>

                  <option value="Loose">
                    Loose
                  </option>
                </select>

                <select
                  value={bottomLength}
                  onChange={(e) =>
                    setBottomLength(
                      e.target.value
                    )
                  }
                >
                  <option value="">
                    Bottom Length
                  </option>

                  <option value="Short">
                    Short
                  </option>

                  <option value="Medium">
                    Medium
                  </option>

                  <option value="Long">
                    Long
                  </option>
                </select> */}


              {/* </div> */}

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(3,1fr)",
                  gap: "15px",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              >

                <label>
  <input
    type="checkbox"
    checked={showInFlashSale}
    onChange={(e) => {
      console.log(
        "FLASH",
        e.target.checked
      );

      setShowInFlashSale(
        e.target.checked
      );
    }}
  />
  Flash Sale
</label>

                <label>
  <input
    type="checkbox"
    checked={showInTrending}
    onChange={(e) => {

      console.log(
        "TRENDING",
        e.target.checked
      );

      setShowInTrending(
        e.target.checked
      );

    }}
  />
  Trending Products
</label>

                <label>
                  <input
                    type="checkbox"
                    checked={showOnHomePage}
                    onChange={(e) =>
                      setShowOnHomePage(
                        e.target.checked
                      )
                    }
                  />
                  Home Page
                </label>

                <label>
  <input
    type="checkbox"
    checked={featured}
    onChange={(e) => {

      console.log(
        "FEATURED",
        e.target.checked
      );

      setFeatured(
        e.target.checked
      );

    }}
  />
  Featured
</label>

                <label>
                  <input
                    type="checkbox"
                    checked={bestSeller}
                    onChange={(e) =>
                      setBestSeller(
                        e.target.checked
                      )
                    }
                  />
                  Best Seller
                </label>

                <label>
                  <input
                    type="checkbox"
                    checked={newArrival}
                    onChange={(e) =>
                      setNewArrival(
                        e.target.checked
                      )
                    }
                  />
                  New Arrival
                </label>

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

          {selectedFiles.length > 0 && (

            <div
              style={{
                marginBottom: "20px",
              }}
            >

              <p>Selected Images Preview</p>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >

                {selectedFiles.map(
                  (file, index) => (

                    <img
                      key={index}
                      src={URL.createObjectURL(file)}
                      alt="preview"
                      width="100"
                      height="100"
                      style={{
                        objectFit: "cover",
                        borderRadius: "10px",
                        border: "1px solid #ddd",
                      }}
                    />

                  )
                )}

              </div>

            </div>

          )}

          <div
            className="table-scroll"
            style={{
              maxHeight: "650px",
              overflowY: "auto",
              overflowX: "auto"
            }}
          >
            <table className="order-table">

              <thead>
                <tr>
                  <th>ID</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Gender</th>
                  <th>Color</th>
                  <th>Fabric</th>
                  <th>Size</th>
                  <th>Price</th>
                  <th>Discount</th>
                  <th>Stock</th>

                  <th>Home</th>
                  <th>Flash</th>
                  <th>Trending</th>
                  <th>Featured</th>
                  <th>New</th>

                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {currentProducts.map((product) => (

                  <tr
                    key={
                      product._id ||
                      product.id
                    }
                  >

                    <td>{product.id}</td>

                    {/* <td>
                    <img
                      src={
                        product.images?.[
                        imageIndexes[
                        product._id || product.id
                        ] || 0
                        ] ||
                        product.image
                      }
                      alt={product.name}
                      className="product-image"
                    />
                  </td> */}

                    <td>
                      {console.log("ADMIN PRODUCT", product)}

                      <img
                        src={
                          product.images?.[0] &&
                            product.images[0] !== ""
                            ? product.images[0]
                            : product.image &&
                              product.image !== ""
                              ? product.image
                              : "/no-image.png"
                        }
                        alt={product.name}
                        width="45"
                        height="45"
                        onError={(e) => {
                          e.target.src = "/no-image.png";
                        }}
                      />

                      <br />

                      {product.images?.length || 1}
                      Images

                    </td>
                    <td>{product.name}</td>

                    <td>{product.category}</td>

                    <td>{product.gender}</td>

                    <td>{product.color}</td>

                    <td>{product.fabric}</td>

                    <td>{product.size}</td>

                    <td>₹{product.price}</td>
                    <td>
                      {product.discount || 0}%
                    </td>

                    <td>{product.stock}</td>


                    <td>
                      <input
                        type="checkbox"
                        checked={
                          product.showOnHomePage || false
                        }
                        onChange={() =>
                          toggleControl(
                            product._id,
                            "showOnHomePage"
                          )
                        }
                      />
                    </td>

                    <td>
                      <input
                        type="checkbox"
                        checked={
                          product.showInFlashSale || false
                        }
                        onChange={() =>
                          toggleControl(
                            product._id,
                            "showInFlashSale"
                          )
                        }
                      />
                    </td>

                    <td>
                      <input
                        type="checkbox"
                        checked={
                          product.showInTrending || false
                        }
                        onChange={() =>
                          toggleControl(
                            product._id,
                            "showInTrending"
                          )
                        }
                      />
                    </td>

                    <td>
                      <input
                        type="checkbox"
                        checked={
                          product.featured || false
                        }
                        onChange={() =>
                          toggleControl(
                            product._id,
                            "featured"
                          )
                        }
                      />
                    </td>

                    <td>
                      <input
                        type="checkbox"
                        checked={
                          product.newArrival || false
                        }
                        onChange={() =>
                          toggleControl(
                            product._id,
                            "newArrival"
                          )
                        }
                      />
                    </td>

                    <td>

                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
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

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "15px",
              marginTop: "20px"
            }}
          >

            <button
              onClick={() =>
                setCurrentPage(
                  currentPage - 1
                )
              }
              disabled={
                currentPage === 1
              }
            >
              Previous
            </button>

            <span>
              Page {currentPage}
              of {totalPages}
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
            >
              Next
            </button>

          </div>
          {selectedProduct && (
            <div className="modal-overlay">

              <div className="product-modal">

                <h2>
                  Product Details
                </h2>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                    marginBottom: "15px"
                  }}
                >

                  {(
                    selectedProduct.images ||
                    [selectedProduct.image]
                  ).map((img, index) => (

                    <img
                      key={index}
                      src={img}
                      alt=""
                      width="120"
                      height="120"
                      style={{
                        objectFit: "cover",
                        borderRadius: "10px"
                      }}
                    />

                  ))}

                </div>
                <p>
                  <strong>Total Images:</strong>
                  {selectedProduct.images?.length || 1}
                </p>

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
                  <strong>Discount:</strong>
                  {selectedProduct.discount || 0}%
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

         
          {showCropper && (

            

            <div className="crop-modal">

               <h3
  style={{
    textAlign: "center",
    marginBottom: "15px",
  }}
>
  Crop Image
  {currentImageIndex + 1}
  /
  {selectedFiles.length}
</h3>


              <div className="crop-container">

                <Cropper
                  image={cropImage}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={(
                    croppedArea,
                    croppedPixels
                  ) =>
                    setCroppedAreaPixels(
                      croppedPixels
                    )
                  }
                />

              </div>

              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) =>
                  setZoom(
                    Number(e.target.value)
                  )
                }
              />

              <button
  onClick={async () => {

    const croppedFile =
      await getCroppedImg(
        cropImage,
        croppedAreaPixels
      );

    const updatedFiles =
      [...selectedFiles];

    updatedFiles[
      currentImageIndex
    ] = croppedFile;

    setSelectedFiles(
      updatedFiles
    );

    if (
      currentImageIndex <
      updatedFiles.length - 1
    ) {

      const nextIndex =
        currentImageIndex + 1;

      setCurrentImageIndex(
        nextIndex
      );

      setCropImage(
        URL.createObjectURL(
          updatedFiles[nextIndex]
        )
      );

    } else {

      setImages(
        updatedFiles.map(
          file =>
            URL.createObjectURL(
              file
            )
        )
      );

      setShowCropper(false);

      setCurrentImageIndex(0);

    }

  }}
>
  Crop & Next Image
</button>

            </div>

          )}
        </div>
      </div>
    </div>
  );
}

export default Products;