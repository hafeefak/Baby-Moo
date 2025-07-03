import React, { useState, useContext } from 'react';
import { MdClose, MdShoppingCart } from 'react-icons/md';
import { FaRupeeSign, FaHeart } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from '../Components/Navbar';
import { Fetch } from '../Context/Fetchcontext';
import { Cartcontext } from '../Context/Cartcontext';
import { Wishlistcontext } from '../Context/Wishlistcontext';

function Categorylist() {
  const { addToCart } = useContext(Cartcontext);
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(Wishlistcontext);
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

  const isInWishlist = (productId) => wishlist.some(item => item.id === productId);

  const toggleWishlist = (product, e) => {
    e.stopPropagation();
    if (id) {
      if (isInWishlist(product.id)) {
        removeFromWishlist(product.id);
        toast.info(`${product.name} removed from wishlist`);
      } else {
        addToWishlist(product);
        toast.success(`${product.name} added to wishlist`);
      }
    } else {
      navigate('/userlogin');
    }
  };

  const openModal = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = (product) => {
    if (id) {
      addToCart(product);
      toast.success(`${product.name} added to cart`);
    } else {
      navigate('/userlogin');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 relative"
            >
              {/* Heart icon on card */}
              <button
                onClick={(e) => toggleWishlist(product, e)}
                className="absolute top-3 right-3 text-pink-500 hover:text-pink-700"
              >
                {isInWishlist(product.id)
                  ? <FaHeart size={18} />
                  : <FaHeart size={18} className="opacity-40" />}
              </button>

              <div onClick={() => openModal(product)} className="cursor-pointer">
                <img
                  src={product.url}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">{product.name}</h3>
                  <p className="text-lg font-bold text-pink-600">
                    <FaRupeeSign className="inline mr-1" />
                    {Number(product.price).toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="px-4 pb-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
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

      {/* Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white rounded-xl relative max-w-md w-full flex flex-col">
            <MdClose
              className="absolute top-4 right-4 text-gray-600 cursor-pointer hover:text-gray-800"
              onClick={closeModal}
              size={24}
            />
            {/* Heart icon in modal */}
            <button
              onClick={(e) => toggleWishlist(selectedProduct, e)}
              className="absolute top-4 left-4 text-pink-500 hover:text-pink-700"
            >
              {isInWishlist(selectedProduct.id)
                ? <FaHeart size={22} />
                : <FaHeart size={22} className="opacity-40" />}
            </button>

            <div className="p-6 flex-1 max-h-[80vh]">
              <div className="mb-4">
                <img
                  src={selectedProduct.url}
                  alt={selectedProduct.name}
                  className="w-full h-60 object-cover rounded-lg"
                />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">{selectedProduct.name}</h2>
              <p className="text-gray-600 mb-4">{selectedProduct.description || "No description available."}</p>
              <p className="text-l font-bold text-gray-500">Price</p>
              <p className="text-xl font-bold text-pink-600 mb-6">
                <FaRupeeSign className="inline mr-1" />
                {Number(selectedProduct.price).toFixed(2)}
              </p>
            </div>

            <div className="border-t border-gray-200 px-6 py-4">
              <button
                onClick={() => handleAddToCart(selectedProduct)}
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
