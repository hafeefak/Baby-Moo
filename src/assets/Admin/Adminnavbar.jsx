import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearAuthData } from '../../Utils/Auth';  // ✅ import your util

function Adminnavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuthData();                 // ✅ clear all stored auth info
    toast.success('Logged out successfully');
    navigate('/adminlogin');
  };

  return (
    <div className="flex h-screen sticky top-0">
      <nav className="flex-none w-64 bg-[#F8C8DC] text-black flex flex-col gap-6">
        <div className="text-center mt-4">
          <h1 className="text-4xl text-[#FF69B4] font-bold">Baby Moo</h1>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => navigate('/adminhome')}
            className="text-lg font-semibold hover:text-[#FF69B4] transition duration-200 text-center"
          >
            DASHBOARD
          </button>
          <button
            onClick={() => navigate('/adminuser')}
            className="text-lg font-semibold hover:text-[#FF69B4] transition duration-200 text-center"
          >
            USER
          </button>
          <button
            onClick={() => navigate('/adminproduct')}
            className="text-lg font-semibold hover:text-[#FF69B4] transition duration-200 text-center"
          >
            PRODUCT
          </button>
        </div>

        <div className="p-6 mt-auto">
          <button
            onClick={handleLogout}
            className="w-full bg-blue-300 hover:bg-[#FF69B4] text-white py-3 rounded-lg font-bold transition duration-300"
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Adminnavbar;
