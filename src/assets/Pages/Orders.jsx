import React, { useContext, useEffect, useState } from 'react';
import api from '../../api/axiosConfig';
import Navbar from '../Components/Navbar';
import { Cartcontext } from '../Context/Cartcontext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Orders() {
  const { cart, getTotalPrice } = useContext(Cartcontext);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/address')
      .then(res => setAddresses(res.data.data))
      .catch(() => toast.error('Could not load addresses'));
  }, []);

  const handleConfirmOrder = async () => {
    if (!selectedAddressId) {
      toast.info('Please select an address');
      return;
    }
    try {
      const items = cart.map(item => ({
        productId: item.productId,
        quantity: item.quantity
      }));

      // 1️⃣ Create order
      const res = await api.post(`/orders?addressId=${selectedAddressId}`, { items });
      const orderId = res.data?.data;

      if (!orderId) {
        toast.error("Order creation failed");
        return;
      }

      // 2️⃣ Start payment (create PayPal order)
    const paymentRes = await api.post(`/payment/start/${orderId}`);
const approvalUrl = paymentRes?.data?.data?.approvalUrl;

if (approvalUrl) {
  window.location.href = approvalUrl;
} else {
  toast.error("Failed to start PayPal payment");
}

    } catch (err) {
      console.error(err);
      toast.error('Could not place order');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-3xl mx-auto mt-20 p-4 space-y-6 bg-white rounded shadow">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Select Shipping Address</h2>
          <button
            onClick={() => navigate('/add-address')}
            className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-1 rounded"
          >
            + Add Address
          </button>
        </div>

        {addresses.length === 0 ? (
          <p className="text-gray-600">No addresses found. Please add one.</p>
        ) : (
          <div className="space-y-3">
            {addresses.map(addr => (
              <label
                key={addr.addressId}
                className={`block border rounded p-3 cursor-pointer ${
                  selectedAddressId === addr.addressId ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="address"
                  value={addr.addressId}
                  className="mr-2"
                  onChange={() => setSelectedAddressId(addr.addressId)}
                />
                <span>
                  {addr.fullName}, {addr.street}, {addr.city}, {addr.state}, {addr.pinCode}, {addr.country}
                </span>
              </label>
            ))}
          </div>
        )}

        <div>
          <h3 className="font-semibold mt-4 mb-2">Your Cart:</h3>
          {cart.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            cart.map(item => (
              <div key={item.productId} className="flex justify-between border-b py-2">
                <span>{item.productName} x {item.quantity}</span>
                <span>₹ {(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))
          )}
          <div className="font-bold text-right mt-2">Total: ₹ {getTotalPrice().toFixed(2)}</div>
        </div>

        <button
          onClick={handleConfirmOrder}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
}
