import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

const Pos = () => {
  const {
    cart,
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
    totalAmount,
  } = useCart();

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔹 Load products from Laravel API
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error loading products:", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCheckout = () => {
    if (cart.length === 0) return;
    alert("Checkout Successful!");
    clearCart();
  };

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

        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className="grid grid-cols-3 gap-4 overflow-y-auto">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white p-4 rounded shadow"
              >
                <h3 className="font-bold">{product.name}</h3>
                <p className="text-sm text-gray-500">
                  ${product.price}
                </p>
                <p className="text-xs text-gray-400">
                  Stock: {product.stock}
                </p>

                <button
                  disabled={product.stock <= 0}
                  onClick={() => addToCart(product)}
                  className="mt-2 w-full bg-blue-600 text-white py-1 rounded disabled:opacity-50"
                >
                  Add
                </button>
              </div>
            ))}

            {filteredProducts.length === 0 && (
              <p className="col-span-3 text-center text-gray-500">
                No products found
              </p>
            )}
          </div>
        )}
      </div>

      {/* RIGHT: CART */}
      <div className="w-96 bg-white shadow rounded flex flex-col">
        <div className="p-4 border-b text-lg font-bold">
          Current Order
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {cart.length === 0 ? (
            <p className="text-gray-500">No items in cart</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    ${item.price} × {item.qty}
                  </p>
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

        <div className="p-4 border-t">
          <div className="flex justify-between font-bold mb-4">
            <span>Total:</span>
            <span className="text-blue-600">
              ${totalAmount.toFixed(2)}
            </span>
          </div>

          <button
            disabled={cart.length === 0}
            onClick={handleCheckout}
            className="w-full bg-green-600 text-white py-2 rounded disabled:opacity-50"
          >
            PAY NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pos;
