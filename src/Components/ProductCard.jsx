import React from 'react';
import { Plus, ShoppingCart } from 'lucide-react';

const ProductCard = ({ product }) => {
  
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
      <div className="relative h-40 bg-gray-50 flex items-center justify-center p-4">
        <img 
          src={product.image || "https://via.placeholder.com/150"} 
          alt={product.name}
          className="h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
        {product.stock < 5 && (
          <span className="absolute top-2 right-2 bg-red-100 text-red-600 text-[10px] font-bold px-2 py-1 rounded-full uppercase">
            Low Stock
          </span>
        )}
      </div>

      <div className="p-4">
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
          {product.category}
        </p>
        <h3 className="text-gray-800 font-semibold text-sm mt-1 truncate">
          {product.name}
        </h3>
        
        <div className="mt-3 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400 font-medium">$</span>
            <span className="text-lg font-bold text-indigo-600 ml-0.5">
              {product.price.toFixed(2)}
            </span>
          </div>

          <button className="bg-indigo-50 text-indigo-600 p-2 rounded-xl hover:bg-indigo-600 hover:text-white transition-colors">
            <Plus size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;