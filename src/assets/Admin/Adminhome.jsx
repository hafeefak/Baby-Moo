import React from 'react'
import axios from 'axios';
import { useContext,useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Adminnavbar from './Adminnavbar'
import { Fetch } from '../Context/Fetchcontext';


function Adminhome() {
  const navigate=useNavigate()
  const {productList} =useContext(Fetch)
  const [userCount,setUserCount]=useState([])
  const[statusCount,setStatusCount]=useState([])
  const [outofstock,setoutofstock]=useState([])

useEffect(()=>{
  const Fetchusers=async()=>{
    try{
      let response=await axios.get("http://localhost:5001/users")
      console.log(response)
      setUserCount(response.data)
      setStatusCount(response.data.filter((item)=>item.status==false))
    }
      catch(error){
        console.log("error",error.message)
      }
     
  }
  Fetchusers();
},[])

useEffect(()=>{
    const Fetchoutofstock = async () => {
        try {
          const response = await axios.get("http://localhost:5001/products");
          const productsStock = response.data;
          const outOfStock = productsStock.filter(product => product.quantity === 0).length;
          setoutofstock(outOfStock);
        } catch (error) {
          console.error("Error fetching product stock:", error);
        }
      };
      Fetchoutofstock()
  
},[])


const salePrice=userCount.reduce((acc,cur)=>
    acc+cur.order.reduce((orderacc,order)=>orderacc+order.total,0 ),0
)


   
  return (
    <div className="flex bg-gray-100 min-h-screen">
        <Adminnavbar />

        <div className="flex-1 py-8 px-4 sm:px-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center sm:text-left lg:text-4xl">Admin Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white shadow-md rounded-lg p-4 text-center h-36 sm:h-40 flex flex-col justify-center">
                    <button onClick={()=>navigate("/adminuser")}>
                        <h2 className="text-lg font-semibold text-gray-700 sm:text-base lg:text-xl">Total Users</h2>
                        <p className="text-xl font-bold text-gray-900 sm:text-lg lg:text-2xl">{userCount.length}</p>
                    </button>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4 text-center h-36 sm:h-40 flex flex-col justify-center">
                    <button onClick={()=>navigate("/adminproduct")}>
                        <h2 className="text-lg font-semibold text-gray-700 sm:text-base lg:text-xl">Total Products</h2>
                        <p className="text-xl font-bold text-gray-900 sm:text-lg lg:text-2xl">{productList.length}</p>
                    </button>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4 text-center h-36 sm:h-40 flex flex-col justify-center">
                    <button onClick={()=>navigate("/adminuser")}>
                        <h2 className="text-lg font-semibold text-gray-700 sm:text-base lg:text-xl">Blocked</h2>
                        <p className="text-xl font-bold text-gray-900 sm:text-lg lg:text-2xl">{statusCount.length}</p>
                    </button>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4 text-center h-36 sm:h-40 flex flex-col justify-center">
                    <h2 className="text-lg font-semibold text-gray-700 sm:text-base lg:text-xl">Total Saleprice</h2>
                    <p className="text-xl font-bold text-gray-900 sm:text-lg lg:text-2xl">₹ {salePrice}</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4 text-center h-36 sm:h-40 flex flex-col justify-center">
                    <h2 className="text-lg font-semibold text-gray-700 sm:text-base lg:text-xl">outofstock products</h2>
                    <p className="text-xl font-bold text-gray-900 sm:text-lg lg:text-2xl">{outofstock}</p>
                </div>
                
            </div>
        </div>
    </div>
);
}


export default  Adminhome
