import { createContext, useState, useEffect } from "react";
import api from "../../api/axiosConfig";
import { toast } from "react-toastify";
import { getAuthToken, getUserData } from "../../Utils/Auth";

export const Cartcontext = createContext();

export default function Cartprovider({ children }) {
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const token = getAuthToken();
  const user = getUserData();
  const userId = user?.id;

  useEffect(() => {
    if (token && userId) fetchCart();
  }, [token, userId]);

  const fetchCart = async () => {
    try {
      const res = await api.get("/Cart/mycart");
      setCart(res.data.data.items);
      setTotalAmount(res.data.data.totalAmount);
    } catch (err) {
      console.error("Failed to fetch cart", err);
    }
  };

  const addToCart = async (product, quantity = 1) => {
    try {
      await api.post("/Cart/AddToCart", null, { params: { productId: product.productId, quantity } });
      toast.success(`${product.productName} added to cart`);
      fetchCart();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to cart");
    }
  };

  const increaseQuantity = async (productId, quantity = 1) => {
    try {
      await api.put("/Cart/increase", null, { params: { productId, quantity } });
      fetchCart();
    } catch (err) {
      console.error(err);
      toast.error("Failed to increase quantity");
    }
  };

  const decreaseQuantity = async (productId, quantity = 1) => {
    try {
      await api.put("/Cart/decrease", null, { params: { productId, quantity } });
      fetchCart();
    } catch (err) {
      console.error(err);
      toast.error("Failed to decrease quantity");
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      await api.delete("/Cart/remove", { params: { cartItemId } });
      toast.success("Item removed from cart");
      fetchCart();
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove item");
    }
  };

  const clearCart = async () => {
    try {
      await api.delete("/Cart/clear");
      toast.success("Cart cleared");
      fetchCart();
    } catch (err) {
      console.error(err);
      toast.error("Failed to clear cart");
    }
  };

  const getTotalPrice = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <Cartcontext.Provider
      value={{
        cart,
        totalAmount,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        getTotalPrice
      }}
    >
      {children}
    </Cartcontext.Provider>
  );
}
