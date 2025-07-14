import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';
import Navbar from '../Components/Navbar';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

export default function AddressList() {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const navigate = useNavigate();

  const loadAddresses = () => {
    api.get('/address')
      .then(res => setAddresses(res.data.data))
      .catch(() => toast.error('Could not load addresses'));
  };

  useEffect(() => {
    loadAddresses();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Delete this address?')) {
      api.delete(`/address/${id}`)
        .then(() => {
          toast.success('Deleted');
          loadAddresses();
        })
        .catch(() => toast.error('Failed to delete'));
    }
  };

  const handleGoToOrders = () => {
    if (!selectedAddressId) {
      toast.info('Please select an address first');
      return;
    }
    navigate('/orders', { state: { selectedAddressId } });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-3xl mx-auto mt-10 p-6 space-y-6 bg-white rounded-xl shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">My Addresses</h2>
          <Link 
            to="/add-address" 
            className="bg-pink-500 text-white px-3 py-1 rounded hover:bg-pink-600"
          >
            + Add Address
          </Link>
        </div>

        {addresses.length === 0 && (
          <p className="text-gray-500">No addresses yet. Click "+ Add Address".</p>
        )}

        <div className="space-y-4">
          {addresses.map(addr => (
            <div
              key={addr.addressId}
              className={`border rounded-lg p-4 flex justify-between items-center ${
                selectedAddressId === addr.addressId ? 'border-green-500 bg-green-50' : 'border-gray-300'
              }`}
            >
              <div>
                <p className="font-medium">{addr.fullName}</p>
                <p className="text-gray-600 text-sm">
                  {addr.street}, {addr.city}, {addr.state}, {addr.pinCode}, {addr.country}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedAddressId(addr.addressId)}
                  className="bg-green-500 text-white px-2 py-1 text-sm rounded hover:bg-green-600"
                >
                  Use this Address
                </button>
                <button
                  onClick={() => handleDelete(addr.addressId)}
                  className="bg-pink-500 text-white px-2 py-1 text-sm rounded hover:bg-pink-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Go to orders button */}
        {addresses.length > 0 && (
          <button
            onClick={handleGoToOrders}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded mt-4"
          >
            Proceed to Order Page
          </button>
        )}
      </div>
    </div>
  );
}
