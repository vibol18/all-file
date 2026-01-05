import React, { useState } from 'react';
import { LayoutDashboard, Users, Package, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

const Sidebar = ({ isExpanded, setIsExpanded }) => {
  const [openSubmenu, setOpenSubmenu] = useState("Products");

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, active: true },
    { name: 'User Management', icon: <Users size={20} />, hasSubmenu: true },
    { 
      name: 'Products', 
      icon: <Package size={20} />, 
      hasSubmenu: true,
      subItems: ['List Products', 'Add Product', 'Variations', 'Selling Price Group'] 
    },
  ];

  return (
    <div className={`h-screen bg-white border-r transition-all duration-300 relative ${isExpanded ? 'w-64' : 'w-20'}`}>
      {/* Button Toggle */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-3 top-10 bg-white border rounded-full p-1 shadow-md z-10"
      >
        {isExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>

      {/* Logo */}
      <div className="p-4 flex items-center gap-2">
        <div className="bg-yellow-400 font-bold p-1 rounded">SADA</div>
        {isExpanded && <span className="text-xs font-bold text-gray-500">SUPER SHOP</span>}
      </div>

      {/* Menu List */}
      <nav className="mt-4 px-3">
        {menuItems.map((item) => (
          <div key={item.name} className="mb-2">
            <div 
              onClick={() => isExpanded && item.hasSubmenu && setOpenSubmenu(openSubmenu === item.name ? "" : item.name)}
              className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${item.active ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              {item.icon}
              {isExpanded && (
                <div className="flex justify-between items-center w-full ml-3">
                  <span className="text-sm font-medium">{item.name}</span>
                  {item.hasSubmenu && <ChevronDown size={14} className={openSubmenu === item.name ? "rotate-180" : ""} />}
                </div>
              )}
            </div>

            {/* Submenu (Render only when Expanded) */}
            {isExpanded && item.hasSubmenu && openSubmenu === item.name && (
              <div className="ml-8 mt-1 border-l-2 border-gray-100 pl-4">
                {item.subItems?.map(sub => (
                  <div key={sub} className="py-2 text-sm text-gray-500 hover:text-indigo-600 cursor-pointer">
                    {sub}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;