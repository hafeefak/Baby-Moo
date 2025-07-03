import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const Wishlistcontext = createContext();

export default function Wishlistprovider({ children }) {
    const [wishlist, setWishlist] = useState([]);
    const id = localStorage.getItem("id");

    // Fetch wishlist when user logs in
    useEffect(() => {
        const fetchWishlist = async () => {
            if (!id) return;
            try {
                const response = await axios.get(`http://localhost:5001/users/${id}`);
                setWishlist(response.data.wishlist || []);
            } catch (error) {
                console.error("Error fetching wishlist:", error);
            }
        };
        fetchWishlist();
    }, [id]);

    // Add product to wishlist
    const addToWishlist = async (product) => {
        if (!product || !product.id) {
            console.error("Invalid product:", product);
            return;
        }
        const existing = wishlist.find(item => item.id === product.id);
        if (existing) {
            toast.info("Item already in wishlist");
            return;
        }
        const updatedWishlist = [...wishlist, product];
        setWishlist(updatedWishlist);
        toast.success("Item added to wishlist");

        if (id) {
            try {
                await axios.patch(`http://localhost:5001/users/${id}`, { wishlist: updatedWishlist });
            } catch (error) {
                console.error("Failed to update wishlist in DB:", error);
            }
        }
    };

    // Remove product from wishlist
    const removeFromWishlist = async (productId) => {
        const updatedWishlist = wishlist.filter(item => item.id !== productId);
        setWishlist(updatedWishlist);
        toast.success("Item removed from wishlist");

        if (id) {
            try {
                await axios.patch(`http://localhost:5001/users/${id}`, { wishlist: updatedWishlist });
            } catch (error) {
                console.error("Failed to update wishlist in DB:", error);
            }
        }
    };

    return (
        <Wishlistcontext.Provider value={{
            wishlist,
            setWishlist,
            addToWishlist,
            removeFromWishlist,
        }}>
            {children}
        </Wishlistcontext.Provider>
    );
}
