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
    image: null,
  });

  const [preview, setPreview] = useState(null);

  // ================= FETCH PRODUCTS =================
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/products");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setProducts(data);
    } catch {
      setError("Cannot load products");
    } finally {
      setLoading(false);
    }
  };

  // ================= SAVE PRODUCT =================
  const handleSave = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) fd.append(key, formData[key]);
    });

    try {
      const url = editingId
        ? `http://127.0.0.1:8000/api/products/${editingId}`
        : "http://127.0.0.1:8000/api/products";

      const res = await fetch(url, {
        method: "POST",
        body: fd,
      });

      if (!res.ok) throw new Error();
      const saved = await res.json();

      if (editingId) {
        setProducts(products.map(p => p.id === editingId ? saved : p));
      } else {
        setProducts([...products, saved]);
      }

      resetForm();
    } catch {
      alert("Save failed");
    }
  };

  // ================= HELPERS =================
  const resetForm = () => {
    setFormData({ name: "", price: "", stock: "", description: "", image: null });
    setPreview(null);
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (p) => {
    setFormData({ ...p, image: null });
    setPreview(p.image ? `http://127.0.0.1:8000/storage/${p.image}` : null);
    setEditingId(p.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    await fetch(`http://127.0.0.1:8000/api/products/${id}`, { method: "DELETE" });
    setProducts(products.filter(p => p.id !== id));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    setPreview(URL.createObjectURL(file));
  };

  // ================= UI =================
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <button
        onClick={() => setShowForm(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        + Add Product
      </button>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <form onSubmit={handleSave} className="bg-white p-6 rounded w-96 relative">
            <h2 className="text-xl font-bold mb-3">
              {editingId ? "Edit Product" : "Add Product"}
            </h2>

            <input className="border p-2 w-full mb-2" placeholder="Name"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              required
            />

            <input type="number" className="border p-2 w-full mb-2" placeholder="Price"
              value={formData.price}
              onChange={e => setFormData({ ...formData, price: e.target.value })}
              required
            />

            <input type="number" className="border p-2 w-full mb-2" placeholder="Stock"
              value={formData.stock}
              onChange={e => setFormData({ ...formData, stock: e.target.value })}
            />

            <textarea className="border p-2 w-full mb-2" placeholder="Description"
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
            />

            <input type="file" onChange={handleFileChange} className="mb-2" />
            {preview && <img src={preview} className="w-24 h-24 mb-2" />}

            <button className="bg-green-600 text-white w-full py-2 rounded">
              Save
            </button>

            <button
              type="button"
              onClick={resetForm}
              className="absolute top-2 right-2"
            >
              ✕
            </button>
          </form>
        </div>
      )}

     <div className="mt-6 overflow-x-auto">
  <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm">
    <thead className="bg-gray-100 text-gray-700">
      <tr>
        <th className="px-4 py-3 text-left text-sm font-semibold">ID</th>
        <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
        <th className="px-4 py-3 text-left text-sm font-semibold">Price</th>
        <th className="px-4 py-3 text-left text-sm font-semibold">Stock</th>
        <th className="px-4 py-3 text-left text-sm font-semibold">Image</th>
        <th className="px-4 py-3 text-center text-sm font-semibold">Actions</th>
      </tr>
    </thead>

    <tbody className="divide-y divide-gray-200">
      {products.map((p, index) => (
        <tr
          key={p.id}
          className="hover:bg-gray-50 transition"
        >
          <td className="px-4 py-3 text-sm text-gray-600">
            #{p.id}
          </td>

          <td className="px-4 py-3">
            <div className="font-medium text-gray-800">
              {p.name}
            </div>
          </td>

          <td className="px-4 py-3 text-sm font-semibold text-green-600">
            ${p.price}
          </td>

          <td className="px-4 py-3">
            <span
              className={`px-2 py-1 text-xs rounded-full font-medium
                ${p.stock > 0
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
                }`}
            >
              {p.stock > 0 ? `${p.stock} In Stock` : "Out of Stock"}
            </span>
          </td>

          <td className="px-4 py-3">
            <img
              src={
                p.image
                  ? `http://127.0.0.1:8000/storage/${p.image}`
                  : "https://via.placeholder.com/60"
              }
              alt={p.name}
              className="w-14 h-14 object-cover rounded-md border"
            />
          </td>

          <td className="px-4 py-3 text-center">
            <div className="flex justify-center gap-2">
              <button
                onClick={() => handleEdit(p)}
                className="px-3 py-1 text-sm rounded bg-yellow-500 hover:bg-yellow-600 text-white transition"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(p.id)}
                className="px-3 py-1 text-sm rounded bg-red-500 hover:bg-red-600 text-white transition"
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
    </div>
  );
}
