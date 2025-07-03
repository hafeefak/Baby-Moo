import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Fetch } from '../Context/Fetchcontext';
import { Cartcontext } from '../Context/Cartcontext';
import { Wishlistcontext } from '../Context/Wishlistcontext';
import { MdClose, MdShoppingCart } from 'react-icons/md';
import { FaHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TrendingProducts = () => {
  const navigate = useNavigate();
  const { productList } = useContext(Fetch);
  const { addToCart } = useContext(Cartcontext);
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(Wishlistcontext);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const trendingProducts = productList.filter(p => p.trending).slice(0, 6) || productList.slice(0, 6);
  const fallbackImage = 'https://cdn.fcglcdn.com/brainbees/images/products/300x364/16195218a.webp';

  const handleAddToCart = (product, e) => {
    e?.stopPropagation();
    if (localStorage.getItem("id")) {
      addToCart(product);
      toast.success(`${product.name} added to cart`);
      if (selectedProduct) setSelectedProduct(null);
    } else {
      navigate("/userlogin");
    }
  };

  const toggleWishlist = (product, e) => {
    e.stopPropagation();
    if (localStorage.getItem("id")) {
      if (wishlist.find(item => item.id === product.id)) {
        removeFromWishlist(product.id);
        toast.info(`${product.name} removed from wishlist`);
      } else {
        addToWishlist(product);
        toast.success(`${product.name} added to wishlist`);
      }
    } else {
      navigate("/userlogin");
    }
  };

  const isInWishlist = (productId) => wishlist.some(item => item.id === productId);

  const openModal = (product, e) => {
    e?.stopPropagation();
    setSelectedProduct(product);
  };

  const closeModal = () => setSelectedProduct(null);

  return (
    <section className="py-16 bg-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-4">Trending This Week</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Parents are loving these products right now
          </p>
        </div>

        {trendingProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trendingProducts.map(product => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition group flex flex-col relative cursor-pointer"
              >
                {/* Heart icon */}
                <button
                  onClick={(e) => toggleWishlist(product, e)}
                  className="absolute top-3 right-3 text-pink-500 hover:text-pink-700 z-10"
                >
                  {isInWishlist(product.id) ? <FaHeart size={18} /> : <FaHeart size={18} className="opacity-40" />}
                </button>

                {/* Image + rating */}
                <div onClick={(e) => openModal(product, e)} className="relative flex-1 flex items-center justify-center p-4">
                  <img
                    src={product.url || fallbackImage}
                    alt={product.name}
                    className="max-h-48 object-contain w-full group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.target.src = fallbackImage; }}
                  />
                  {product.rating && (
                    <div className="absolute top-3 left-3 bg-pink-500 text-white px-2 py-1 rounded-md text-xs font-semibold flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927a1 1 0 011.902 0l1.179 3.631a1 1 0 00.95.69h3.813a1 1 0 01.592 1.806l-3.084 2.24a1 1 0 00-.364 1.118l1.179 3.631a1 1 0 01-1.538 1.118L10 13.347l-3.084 2.24a1 1 0 01-1.538-1.118l1.179-3.631a1 1 0 00-.364-1.118L3.109 9.054a1 1 0 01.592-1.806h3.813a1 1 0 00.95-.69l1.179-3.631z" />
                      </svg>
                      {product.rating}
                    </div>
                  )}
                </div>

                {/* Title + price + Add to Cart */}
                <div className="p-4 flex flex-col">
                  <h3
                    onClick={(e) => openModal(product, e)}
                    className="text-base font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-pink-600 transition-colors"
                  >
                    {product.name}
                  </h3>
                  <div className="flex justify-between items-center mt-auto">
                    <p className="text-pink-600 font-bold text-lg">
                      ₹{product.price?.toLocaleString() || 'N/A'}
                    </p>
                    <button
                      className={`px-3 py-2 rounded-md text-sm flex items-center ${
                        product.quantity === 0
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : 'bg-pink-500 hover:bg-rose-600 text-white'
                      }`}
                      onClick={(e) => handleAddToCart(product, e)}
                      disabled={product.quantity === 0}
                    >
                      <MdShoppingCart className="mr-1" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No trending products found</p>
          </div>
        )}

        {/* Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
            <div className="bg-white rounded-xl relative max-w-2xl w-full flex flex-col md:flex-row overflow-hidden">
              <MdClose
                className="absolute top-4 right-4 text-gray-600 cursor-pointer hover:text-gray-800"
                onClick={closeModal}
                size={24}
              />
              {/* Heart in modal */}
              <button
                onClick={(e) => toggleWishlist(selectedProduct, e)}
                className="absolute top-4 left-4 text-pink-500 hover:text-pink-700"
              >
                {isInWishlist(selectedProduct.id) ? <FaHeart size={22} /> : <FaHeart size={22} className="opacity-40" />}
              </button>

              {/* Image */}
              <div className="md:w-1/2 flex items-center justify-center bg-gray-50 p-4">
                <img
                  src={selectedProduct.url || fallbackImage}
                  alt={selectedProduct.name}
                  className="max-h-80 object-contain"
                  onError={(e) => { e.target.src = fallbackImage; }}
                />
              </div>

              {/* Details */}
              <div className="md:w-1/2 p-6 flex flex-col">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedProduct.name}</h2>
                <p className="text-gray-600 mb-6">{selectedProduct.description || 'No description available'}</p>
                <p className="text-sm text-gray-500 mb-1">Price</p>
                <p className="text-2xl font-bold text-pink-600 mb-6">
                  ₹{selectedProduct.price?.toLocaleString() || 'N/A'}
                </p>
                <button
                  onClick={(e) => handleAddToCart(selectedProduct, e)}
                  disabled={selectedProduct.quantity === 0}
                  className={`w-full flex items-center justify-center py-3 px-4 rounded-lg font-medium transition-colors ${
                    selectedProduct.quantity === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-rose-500 hover:bg-rose-600 text-white'
                  }`}
                >
                  <MdShoppingCart className="mr-2" size={20} />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="text-center mt-12">
          <button
            onClick={() => navigate("/products")}
            className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-all duration-300 inline-flex items-center"
          >
            View All Products
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;
