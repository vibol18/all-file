import React, { useEffect, useState } from 'react';
import ProductCard from '../Components/ProductCard';
import { getProducts, addProduct } from '../utils/api';

export default function Product() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name:"", price:"", stock:"", description:"", image:"", category:""
  });
  const [loading, setLoading] = useState(true);
  const [error,setError] = useState("");

  useEffect(() => {
    getProducts()
      .then(data => setProducts(data))
      .catch(err=> setError("Cannot load products"))
      .finally(()=> setLoading(false));
  },[]);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const saved = await addProduct(newProduct);
      setProducts([...products, saved]);
      setNewProduct({name:"", price:"", stock:"", description:"", image:"", category:""});
      setShowForm(false);
    } catch(err) {
      alert("Error saving product");
    }
  }

  if(loading) return <p>Loading products...</p>

  return (
    <div className="p-6">
      {error && <p className="text-red-500">{error}</p>}

      <button onClick={()=>setShowForm(!showForm)} className="bg-indigo-600 text-white p-2 rounded">
        + Add Product
      </button>

      {showForm && (
        <form onSubmit={handleAdd} className="my-4 space-y-2">
          <input placeholder="Name" value={newProduct.name} onChange={e=>setNewProduct({...newProduct,name:e.target.value})} className="border p-2 w-full"/>
          <input placeholder="Price" type="number" value={newProduct.price} onChange={e=>setNewProduct({...newProduct,price:e.target.value})} className="border p-2 w-full"/>
          <input placeholder="Stock" type="number" value={newProduct.stock} onChange={e=>setNewProduct({...newProduct,stock:e.target.value})} className="border p-2 w-full"/>
          <input placeholder="Category" value={newProduct.category} onChange={e=>setNewProduct({...newProduct,category:e.target.value})} className="border p-2 w-full"/>
          <input placeholder="Image URL" value={newProduct.image} onChange={e=>setNewProduct({...newProduct,image:e.target.value})} className="border p-2 w-full"/>
          <textarea placeholder="Description" value={newProduct.description} onChange={e=>setNewProduct({...newProduct,description:e.target.value})} className="border p-2 w-full"/>
          <button type="submit" className="bg-green-600 text-white p-2 rounded">Save</button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {products.map(p=><ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
