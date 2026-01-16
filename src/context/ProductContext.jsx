import { createContext, useContext, useState, useEffect } from "react";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch products from API
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/products");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setProducts(data);
      setError("");
    } catch {
      setError("Cannot load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add or update a product locally
  const addOrUpdateProduct = (product) => {
    setProducts((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) return prev.map((p) => (p.id === product.id ? product : p));
      return [...prev, product];
    });
  };

  // Delete product locally
  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        fetchProducts,
        addOrUpdateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => useContext(ProductContext);
