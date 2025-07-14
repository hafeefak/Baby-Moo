import { createContext, useState, useEffect } from "react";
import api from "../../api/axiosConfig";
import { toast } from "react-toastify";
import { getAuthToken } from "../../Utils/Auth";

export const Wishlistcontext = createContext();

export default function Wishlistprovider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const token = getAuthToken();

  useEffect(() => {
    if (token) fetchWishlist();
  }, [token]);

  const fetchWishlist = async () => {
    try {
      const res = await api.get("/wishlist");
      setWishlist(res.data.data || []);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  const addToWishlist = async (productId) => {
    try {
      await api.post(`/wishlist/${productId}`);
      toast.success("Product added to wishlist");
      fetchWishlist();
    } catch (error) {
      console.error("Failed to add to wishlist:", error);
      toast.error(error.response?.data?.message || "Failed to add to wishlist");
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await api.delete(`/wishlist/${productId}`);
      toast.success("Product removed from wishlist");
      fetchWishlist();
    } catch (error) {
      console.error("Failed to remove from wishlist:", error);
      toast.error(error.response?.data?.message || "Failed to remove from wishlist");
    }
  };

  const isInWishlist = (productId) =>
    wishlist.some(item => item.productId === productId);

  return (
    <Wishlistcontext.Provider value={{
      wishlist,
      addToWishlist,
      removeFromWishlist,
      isInWishlist
    }}>
      {children}
    </Wishlistcontext.Provider>
  );
}
