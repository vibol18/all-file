import React, { useEffect, useState } from "react";
import { Users, DollarSign } from "lucide-react";
import { getProducts } from "../utils/api"; // assuming this is a function that fetches products

const Dashboard = () => {
  const [stats, setStats] = useState({
    stock: 0,
    users: 0,
    revenue: 0,
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // for dashboard stats
  const [productLoading, setProductLoading] = useState(true); // for products
  const [error, setError] = useState(null);

  // Fetch dashboard stats (simulated)
  useEffect(() => {
    setTimeout(() => {
      setStats({
        stock: 128,
        users: 12,
        revenue: 4580,
      });
      setLoading(false);
    }, 600);
  }, []);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts(); // your custom API call
        setProducts(data);
      } catch (err) {
        setError(err.message || "Failed to fetch products");
      } finally {
        setProductLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading || productLoading) {
    return <p className="text-gray-500">Loading dashboard...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-gray-500">Overview of your shop performance</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Stock"
          value={stats.stock}
          icon={<DollarSign size={22} />}
          color="bg-indigo-100 text-indigo-600"
        />
        <StatCard
          title="Users"
          value={stats.users}
          icon={<Users size={22} />}
          color="bg-blue-100 text-blue-600"
        />
        <StatCard
          title="Revenue"
          value={`$${stats.revenue.toLocaleString()}`}
          icon={<DollarSign size={22} />}
          color="bg-yellow-100 text-yellow-600"
        />
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold">Products</h2>
        <ul>
          {products.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white rounded-xl shadow p-5 flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-2xl font-bold">{value}</h2>
      </div>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${color}`}>
        {icon}
      </div>
    </div>
  );
};

export default Dashboard;
