import React, { useEffect, useState } from "react";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    image: null, // file
  });

  const [preview, setPreview] = useState(null); // for image preview

 
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

  const handleSave = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", formData.name);
    fd.append("price", formData.price);
    fd.append("stock", formData.stock);
    fd.append("description", formData.description);
    if (formData.image) fd.append("image", formData.image); // important: key must match backend

    try {
      let res;
      if (editingId) {
        // Update product
        res = await fetch(`http://127.0.0.1:8000/api/products/${editingId}`, {
          method: "POST", // or PUT depending on your Laravel API
          body: fd,
        });
      } else {
        // Add new product
        res = await fetch("http://127.0.0.1:8000/api/products", {
          method: "POST",
          body: fd,
        });
      }

      if (!res.ok) throw new Error("Save failed");
      const saved = await res.json();

      if (editingId) {
        setProducts(products.map((p) => (p.id === editingId ? saved : p)));
        setEditingId(null);
      } else {
        setProducts([...products, saved]);
      }

      setFormData({ name: "", price: "", stock: "", description: "", image: null });
      setPreview(null);
      setShowForm(false);
    } catch (err) {
      alert("Failed to save product");
    }
  };


  const handleEdit = (product) => {
    setFormData({ ...product, image: null }); // reset file input
    setPreview(product.image ? `http://127.0.0.1:8000/storage/${product.image}` : null);
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      alert("Failed to delete product");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <button
        onClick={() => { setShowForm(!showForm); setEditingId(null); setPreview(null); }}
        className="bg-indigo-600 text-white px-4 py-2 rounded mb-4"
      >
        {showForm ? "Close Form" : "+ Add Product"}
      </button>

      {showForm && (
        <form onSubmit={handleSave} className="bg-white p-6 rounded shadow-md max-w-md mb-6">
          <h2 className="text-xl font-bold fixed mb-4">{editingId ? "Edit Product" : "Add Product"}</h2>
          <input
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="border p-2 w-full mb-2"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="border p-2 w-full mb-2"
            required
          />

          <input
            type="number"
            placeholder="Stock"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            className="border p-2 w-full mb-2"
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="border p-2 w-full mb-2"
          />
          <input type="file" accept="image/*" onChange={handleFileChange} className="border p-2 w-full mb-2" />
          {preview && <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded mb-2" />}
          <button type="submit" className="bg-green-600 text-white p-2 w-full rounded">
            {editingId ? "Update Product" : "Add Product"}
          </button>
        </form>
      )}

      <table className="min-w-full border mt-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Stock</th>
            <th className="border px-4 py-2">Image</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td className="border px-4 py-2">{p.id}</td>
              <td className="border px-4 py-2">{p.name}</td>
              <td className="border px-4 py-2">${p.price}</td>
              <td className="border px-4 py-2">{p.stock}</td>
              <td className="border px-4 py-2">
                <img
                  src={p.image ? `http://127.0.0.1:8000/storage/${p.image}` : "https://via.placeholder.com/80"}
                  alt={p.name}
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td className="border px-4 py-2 space-x-2">
                <button onClick={() => handleEdit(p)} className="bg-yellow-500 text-white px-2 rounded">
                  Edit
                </button>
                <button onClick={() => handleDelete(p.id)} className="bg-red-500 text-white px-2 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
