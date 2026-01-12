import React, { useEffect, useState } from "react";
import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar";
import ProductCard from "./Components/ProductCard";


function App() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newProduct, setNewProduct] = useState({
    method:"POST",
    name: "",
    price: "",
    stock: "",
    description: "",
    file: null,
  });
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/products");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError("Cannot load products");
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async(id) =>{
     if (!window.confirm("Are you sure you want to delete this product?")) return;
    try{
      const res = await fetch(`http://127.0.0.1:8000/api/products/{$id}`,{
        method : "DELETE",
      })

      if(!res.ok) throw new Error("Delete faild")
        setProducts (products.filter(p => p.id != id));
    }catch(err){
      alert('delete product unsucees')
    }
  }
  const handleAddProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("price", newProduct.price);
    formData.append("stock", newProduct.stock);
    formData.append("description", newProduct.description);
    if (newProduct.file) {
      formData.append("image", newProduct.file);
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/products", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Add failed");

      const saved = await res.json();
      setProducts([...products, saved]);
      setShowForm(false);

      setNewProduct({
        name: "",
        price: "",
        stock: "",
        description: "",
        file: null,
      });
    } catch (err) {
      alert("Failed to add product");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar isExpanded={isExpanded} />

        <main className="p-6">
          {/* HEADER */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">Products</h2>
              <p className="text-sm text-gray-500">
                Manage your shop items and stock
              </p>
            </div>

            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
            >
              + Add New Product
            </button>
          </div>

          {/* FORM */}
          {showForm && (
            <form
              onSubmit={handleAddProduct}
              className="bg-white p-6 rounded-xl shadow mb-6 space-y-4"
            >
               <input
                className="w-full border p-2 rounded"
                placeholder="Product name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                required
              />

              <input
                type="number"
                className="w-full border p-2 rounded"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
                required
              />

              <input
                type="number"
                className="w-full border p-2 rounded"
                placeholder="Stock"
                value={newProduct.stock}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, stock: e.target.value })
                }
              />

              <textarea
                className="w-full border p-2 rounded"
                placeholder="Description"
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    description: e.target.value,
                  })
                }
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setNewProduct({ ...newProduct, file: e.target.files[0] })
                }
              />

              <button className="bg-green-600 text-white px-4 py-2 rounded">
                Save Product
              </button>
            </form>
          )}

          {/* STATUS */}
          {loading && <p>Loading products...</p>}
          {error && <p className="text-red-600">{error}</p>}

          {/* PRODUCT GRID */}
          {!loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    

    </div>
  );
}

export default App;
