import './App.css'
import "react-toastify/dist/ReactToastify.css";
import {Routes,Route} from "react-router-dom"
import Home from './assets/Pages/Home'
import UserLogin from './assets/Pages/UserLogin'
import Products from './assets/Pages/Products'
import Register from './assets/Pages/Register'
import FetchContext from './assets/Context/Fetchcontext'
import Cart from './assets/Pages/Cart'
import Cartprovider from './assets/Context/Cartcontext'
import { ToastContainer } from 'react-toastify'
import Orders from './assets/Pages/Orders'
import Orderlist from './assets/Pages/Orderlist'
import Categorylist from './assets/Pages/Categorylist'
import Search from './assets/Pages/Search'
import Body from './assets/Pages/Body'

function App() {
  return (
    <>
   
    <FetchContext>
      <Cartprovider>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/register" element={<Register/>} />
      <Route path="/userlogin" element={<UserLogin/>} />
      <Route path="/products" element={<Products/>} />
      <Route path="/cart" element={<Cart/>} />
      
      <Route path="/orders" element={<Orders/>} />
      <Route path="/orderlist" element={<Orderlist/>} />
      <Route path="/categorylist/:categoryName" element={<Categorylist/>}/>
      <Route path="/search" element={<Search/>}/>
      <Route path='/body' element ={<Body/>}/>
      

    </Routes>
    <ToastContainer  autoClose={false}/>
    </Cartprovider>
    </FetchContext>
    
      
    </>
  )
}

export default App
