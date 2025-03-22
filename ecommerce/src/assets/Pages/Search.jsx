import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { Cartcontext } from '../Context/Cartcontext';
import { Fetch } from '../Context/Fetchcontext';

function SearchProduct() {
    const navigate = useNavigate();
    const location = useLocation();
    const [filtered, setFiltered] = useState([]);
    const { addToCart, selectedProduct, openModal, closeModal } = useContext(Cartcontext);
    const { productList } = useContext(Fetch);

    const result = location.state?.result || '';

    console.log(result)
    console.log("products",productList)

    useEffect(() => {
        const filteredProducts = productList.filter((product) =>
            product.name.toLowerCase().includes(result.toLowerCase()) ||
            product.category.toLowerCase().includes(result.toLowerCase())
        );
        setFiltered(filteredProducts);
    }, [result]);

    return (
        <div>
            <Navbar />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-20">
                {filtered.length > 0 ? (
                    filtered.map((product) => (
                        <div
                            key={product.id}
                            className="border rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                        >
                            <img
                                src={product.url}
                                alt={product.name}
                                onClick={() => openModal(product)}
                                className="w-60 h-60 object-cover mx-auto mt-4 cursor-pointer"
                            />
                            <div className="text-center p-4">
                                <h1 className="mt-2 text-lg font-semibold">{product.name}</h1>
                                <p className="mt-1 text-gray-700">₹ {product.price}</p>
                            </div>
                            <div className="flex justify-center mb-4">
                                <button
                                    className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600"
                                    onClick={() => addToCart(product)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-lg text-gray-500 p-20">No products found.</p>
                )}
            </div>

            {selectedProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full relative text-center">
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                        >
                            X
                        </button>
                        <img
                            src={selectedProduct.url}
                            alt={selectedProduct.name}
                            className="w-60 h-60 object-cover rounded-lg mb-4 mx-auto"
                        />
                        <h1 className="text-2xl font-bold mb-4">{selectedProduct.name}</h1>
                        <p className="text-gray-700 mb-2">₹ {selectedProduct.price}</p>
                        <p className="text-gray-600 mb-4">
                            {selectedProduct.description || "No description available."}
                        </p>
                        <button
                            className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600"
                            onClick={() => {
                                addToCart(selectedProduct);
                                closeModal();
                            }}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SearchProduct;
