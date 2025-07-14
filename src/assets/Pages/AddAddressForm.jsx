// src/pages/AddAddressForm.jsx
import React, { useState } from 'react';
import api from '../../api/axiosConfig';
import Navbar from '../Components/Navbar';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function AddressForm() {
  const [form, setForm] = useState({
    fullName: '',
    street: '',
    city: '',
    state: '',
    pinCode: '',
    country: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/address', form)
      .then(() => {
        toast.success('Address added!');
        navigate('/addresses');
      })
      .catch(() => toast.error('Failed to add address'));
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-4">Add New Address</h2>
        <form onSubmit={handleSubmit} className="space-y-2">
          {["fullName", "street", "city", "state", "pinCode", "country"].map(field => (
            <input
              key={field}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={form[field]}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              required
            />
          ))}
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
        </form>
      </div>
    </div>
  );
}
