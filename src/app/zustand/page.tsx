"use client";

import useCartStore from "@/store";
import React from "react";
import { FaTrash } from "react-icons/fa";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 120,
    image: "https://img.freepik.com/free-psd/headphone-icon-isolated-3d-render-illustration_439185-13143.jpg?ga=GA1.1.2094674987.1760599689&semt=ais_hybrid&w=740&q=80",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 250,
    image: "https://img.freepik.com/free-photo/rendering-smart-home-device_23-2151039316.jpg?ga=GA1.1.2094674987.1760599689&semt=ais_hybrid&w=740&q=80",
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: 80,
    image: "https://img.freepik.com/free-photo/high-angle-smart-speaker-home_23-2150171766.jpg?ga=GA1.1.2094674987.1760599689&semt=ais_hybrid&w=740&q=80",
  },
];

const ZustandForm = () => {
  const { addProductToCart,removeProductFromCart, clearCart ,cart } = useCartStore();

  const handleAdd = (product) => {
    addProductToCart(product);
  };
    const handleRemove = (id) => {
    removeProductFromCart(id);
  };
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h1 className="text-3xl font-bold text-center mb-10">🛒 Zustand Cart Demo</h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-md p-5 flex flex-col items-center hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-40 h-40 object-cover rounded-xl mb-4"
            />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-500 mb-4">${product.price}</p>
            <button
              onClick={() => handleAdd(product)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div className="mt-10 max-w-xl mx-auto text-center bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">🧾 Cart Summary</h2>
        {cart.length === 0 ? (
          <p>No products added yet.</p>
        ) : (
          <>
          <ul className="space-y-2">
            {cart.map((item, index) => (
              <li
                key={index}
                className="flex justify-between border-b border-gray-300 pb-2 "
              >
                <span>{item.name}</span>
                <div className="flex gap-2">
                <span>${item.price}</span>
                  <button
                      onClick={() => handleRemove(item.id)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      <FaTrash size={16} />
                    </button>
                    </div>
              </li>
            ))}
          </ul>
              <div className="flex mt-10 justify-between items-center text-lg font-semibold border-t pt-3">
              <span>Total:</span>
              <span>${totalPrice}</span>
            </div>

            <button
              onClick={clearCart}
              className="flex items-center mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              <FaTrash className="inline-block mr-2" />
              Clear Cart
            </button>
          </>
          
        )}
      </div>
    </div>
  );
};

export default ZustandForm;
