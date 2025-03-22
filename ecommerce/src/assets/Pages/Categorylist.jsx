import React, { useState, useContext } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from '../Components/Navbar';
import { Fetch } from '../Context/Fetchcontext';
import { Cartcontext } from '../Context/Cartcontext';

function Categorylist() {
    const { addToCart } = useContext(Cartcontext);
    const { productList } = useContext(Fetch);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { categoryName } = useParams();
    const navigate = useNavigate();

    const id = localStorage.getItem("id");

  
    const data = productList
        ? productList.filter(
            (item) =>
                item.category &&
                categoryName &&
                item.category.toLowerCase() === categoryName.toLowerCase()
        )
        : [];

  
    const openModal = (product) => {
        setSelectedProduct(product);
    };

    const closeModal = () => {
        setSelectedProduct(null);
    };

    return (
        <div>
            <Navbar />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-24 pb-10 pl-6 pr-6">
                {data.map((product) => (
                    <div
                        key={product.id}
                        className="border rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                        onClick={() => openModal(product)}
                    >
                        <img
                            src={product.url}
                            alt={product.name}
                            className="w-60 h-60 object-cover mx-auto mt-4 cursor-pointer rounded-t-lg"
                        />
                        <div className="text-center p-4">
                            <h1 className="mt-2 text-base sm:text-lg font-semibold">{product.name}</h1>
                            <p className="mt-1 text-gray-700">₹ {product.price}</p>
                            {product.quantity === 0 && (
                                <span className="text-red-500">Out of stock</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {selectedProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-4 sm:p-6 max-w-sm sm:max-w-md w-full relative flex flex-col items-center text-center">
                        <IoMdClose
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 cursor-pointer size-6"
                        />
                        <img
                            src={selectedProduct.url}
                            alt={selectedProduct.name}
                            className="w-40 h-40 object-cover rounded-lg mb-4"
                        />
                        <h1 className="text-xl sm:text-2xl font-bold mb-4">{selectedProduct.name}</h1>
                        <p className="text-gray-700 mb-2">₹ {selectedProduct.price}</p>
                        <p className="text-gray-600 mb-4">
                            {selectedProduct.description || "No description available."}
                        </p>
                        <p className="text-gray-600">Category: {selectedProduct.category}</p>
                        {selectedProduct.quantity === 0 && (
                            <span className="text-red-500">Out of stock</span>
                        )}
                        <button
                            className="bg-fuchsia-300 text-white px-4 sm:px-6 py-2 rounded-lg shadow-md hover:bg-green-600 text-sm sm:text-base mt-4"
                            onClick={() => {
                                if (id) {
                                    addToCart(selectedProduct);
                                    toast.success("Item added to cart");
                                    closeModal();
                                } else {
                                    navigate("/userlogin");
                                }
                            }}
                            disabled={selectedProduct.quantity === 0}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Categorylist;
