import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  BarChart,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Sidebar = ({ isExpanded, setIsExpanded }) => {
  const [openSubmenu, setOpenSubmenu] = useState("");

  return (
    <div className={`h-screen bg-white border-r transition-all duration-300 ${isExpanded ? "w-64" : "w-20"}`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-3 top-10 bg-white border rounded-full p-1 shadow"
      >
        {isExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>

      <nav className="mt-6 px-3 space-y-2">
        <Link to="/" className="flex items-center gap-3 p-3 rounded hover:bg-gray-100">
          <LayoutDashboard size={20} />
          {isExpanded && <span>Dashboard</span>}
        </Link>

        <Link to="/products" className="flex items-center gap-3 p-3 rounded hover:bg-gray-100">
          <Package size={20} />
          {isExpanded && <span>Products</span>}
        </Link>

        <Link to="/pos" className="flex items-center gap-3 p-3 rounded hover:bg-gray-100">
          <ShoppingCart size={20} />
          {isExpanded && <span>POS</span>}
        </Link>

         <Link to="/Analytics" className="flex items-center gap-3 p-3 rounded hover:bg-gray-100">
          <BarChart size={20} />
          {isExpanded && <span>Analytics</span>}
        </Link>

      </nav>
    </div>
  );
};

export default Sidebar;
