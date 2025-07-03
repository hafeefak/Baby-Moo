import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Adminnavbar from './Adminnavbar';
import { Fetch } from '../Context/Fetchcontext';

import { FaUsers, FaShoppingCart, FaChartLine, FaBoxOpen } from "react-icons/fa";

function Adminhome() {
  const navigate = useNavigate();
  const { productList } = useContext(Fetch);
  const[order,setorder]=useState([])
  
  const [userCount, setUserCount] = useState([]); 
  const [statusCount, setStatusCount] = useState(0); // Stores blocked users count
  const [outofstock, setOutOfStock] = useState(0); // Stores out-of-stock count

  // Fetch users and calculate blocked users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let response = await axios.get("http://localhost:5001/users");
        console.log(response);
        setUserCount(response.data);
        setStatusCount(response.data.filter((item) => item.status === false).length); // FIXED: Set count instead of array
      } catch (error) {
        console.log("Error fetching users:", error.message);
      }
    };
    fetchUsers();
  }, []);

  // Fetch products and calculate out-of-stock count
  useEffect(() => {
    const fetchOutOfStock = async () => {
      try {
        const response = await axios.get("http://localhost:5001/products");
        const productsStock = response.data;
        const outOfStock = productsStock.filter(product => product.quantity === 0).length;
        setOutOfStock(outOfStock);
      } catch (error) {
        console.error("Error fetching product stock:", error);
      }
    };
    fetchOutOfStock();
  }, []);
 

  const salePrice = userCount.reduce(
    (acc, cur) =>
      acc + (cur.order?.reduce((orderAcc, order) => orderAcc + (order.total || 0), 0) || 0),
    0
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
     
      <Adminnavbar />

     
      <div className="flex-1 p-6 md:p-8 overflow-auto">
      
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Overview of your store's performance</p>
        </div>

  
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
         
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 flex items-start border-l-4 border-blue-500">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <FaUsers className="text-blue-600 text-xl" />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Blocked Users</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{statusCount}</p>
            </div>
          </div>


          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 flex items-start border-l-4 border-green-500">
            <div className="bg-green-100 p-3 rounded-lg mr-4">
              <FaShoppingCart className="text-green-600 text-xl" />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Sales</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">30</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 flex items-start border-l-4 border-purple-500">
            <div className="bg-purple-100 p-3 rounded-lg mr-4">
              <FaChartLine className="text-purple-600 text-xl" />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Sales Amount</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">₹{salePrice}</p>
            </div>
          </div>

      
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 flex items-start border-l-4 border-red-500">
            <div className="bg-red-100 p-3 rounded-lg mr-4">
              <FaBoxOpen className="text-red-600 text-xl" />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Out of Stock</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{outofstock}</p>
            </div>
          </div>
        </div>

      
    </div>
  </div>
);
}

export default Adminhome;
