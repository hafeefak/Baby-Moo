import { createContext, useState, useEffect } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom";

export const Cartcontext = createContext()

export default function Cartprovider({ children }) {
    const [cart, setCart] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const id = localStorage.getItem("id");
    const navigate = useNavigate();

    useEffect(() => {

        const fetchProducts = async () => {
            if (!id) return;
            try {

                const response = await axios.get(`http://localhost:5001/users/${id}`)
                setCart(response.data.cart)
                setCartCount(response.data.cart.length)
            }
            catch (error) {
                console.log(error.message)
            }
        }
        fetchProducts()
    }, [id])


    const addToCart = async (product) => {
        if (!product || !product.id) {
            console.error("Invalid product:", product);
            return;
        }
        try {
            const response = await axios.get(`http://localhost:5001/products/${product.id}`)
            const productData = response.data

            const updatedCart = [...cart]
            const existingProduct = updatedCart.find((item) => item.id === product.id)
            if (existingProduct) {
                if (existingProduct.quantity + 1 > productData.quantity) {
                    toast.error("item out of stock")
                    return;
                }
                existingProduct.quantity += 1
                toast.success("increased the same quantity of item in you cart")

            }
            else {
                if (productData.quantity < 1) {
                    // toast.dismiss()
                    toast.error("item out of stock")
                    return;
                }
                updatedCart.push({ ...product, quantity: 1 })
                toast.dismiss()
                toast.success("item added to you cart", { autoClose: false})
                setCart(updatedCart)
                setCartCount(updatedCart.length)
            }
            if (id) {
                await axios.patch(`http://localhost:5001/users/${id}`, { cart: updatedCart })
            }
        }
        catch (error) {
            
            console.error("Failed to fetch product details");
        }
    }







    const updateCartItemQuantity = async (productId, newQuantity) => {


        const response = await axios.get(`http://localhost:5001/products/${productId}`);
        const productData = response.data;

        if (newQuantity < 1) {
            await removeFromCart(productId);
            toast.success("Item removed from your cart!");
            return;
        }


        if (newQuantity > productData.quantity) {
            toast.error(`Cannot update.Only ${productData.quantity} left in stock`);
            return;
        }
        const newCart = cart.map((item) =>
            item.id === productId ? { ...item, quantity: newQuantity } : item
        );
        setCart(newCart);

        try {
            if (id) {
                await axios.patch(`http://localhost:5001/users/${id}`, { cart: newCart });

            }
        } catch (error) {
            console.error('Error updating cart quantity:', error);
        }
    };


    const removeFromCart = async (productId) => {
        const updatedCart = cart.filter(item => item.id !== productId);
        setCart(updatedCart);
        setCartCount(updatedCart.length);

        if (id) {

            await axios.patch(`http://localhost:5001/users/${id}`, { cart: updatedCart });

        }



    };



    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };



    return (
        <Cartcontext.Provider value={{
            cart,
            setCart,
            cartCount,
            setCartCount,
            addToCart,
            getTotalPrice,
            updateCartItemQuantity,
            removeFromCart,
        }}>
            {children}
        </Cartcontext.Provider>

    )
}

