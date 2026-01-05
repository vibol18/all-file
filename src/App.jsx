import React, { useState, useEffect } from 'react';
import Sidebar from './Components/Sidebar';
import Navbar from './Components/Navbar';
import ProductCard from './Components/ProductCard';

function App() {
  // Sidebar expand state
  const [isExpanded, setIsExpanded] = useState(true);

  // Products state
  const [products, setProducts] = useState([]);

  // Fetch products ONCE when page loads
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      
      <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />

      <div className="flex-1 flex flex-col min-w-0">
        
        <Navbar isExpanded={isExpanded} />

        <main className="p-6 overflow-y-auto">
          
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Products</h2>
              <p className="text-sm text-gray-500">
                Manage your shop items and stock
              </p>
            </div>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
              + Add New Product
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </main>
      </div>
    </div>
  );
}

export default App;
