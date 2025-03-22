

import React, { useState, useContext } from 'react';
import { MdClose } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa"; 

import "react-toastify/dist/ReactToastify.css";


import { useNavigate } from 'react-router-dom';
import { Fetch } from '../Context/Fetchcontext';
import Navbar from '../Components/Navbar'
import { toast } from 'react-toastify';
import { Cartcontext } from '../Context/Cartcontext';
  

const Products = () => {
   
    const { productList} = useContext(Fetch);
    const {addToCart}=useContext(Cartcontext)
    console.log(productList)
    const [selectedProduct, setSelectedProduct] = useState(null); 
  

    const navigate = useNavigate();

    const openModal = (product) => {
        setSelectedProduct(product);
    };

    const closeModal = () => {
        setSelectedProduct(null);
    };


    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-white  p-4">
          <Navbar/>
            {productList.map((product) => (
                <div 
                    key={product.id} 
                    className="border  rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                >
                    <div onClick={() => openModal(product)} className="cursor-pointer">
                        <img
                            src={product.url}
                            alt={product.name}
                            className="w-full h-auto rounded-t object-cover"
                        />
                        <p className="text-gray-600 px-3 py-1">Name: {product.name}</p>
                        <p className="text-gray-600 px-3 py-1">Price: ${Number(product.price).toFixed(2)}</p>
                        {product.quantity === 0 && (
                            <span className='text-red-500 py-1 px-3'>Out of stock</span>
                        )}
                    </div>
                
                </div>
            ))}

            {selectedProduct && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 relative max-w-lg w-full">
                        <MdClose 
                            className="absolute top-2 right-2 text-gray-600 cursor-pointer"
                            onClick={closeModal} 
                        />
                        <h2 className="text-xl font-bold mb-2">{selectedProduct.name}</h2>
                        <img 
                            src={selectedProduct.url} 
                            alt={selectedProduct.name} 
                            className="w-full h-60 rounded object-cover mb-2"
                        />
                        <p className="text-gray-600">Description: {selectedProduct.description}</p>
                        <p className="text-gray-600">Price: ${Number(selectedProduct.price).toFixed(2)}</p>
                        {selectedProduct.quantity === 0 && (
                            <span className='text-red-500'>Out of stock</span>
                        )}
                        <p className="text-gray-600">Category: {selectedProduct.category}</p>
                        <div className="flex w-20 text-black bg-pink-400 pt-1 pb-3 px-3 justify-between items-center mt-4 ">
                            <button  
                             onClick={() => {
                                if (localStorage.getItem("id")) {
                                    addToCart(selectedProduct); 
                                     
                                    console.log("item added to cart")
                                    toast.success("item added to cart ",)           
                                } else {
                                    navigate("/userlogin");     
                                }
                            }}
                            disabled={selectedProduct.quantity === 0}
                        >
                                <span className="transition-transform duration-200  text-black font-bold">Cart</span>
                            </button> 
                         </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Products;
