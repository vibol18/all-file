import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  // 🔹 Fetch products from your API
  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/products");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data.data || data); // depends on your API response
    } catch (err) {
      setError("Cannot load products");
      console.error(err);
    } finally {
      setLoadingProducts(false);
    }
  };

  // 🔹 Fetch orders from your API
  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/orders");
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = await res.json();
      setOrders(data.data || data);
    } catch (err) {
      setError("Cannot load orders");
      console.error(err);
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  // 🔹 Summary calculations
  const totalRevenue = orders.reduce((sum, o) => sum + parseFloat(o.total || o.total_amount || 0), 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const lowStock = products.filter((p) => parseInt(p.stock) <= 2);

  // 🔹 Filter orders by customer name
  const filteredOrders = orders.filter(
    (o) => o.customer?.toLowerCase().includes(search.toLowerCase()) || o.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white shadow p-4 rounded">
          <p className="text-gray-500 text-sm">Total Revenue</p>
          <p className="text-xl font-bold">${totalRevenue.toFixed(2)}</p>
        </div>
        <div className="bg-white shadow p-4 rounded">
          <p className="text-gray-500 text-sm">Total Orders</p>
          <p className="text-xl font-bold">{totalOrders}</p>
        </div>
        <div className="bg-white shadow p-4 rounded">
          <p className="text-gray-500 text-sm">Total Products</p>
          <p className="text-xl font-bold">{totalProducts}</p>
        </div>
        <div className="bg-white shadow p-4 rounded">
          <p className="text-gray-500 text-sm">Low Stock</p>
          <p className="text-xl font-bold">{lowStock.length}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-6 flex gap-2">
        <button className="bg-green-600 text-white px-4 py-2 rounded">Add Product</button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Go to POS</button>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded">View Analytics</button>
      </div>

      {/* Search Orders */}
      <input
        type="text"
        placeholder="Search customer..."
        className="w-full mb-4 p-2 border rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Recent Orders Table */}
      <div className="mb-6 overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Order ID</th>
              <th className="p-2 border">Customer</th>
              <th className="p-2 border">Total</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {loadingOrders ? (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">Loading orders...</td>
              </tr>
            ) : filteredOrders.length > 0 ? (
              filteredOrders.map((o) => (
                <tr key={o.id}>
                  <td className="p-2 border">{o.id}</td>
                  <td className="p-2 border">{o.customer || o.name}</td>
                  <td className="p-2 border">${parseFloat(o.total || o.total_amount).toFixed(2)}</td>
                  <td className="p-2 border">{o.status || "Pending"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center p-4 text-gray-500">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Low Stock Products */}
      <div className="overflow-x-auto bg-white shadow rounded">
        <p className="p-2 font-bold border-b">Low Stock Products</p>
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Product</th>
              <th className="p-2 border">Stock</th>
              <th className="p-2 border">Price</th>
            </tr>
          </thead>
          <tbody>
            {loadingProducts ? (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">Loading products...</td>
              </tr>
            ) : lowStock.length > 0 ? (
              lowStock.map((p) => (
                <tr key={p.id}>
                  <td className="p-2 border">{p.id}</td>
                  <td className="p-2 border">{p.name}</td>
                  <td className="p-2 border">{p.stock}</td>
                  <td className="p-2 border">${parseFloat(p.price).toFixed(2)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center p-4 text-gray-500">
                  No low stock products
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
