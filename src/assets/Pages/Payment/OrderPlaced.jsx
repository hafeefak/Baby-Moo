import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderPlaced = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const orderId = state?.orderId;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-6 rounded shadow text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-4">Order Placed Successfully!</h2>
        <p className="mb-4">Your order ID: <span className="font-mono">{orderId}</span></p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => navigate('/')}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Go to Home
          </button>
          <button
            onClick={() => navigate('/orderlist')}
            className="border border-green-500 text-green-600 px-4 py-2 rounded hover:bg-green-50"
          >
            View Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPlaced;
