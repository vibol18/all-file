import React from 'react';
import { Edit, Plus } from 'lucide-react';
const handleDelete = (id) => {
  setProducts(products.filter(product => product.id !== id));
};
const ProductCard = ( { product, onDelete } ) => {
  const {
    name = "Unnamed Product",
    price = 0,
    stock = 0,
    category = "General",
    image = null
  } = product || {};

  const imageUrl = image
    ? `http://127.0.0.1:8000/storage/${image}`
    : "https://via.placeholder.com/300";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden hover:shadow-md transition-shadow">
      
      <div className="relative h-40 bg-gray-50">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />

        {stock < 5 && (
          <span className="absolute top-2 right-2 bg-red-100 text-red-600 text-[10px] font-bold px-2 py-1 rounded-full">
            Low Stock
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs text-gray-400 uppercase">{category}</p>

        <h3 className="font-semibold text-sm truncate">{name}</h3>

        <div className="mt-3 flex justify-between items-center">
          <span className="text-indigo-600 font-bold">
            ${Number(price).toFixed(2)}
          </span>

          <div className="flex gap-2">
           <button onClick={()=> onDelete(product.id)} className="p-2 bg-indigo-50 rounded-xl">
           <Plus size={18} />
          </button>

            <button className="p-2 bg-indigo-50 rounded-xl">
              <Edit size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
