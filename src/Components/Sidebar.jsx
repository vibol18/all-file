import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  BarChart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Sidebar = ({ isExpanded, setIsExpanded }) => {
  const [openSubmenu, setOpenSubmenu] = useState("");
  const location = useLocation(); // get current path

  const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/" },
  { name: "Products", icon: Package, path: "/products" },
  { name: "POS", icon: ShoppingCart, path: "/pos" }, // lowercase 'pos'
  { name: "Analytics", icon: BarChart, path: "/analytics" },
];

  return (
    <div className={`h-screen bg-white border-r transition-all duration-300 ${isExpanded ? "w-64" : "w-20"}`}>

      <button className="bg-orange-500 h-10 w-15 ml-10 m-auto font-bold rounded-lg mt-5">SODA</button>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-3 top-10 bg-white border rounded-full p-1 shadow"
      >
        {isExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>

      <nav className="mt-6 px-3 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 p-3 rounded hover:bg-gray-100 transition-colors
                ${isActive ? "bg-blue-100 text-blue-600 font-semibold" : "text-gray-700"}`}
            >
              <Icon size={20} />
              {isExpanded && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
