import React, { useState, useEffect } from "react";

export default function Pos() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showQR, setShowQR] = useState(false);
  
  // Fetch products from Laravel API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Cannot load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // CART FUNCTIONS
  const addToCart = (product) => {
    const exist = cart.find((item) => item.id === product.id);
    if (exist) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const increaseQty = (id) =>
    setCart(
      cart.map((item) => (item.id === id ? { ...item, qty: item.qty + 1 } : item))
    );

  const decreaseQty = (id) =>
    setCart(
      cart
        .map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0)
    );

  const removeFromCart = (id) => setCart(cart.filter((item) => item.id !== id));

  const handleCheckout = () => {
    if (cart.length === 0) return;
    alert("Checkout Success!");
    setCart([]);
    setShowQR(false);
  };

  // CART TOTALS
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  // Filter products
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="p-4">Loading products...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="flex h-screen bg-gray-100 p-4 gap-4">
      {/* LEFT: PRODUCTS */}
      <div className="flex-1 flex flex-col">
        <input
          type="text"
          placeholder="Search products..."
          className="p-2 border rounded mb-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="grid grid-cols-3 gap-4 overflow-y-auto">
          {filteredProducts.length === 0 && (
            <p className="col-span-3 text-center text-gray-500">
              No products found
            </p>
          )}

          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded shadow flex flex-col items-center"
            >
              <img
                src={
                  product.image
                    ? `http://127.0.0.1:8000/storage/${product.image}`
                    : "https://via.placeholder.com/80"
                }
                alt={product.name}
                className="w-28 h-28 object-cover mb-2 rounded"
              />
              <h3 className="font-bold">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.category}</p>
              <p className="font-bold mt-1">${product.price}</p>
              <p className="text-xs text-gray-400">Stock: {product.stock}</p>
              <button
                disabled={product.stock <= 0}
                onClick={() => addToCart(product)}
                className="mt-2 w-full bg-blue-600 text-white py-1 rounded disabled:opacity-50"
              >
                Add
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT: CART */}
      <div className="w-96 bg-white shadow rounded flex flex-col">
        <div className="p-4 border-b text-lg font-bold">Current Order</div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {cart.length === 0 ? (
            <p className="text-gray-500">No items in cart</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={
                      item.image
                        ? `http://127.0.0.1:8000/storage/${item.image}`
                        : "https://via.placeholder.com/50"
                    }
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      ${item.price} × {item.qty}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="px-2 bg-gray-200 rounded"
                  >
                    −
                  </button>
                  <span>{item.qty}</span>
                  <button
                    onClick={() => increaseQty(item.id)}
                    className="px-2 bg-gray-200 rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Totals & QR */}
        <div className="p-4 border-t">
          <div className="flex justify-between font-bold mb-2">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Tax (10%):</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg mb-4">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button
            disabled={cart.length === 0}
            onClick={handleCheckout}
            className="w-full bg-green-600 text-white py-2 rounded disabled:opacity-50"
          >
            PAY NOW
          </button>

          {/* QR Code Button */}
          <button
            className="w-full mt-4 bg-blue-600 text-white py-3 rounded-xl"
            onClick={() => setShowQR(!showQR)}
          >
            {showQR ? "Close QR" : "Show QR"}
          </button>

          {showQR && (
            <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-xl flex flex-col items-center">
                <h2 className="mb-4 text-xl font-bold">Scan QR to Pay</h2>
                <span className="font-bold text-2xl mb-2">${total.toFixed(2)}</span>
                <img
  src="https://vibol18.github.io/qrcodescan/photo_2026-01-04_09-22-11.jpg"
  alt="QR Code"
  className="w-60 h-60 object-cover"
/>
                <button
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => setShowQR(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
