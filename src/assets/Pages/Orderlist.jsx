// OrderList.jsx
import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';
import Navbar from '../Components/Navbar';
import { toast } from 'react-toastify';

export default function OrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get('/orders')
      .then(res => setOrders(res.data.data))
      .catch(() => toast.error('Could not fetch orders'));
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto mt-10 p-4 space-y-4">
        <h2 className="text-2xl font-bold">My Orders</h2>
        {orders.length === 0 && <p>No orders yet.</p>}
        {orders.map(order => (
          <div key={order.id} className="bg-white p-4 rounded shadow">
            <p>Status: {order.status} | Payment: {order.paymentStatus}</p>
            {order.items.map(item => (
              <div key={item.productId} className="flex justify-between">
                <span>{item.productName} x {item.quantity}</span>
                <span>₹ {(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="font-bold text-right">Total: ₹ {order.totalAmount.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
