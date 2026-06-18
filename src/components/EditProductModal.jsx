import React from "react";

function EditProductModal({
  show,
  product,
  setProduct,
  onSave,
  onClose,
}) {
  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <div
        style={{
          background: "#fff",
          width: "500px",
          padding: "25px",
          borderRadius: "12px",
        }}
      >
        <h2>Edit Product</h2>

        <input
          type="text"
          placeholder="Product Name"
          value={product.name}
          onChange={(e) =>
            setProduct({
              ...product,
              name: e.target.value,
            })
          }
        />

        <br />
        <br />

        <input
          type="number"
          placeholder="Price"
          value={product.price}
          onChange={(e) =>
            setProduct({
              ...product,
              price: e.target.value,
            })
          }
        />

        <br />
        <br />

        <input
          type="number"
          placeholder="Stock"
          value={product.stock}
          onChange={(e) =>
            setProduct({
              ...product,
              stock: e.target.value,
            })
          }
        />

        <br />
        <br />

        <select
          value={product.category}
          onChange={(e) =>
            setProduct({
              ...product,
              category: e.target.value,
            })
          }
        >
          <option value="Fruits">Fruits</option>
          <option value="Vegetables">
            Vegetables
          </option>
          <option value="Dairy">Dairy</option>
          <option value="Groceries">
            Groceries
          </option>
        </select>

        <br />
        <br />

        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <button onClick={onSave}>
            Save
          </button>

          <button
            onClick={onClose}
            style={{
              background: "#ef4444",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProductModal;