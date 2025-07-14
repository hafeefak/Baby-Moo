import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Adminnavbar from './Adminnavbar';
import { FaUsers, FaShoppingCart, FaChartLine, FaBoxOpen } from "react-icons/fa";
import api from "../../api/axiosConfig";

function Adminhome() {
  const navigate = useNavigate();

  const [blockedUsersCount, setBlockedUsersCount] = useState(0);
  const [totalProductsSold, setTotalProductsSold] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [outOfStockCount, setOutOfStockCount] = useState(0);

  // ✅ Memoize fetch functions so they're stable
  const fetchBlockedUsers = useCallback(async () => {
    try {
      const res = await api.get("User/users");
      const users = res.data.data || [];
     const blocked = users.filter(u => u.blocked === true).length;
      setBlockedUsersCount(blocked);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  }, []);

  const fetchTotalProductsSold = useCallback(async () => {
    try {
      const res = await api.get("/orders/total-products");
      setTotalProductsSold(res.data.data || 0);
    } catch (error) {
      console.error("Failed to fetch total products sold:", error);
    }
  }, []);

  const fetchTotalRevenue = useCallback(async () => {
    try {
      const res = await api.get("/orders/total-revenue");
      setTotalRevenue(res.data.data || 0);
    } catch (error) {
      console.error("Failed to fetch total revenue:", error);
    }
  }, []);

  const fetchOutOfStock = useCallback(async () => {
    try {
      const res = await api.get("/Product");
      const products = res.data.data || [];
      const outOfStock = products.filter(p => Number(p.quantity) === 0).length;
      setOutOfStockCount(outOfStock);
    } catch (error) {
      console.error("Failed to fetch out-of-stock products:", error);
    }
  }, []);

  // ✅ useEffect with these stable functions in deps, still runs once
  useEffect(() => {
    fetchBlockedUsers();
    fetchTotalProductsSold();
    fetchTotalRevenue();
    fetchOutOfStock();
  }, [fetchBlockedUsers, fetchTotalProductsSold, fetchTotalRevenue, fetchOutOfStock]);

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
const DashboardCard = ({ icon, bg, title, value }) => {
  const borderClass = bg === 'blue' ? 'border-blue-500'
    : bg === 'green' ? 'border-green-500'
    : bg === 'purple' ? 'border-purple-500'
    : 'border-red-500';
  const bgClass = bg === 'blue' ? 'bg-blue-100'
    : bg === 'green' ? 'bg-green-100'
    : bg === 'purple' ? 'bg-purple-100'
    : 'bg-red-100';

  return (
    <div className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 flex items-start ${borderClass}`}>
      <div className={`${bgClass} p-3 rounded-lg mr-4`}>
        {icon}
      </div>
      <div>
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
      </div>
    </div>
  );
};



export default Adminhome;
