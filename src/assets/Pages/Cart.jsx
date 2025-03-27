import React from 'react'
import {useContext} from "react"
import { useNavigate } from 'react-router-dom'
import { Cartcontext } from '../Context/Cartcontext'
import { toast } from 'react-toastify'
import Navbar from '../Components/Navbar'


function Cart() {
    
  const navigate=useNavigate()
  const{cart,getTotalPrice, updateCartItemQuantity,removeFromCart,}=useContext(Cartcontext)
  const userId=localStorage.getItem("id")

  if(cart.length==0){
    return(
      <div>
        <Navbar/>
        <div className="flex flex-col items-center justify-center h-full p-6 sm:p-10">
                    <h1 className="text-xl sm:text-2xl text-center mb-4 pt-16">Your cart is currently empty.</h1>
                    <button
                        onClick={() => navigate('/')}
                        className=" bg-pink-400 text-white px-6 py-2 rounded-xl text-sm sm:text-lg">
                        Shop Now
                    </button>
                </div>
            </div>
    
        );

    

  }

  return (
    <div>
        <Navbar/>
        <div className="p-4 sm:p-10">
            <h1 className="text-xl sm:text-3xl font-bold mb-6 text-center pt-16">Your Cart</h1>
            <div>
                {cart.map((item) => (
                    <div
                        key={item.id}
                        className="flex flex-col sm:grid sm:grid-cols-6 items-center gap-4 sm:gap-6 border-b pb-4 sm:pb-6 mb-6"
                    >
                        <img
                            src={item.url}
                            alt={item.name}
                            className="w-20 h-20 sm:w-32 sm:h-32 object-cover mx-auto"
                        />

                        <div className="text-center sm:col-span-2 sm:text-left">
                            <h2 className="text-lg sm:text-xl font-semibold">{item.name}</h2>
                            <p className="text-gray-600">₹ {item.price}</p>
                        </div>

                        <div className="flex items-center justify-center gap-2">
                            <button
                                className="px-3 py-1 bg-gray-200  text-black rounded"
                                onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                            >
                            -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                                className="px-3 py-1 bg-gray-200 text-black rounded"
                                onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                            >
                                +
                            </button>
                        </div>

                        <button
                            className="text-black hover:underline text-center"
                            onClick={() => removeFromCart(item.id)}
                        >
                            Remove
                        </button>

                        <p className="font-bold text-lg sm:text-xl text-center sm:text-right">
                            ₹ {item.price * item.quantity}
                        </p>
                    </div>
                ))}
            </div>
            <div className="mt-6 flex flex-col sm:flex-row justify-center sm:justify-between items-center">
                <button
                    onClick={() => {
                        if (userId) {
                            navigate('/orders');
                            console.log("gotot orders")
                        } else {
                            navigate('/userlogin');
                            toast.info("You need to login first.");
                        }
                    }}
                    className=" bg-pink-400 text-white px-6 py-2 rounded-xl text-sm sm:text-lg mb-4 sm:mb-0">
                    PLACE YOUR ORDER
                </button>
                <p className="font-bold text-lg sm:text-xl">
                    Total: ₹ {getTotalPrice()}
                </p>
            </div>
        </div>
    </div>
);
}

export default Cart;