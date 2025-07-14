import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { Cartcontext } from '../Context/Cartcontext';
import { toast, ToastContainer } from 'react-toastify';
import { MdDeleteOutline } from "react-icons/md";

function Cart() {
  const { cart, getTotalPrice, increaseQuantity, decreaseQuantity, removeFromCart } = useContext(Cartcontext);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    setIsLoggedIn(!!token);
  }, []);

  const handlePlaceOrder = () => {
    if (!isLoggedIn) {
      toast.info('Please login to place your order');
      navigate('/userlogin');
    } else {
      navigate('/orders');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex flex-1 flex-col justify-center items-center space-y-4">
          <h2 className="text-xl font-semibold">🛒 Your cart is empty</h2>
          <button
            onClick={() => navigate('/products')}
            className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
          >
            🛍️ Shop Now
          </button>
        </div>
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto mt-20 p-4 space-y-8 bg-white shadow rounded">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

        {cart.map(item => (
          <div key={item.productId} className="flex justify-between items-center border-b py-2">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => decreaseQuantity(item.productId)}
                className="px-3 py-1 bg-gray-200 font-bold text-lg rounded"
              >−</button>
              <span>{item.productName} x {item.quantity}</span>
              <button
                onClick={() => increaseQuantity(item.productId)}
                className="px-3 py-1 bg-gray-200 font-bold text-lg rounded"
              >+</button>
              <MdDeleteOutline
                className="text-red-500 cursor-pointer ml-2"
                onClick={() => removeFromCart(item.productId)}
              />
            </div>
            <div>₹ {(item.price * item.quantity).toFixed(2)}</div>
          </div>
        ))}

        <div className="text-right font-bold mt-4">Total: ₹ {getTotalPrice().toFixed(2)}</div>

        <button
          onClick={handlePlaceOrder}
          disabled={!isLoggedIn}
          className={`w-full px-4 py-2 rounded text-white ${
            isLoggedIn ? 'bg-pink-500 hover:bg-pink-600' : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          Place Your Order
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Cart;
