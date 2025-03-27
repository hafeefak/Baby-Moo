import React,{useContext} from 'react'
import {Cartcontext} from "../Context/Cartcontext"
import {Form,Formik,Field,ErrorMessage}  from "formik"
import { useNavigate } from 'react-router-dom'
import { ordervalidationschema } from '../Schema/Validationschema'
import { toast } from 'react-toastify'
import Navbar from '../Components/Navbar'
import axios from 'axios'
function Orders() {

    const navigate=useNavigate()
    const{cart,getTotalPrice,setCart,setCartCount}=useContext(Cartcontext)
    
    const initialValues={
        name:"",
        address:"",
    }
    const onSubmit = async (values) => {
        const id = localStorage.getItem('id');
        console.log("id")
        const order = {
            ...values,
            items: cart,
            total: getTotalPrice(),
        };
    if(window.confirm("are you sure  want to confirm the order?")){
    try{
        const response=await axios.get(`http://localhost:5001/users/${id}`)
        const oldorders=response.data.order || []

        await axios.patch(`http://localhost:5001/users/${id}`,{
            order:[...oldorders,order],
            cart:[]
        })
        
        setCartCount(0);
        setCart([]);
        toast.success('Order placed successfully');
     navigate('/'); 

      
    }
    catch(error){
        toast.error("failed to place order")
    }
}}
return (
    <div className="min-h-screen bg-gray-100">
      <Navbar/>
        <Formik 
            initialValues={initialValues}
            validationSchema={ordervalidationschema}
            onSubmit={onSubmit}>
        <Form className="max-w-2xl mx-auto  bg-white rounded-lg shadow-lg space-y-8 p-20 ">
        <h1 className="text-center text-2xl font-semibold mb-6">ORDER PAGE</h1>
            <div className="mb-4">
                <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">Name</label>
                <Field 
                    type="text" 
                    id="name" 
                    name="name" 
                    className=" w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your name"
                />
                <ErrorMessage name="name" component='div' className="text-red-500 mt-1 text-sm"></ErrorMessage>
            </div>

            
            <div className="mb-4">
                <label htmlFor="address" className="block text-lg font-medium text-gray-700 mb-2">Address</label>
                <Field
                    as='textarea' 
                    id="address" 
                    name="address" 
                    rows="4" 
                    className="flex justify-center w-full  p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your address"
                />
                <ErrorMessage name="address" component="div" className="text-red-500 text-sm "></ErrorMessage>
            </div>
            <div className='bg-gray-200 p-4 rounded-lg'>
              <label className="block text-blue-600 text-sm font-semibold mb-2">Cart Order Items:</label>
                <div className="space-y-4">
                  {cart.map((cartitem) => (
                    <div key={cartitem.id} className="flex justify-between items-center text-sm font-medium text-gray-700">
                      <p>{cartitem.name}</p>
                      <p>₹{cartitem.price}</p>
                      <p>x{cartitem.quantity}</p>
                      <p>₹{cartitem.price * cartitem.quantity}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 font-semibold text-xl text-gray-800">
                  <span>Total: ₹{getTotalPrice()}</span>
                </div>
            </div>
            <div>
              
            </div>
            

            <div className="flex justify-center mt-6">
                <button type='submit' className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" >Submit Order
                    
                </button>
            </div>
            </Form>
            </Formik>
            

        </div>
  )
}

export default Orders