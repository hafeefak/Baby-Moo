import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Adminnavbar from './Adminnavbar';
import { FaUsers, FaShoppingCart, FaChartLine, FaBoxOpen } from "react-icons/fa";
import api from "../../api/axiosConfig"; // ✅ use secure axios instance

function Adminhome() {
  const navigate = useNavigate();

  const [blockedUsersCount, setBlockedUsersCount] = useState(0);
  const [totalProductsSold, setTotalProductsSold] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [outOfStockCount, setOutOfStockCount] = useState(0);

  useEffect(() => {
    fetchBlockedUsers();
    fetchTotalProductsSold();
    fetchTotalRevenue();
    fetchOutOfStock();
  }, []);

  // ✅ Fetch blocked users count
  const fetchBlockedUsers = async () => {
    try {
      const res = await api.get("/users"); // adjust path if needed
      const users = res.data.data || [];
      const blocked = users.filter(u => u.status === false).length;
      setBlockedUsersCount(blocked);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  // ✅ Fetch total products sold
  const fetchTotalProductsSold = async () => {
    try {
      const res = await api.get("/orders/total-products");
      setTotalProductsSold(res.data.data || 0);
    } catch (error) {
      console.error("Failed to fetch total products sold:", error);
    }
  };

  // ✅ Fetch total revenue
  const fetchTotalRevenue = async () => {
    try {
      const res = await api.get("/orders/total-revenue");
      setTotalRevenue(res.data.data || 0);
    } catch (error) {
      console.error("Failed to fetch total revenue:", error);
    }
  };

  // ✅ Fetch out of stock products count
  const fetchOutOfStock = async () => {
    try {
      const res = await api.get("/products"); 
      const products = res.data.data || [];
      const outOfStock = products.filter(p => p.quantity === 0).length;
      setOutOfStockCount(outOfStock);
    } catch (error) {
      console.error("Failed to fetch out-of-stock products:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Adminnavbar />
      <div className="flex-1 p-6 md:p-8 overflow-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Overview of your store's performance</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard
            icon={<FaUsers className="text-blue-600 text-xl" />}
            bg="blue"
            title="Blocked Users"
            value={blockedUsersCount}
          />
          <DashboardCard
            icon={<FaShoppingCart className="text-green-600 text-xl" />}
            bg="green"
            title="Total Products Sold"
            value={totalProductsSold}
          />
          <DashboardCard
            icon={<FaChartLine className="text-purple-600 text-xl" />}
            bg="purple"
            title="Sales Amount"
            value={`₹${totalRevenue}`}
          />
          <DashboardCard
            icon={<FaBoxOpen className="text-red-600 text-xl" />}
            bg="red"
            title="Out of Stock"
            value={outOfStockCount}
          />
        </div>
      </div>
    </div>
  );
}

// ✅ Small reusable card component
const DashboardCard = ({ icon, bg, title, value }) => (
  <div className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 flex items-start border-l-4 border-${bg}-500`}>
    <div className={`bg-${bg}-100 p-3 rounded-lg mr-4`}>
      {icon}
    </div>
    <div>
      <p className="text-gray-500 text-sm font-medium">{title}</p>
      <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
    </div>
  </div>
);

export default Adminhome;
