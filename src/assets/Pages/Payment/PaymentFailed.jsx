import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentFailed = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-6 rounded shadow text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Payment Failed</h2>
        <p className="mb-4">Unfortunately, your payment could not be completed.</p>
        <button
          onClick={() => navigate('/orders')}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default PaymentFailed;
