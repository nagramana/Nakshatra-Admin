import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const ProductContext = createContext();

export const ProductProvider = ({
  children,
}) => {
  const [products, setProducts] =
    useState(() => {
      const saved =
        localStorage.getItem("products");

      return saved
        ? JSON.parse(saved)
        : [
            {
              id: "1781790000001",
              name: "Apple",
              price: 120,
              stock: 50,
              category: "Fruits",
              image:
                "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=200",
            },
            {
              id: "1781790000002",
              name: "Milk",
              price: 60,
              stock: 5,
              category: "Dairy",
              image:
                "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=200",
            },
          ];
    });

  useEffect(() => {
    localStorage.setItem(
      "products",
      JSON.stringify(products)
    );
  }, [products]);

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () =>
  useContext(ProductContext);