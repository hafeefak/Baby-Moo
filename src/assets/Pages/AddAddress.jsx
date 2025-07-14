import React, { useState } from 'react';
import api from '../../api/axiosConfig';
import Navbar from '../Components/Navbar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddAddress() {
  const [form, setForm] = useState({
    fullName: '',
    street: '',
    city: '',
    state: '',
    pinCode: '',
    country: ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await api.post('/address', form);

      if (data && data.statusCode === 200) {
        toast.success('Address added!');
        setForm({
          fullName: '',
          street: '',
          city: '',
          state: '',
          pinCode: '',
          country: ''
        }); // reset form
      } else {
        toast.error(data?.message || 'Failed to add address');
      }
    } catch (err) {
      console.error('Add address error:', err);
      toast.error(err.response?.data?.message || 'Failed to add address');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto mt-20 bg-white p-8 rounded-lg shadow space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Add Address</h2>

        {[
          { name: 'fullName', label: 'Full Name' },
          { name: 'street', label: 'Street' },
          { name: 'city', label: 'City' },
          { name: 'state', label: 'State' },
          { name: 'pinCode', label: 'PIN Code' },
          { name: 'country', label: 'Country' },
        ].map(({ name, label }) => (
          <input
            key={name}
            name={name}
            value={form[name]}
            onChange={handleChange}
            placeholder={label}
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        ))}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
        >
          Save Address
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
