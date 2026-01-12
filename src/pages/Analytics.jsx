import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";

export default function Analytics() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444"];

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading analytics...</p>;

  // Sample data for charts
  const revenueData = products.map((p) => ({
    name: p.name,
    revenue: p.sold ? p.sold * p.price : 0,
  }));

  const stockData = products.map((p) => ({
    name: p.name,
    stock: p.stock,
  }));

  const categoryData = Object.values(
    products.reduce((acc, p) => {
      acc[p.category] = acc[p.category] || { name: p.category, value: 0 };
      acc[p.category].value += p.stock;
      return acc;
    }, {})
  );

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white rounded shadow p-4">
        <h2 className="font-bold mb-2">Revenue per Product</h2>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={revenueData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#E54646" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded shadow p-4">
        <h2 className="font-bold mb-2">Stock by Category</h2>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={60}
              label
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded shadow p-4">
        <h2 className="font-bold mb-2">Stock per Product</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={stockData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="stock" fill="#10B981" />

            <Bar dataKey="product" fill="#EF4444"/>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded shadow p-4">
        <h2 className="font-bold mb-2">Products Sold</h2>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={products}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey={(p) => p.sold || 0}
              stroke="#F59E0B"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

   
      <div className="bg-white rounded shadow p-4 col-span-2">
        <h2 className="font-bold mb-2">Stock vs Sold</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={products}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="stock" fill="#4F46E5" />
            <Bar dataKey="sold" fill="#EF4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>

       <div className="bg-white rounded shadow p-4 col-span-2">
        <h2 className="font-bold mb-2">Stock vs Sold</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={products}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="stock" fill="#4F46E5" />
            <Bar dataKey="sold" fill="#EF4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
