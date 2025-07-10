import React, { useState, useContext } from 'react';
import { MdClose, MdShoppingCart } from 'react-icons/md';
import { FaRupeeSign, FaHeart } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Navbar from '../Components/Navbar';
import { Fetch } from '../Context/Fetchcontext';
import { Wishlistcontext } from '../Context/Wishlistcontext';
import api from "../../api/axiosConfig";  // ✅ secure axios instance
import 'react-toastify/dist/ReactToastify.css';

function Categorylist() {
  const { wishlist, addToWishlist, removeFromWishlist, isInWishlist } = useContext(Wishlistcontext);
  const { productList } = useContext(Fetch);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('auth_token');

  // Filter products by category
  const filteredProducts = productList?.filter(
    (item) => item.categoryName?.toLowerCase() === categoryName?.toLowerCase()
  ) || [];

  // ✅ Toggle wishlist using context methods
  const toggleWishlist = async (product, e) => {
    e.stopPropagation();
    if (!token) {
      navigate('/userlogin');
      return;
    }
    try {
      if (isInWishlist(product.productId)) {
        await removeFromWishlist(product.productId);
        toast.info(`${product.productName} removed from wishlist`);
      } else {
        await addToWishlist(product.productId);
        toast.success(`${product.productName} added to wishlist`);
      }
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

  // ✅ Add to cart using secure axios
  const handleAddToCart = async (product, e) => {
    e?.stopPropagation();
    if (!token) {
      navigate('/userlogin');
      return;
    }
    try {
      await api.post("/cart", {
        productId: product.productId,
        quantity: 1
      });
      toast.success(`${product.productName} added to cart`);
      setSelectedProduct(null);
    } catch (error) {
      console.error("Add to cart failed:", error);
      toast.error(error.response?.data?.message || 'Failed to add to cart');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <ToastContainer position="top-center" autoClose={2000} />

      <div className="container mx-auto px-4 py-8 mt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.productId}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 relative"
              onClick={() => setSelectedProduct(product)}
            >
              <button
                onClick={(e) => toggleWishlist(product, e)}
                className="absolute top-3 right-3 text-pink-500 hover:text-pink-700"
              >
                {isInWishlist(product.productId)
                  ? <FaHeart size={18} />
                  : <FaHeart size={18} className="opacity-40" />}
              </button>

              <img
                src={product.imageUrl}
                alt={product.productName}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
                  {product.productName}
                </h3>
                <p className="text-lg font-bold text-pink-600">
                  <FaRupeeSign className="inline mr-1" />
                  {Number(product.price ?? 0).toFixed(2)}
                </p>
              </div>

              <div className="px-4 pb-4">
                <button
                  onClick={(e) => handleAddToCart(product, e)}
                  disabled={product.quantity === 0}
                  className={`w-full flex items-center justify-center py-2 px-4 rounded-lg font-medium transition-colors ${
                    product.quantity === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-pink-500 text-white hover:bg-pink-600'
                  }`}
                >
                  <MdShoppingCart className="mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white rounded-xl relative max-w-md w-full flex flex-col">
            <MdClose
              className="absolute top-4 right-4 text-gray-600 cursor-pointer hover:text-gray-800"
              onClick={() => setSelectedProduct(null)}
              size={24}
            />

            <button
              onClick={(e) => toggleWishlist(selectedProduct, e)}
              className="absolute top-4 left-4 text-pink-500 hover:text-pink-700"
            >
              {isInWishlist(selectedProduct.productId)
                ? <FaHeart size={22} />
                : <FaHeart size={22} className="opacity-40" />}
            </button>

            <div className="p-6 flex-1 max-h-[80vh] overflow-y-auto">
              <div className="mb-4">
                <img
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.productName}
                  className="w-full h-60 object-cover rounded-lg"
                />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">{selectedProduct.productName}</h2>
              <p className="text-gray-600 mb-4">{selectedProduct.description || "No description available."}</p>
              <p className="text-sm font-bold text-gray-500">Price</p>
              <p className="text-xl font-bold text-pink-600 mb-6">
                <FaRupeeSign className="inline mr-1" />
                {Number(selectedProduct.price ?? 0).toFixed(2)}
              </p>
            </div>

            <div className="border-t border-gray-200 px-6 py-4">
              <button
                onClick={(e) => handleAddToCart(selectedProduct, e)}
                disabled={selectedProduct.quantity === 0}
                className={`w-full flex items-center justify-center py-3 px-4 rounded-lg font-medium transition-colors ${
                  selectedProduct.quantity === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-pink-500 text-white hover:bg-pink-600'
                }`}
              >
                <MdShoppingCart className="mr-2" size={20} />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Categorylist;
