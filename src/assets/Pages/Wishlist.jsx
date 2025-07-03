import React, { useContext } from "react";
import { Wishlistcontext } from "../Context/Wishlistcontext";
import { Cartcontext } from "../Context/Cartcontext";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import { MdShoppingCart, MdDeleteOutline, MdFavorite } from "react-icons/md";
import { FiArrowRight } from "react-icons/fi";
import { toast } from "react-toastify";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useContext(Wishlistcontext);
  const { addToCart } = useContext(Cartcontext);
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    if (localStorage.getItem("id")) {
      addToCart(product);
      toast.success(`${product.name} added to cart`);
    } else {
      navigate("/userlogin");
      toast.info("Please login to add items to cart");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 mt-20">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
          {wishlist.length > 0 && (
            <p className="text-gray-600 mt-2">
              {wishlist.length} {wishlist.length === 1 ? "item" : "items"}
            </p>
          )}
        </header>

        {wishlist.length === 0 ? (
          <section className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MdFavorite className="text-pink-500 text-3xl" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Your wishlist is empty
              </h2>
              <p className="text-gray-600 mb-6">
                Save your favorite items here to view them later
              </p>
              <button
                onClick={() => navigate("/")}
                className="bg-pink-500 hover:bg-pink-600 text-white font-medium px-6 py-3 rounded-full shadow-sm transition-all duration-200 inline-flex items-center transform hover:-translate-y-0.5"
              >
                Continue Shopping
                <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </section>
        ) : (
          <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlist.map((product) => (
                <article
                  key={product.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col group"
                >
                  <img
                    src={product.url}
                    alt={product.name}
                    className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-pink-600 font-bold text-lg mb-4">
                      ₹{product.price.toLocaleString()}
                    </p>
                    <div className="mt-auto grid grid-cols-2 gap-2">
  <button
    onClick={() => handleAddToCart(product)}
    className="flex items-center justify-center py-3 px-4 rounded-lg text-sm font-medium bg-pink-500 text-white hover:bg-pink-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 hover:shadow-md"
  >
    <MdShoppingCart className="mr-2" size={16} />
    Cart
  </button>
  <button
    onClick={() => removeFromWishlist(product.id)}
    className="flex items-center justify-center py-3 px-4 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-red-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
  >
    <MdDeleteOutline size={16} />
    Remove
  </button>
</div>

                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Wishlist;