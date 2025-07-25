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
import Adminprovider from './assets/Context/Admincontxt'
import AdminLogin from './assets/Admin/Adminlogin';
import Adminhome from './assets/Admin/Adminhome';
import Adminprotect from './assets/Admin/Adminprotected';
import Adminuser from './assets/Admin/Adminuser';
import Adminproducts from './assets/Admin/Adminproducts';
import Wishlistprovider from './assets/Context/Wishlistcontext';
import Wishlist from './assets/Pages/Wishlist';

import AddressForm from './assets/Pages/AddAddressForm';
import AddressList from './assets/Pages/AddressList';
import { AuthProvider } from './assets/Context/Authcontext';
import PaymentFailed from './assets/Pages/Payment/PaymentFailed';
import OrderPlaced from './assets/Pages/Payment/OrderPlaced';
import PaypalReturnHandler from './assets/Pages/Payment/PaypalReturnHandler';


function App() {
  return (
    <>
     <AuthProvider>
    <FetchContext>
      <Cartprovider>
        <Wishlistprovider>
     <Adminprovider>
  
   <Routes>
  <Route path="/" element={<Home/>}/>
  <Route path="/register" element={<Register/>} />
  <Route path="/userlogin" element={<UserLogin/>} />
  <Route path="/products" element={<Products/>} />
  <Route path="/cart" element={<Cart/>} />
  <Route path="/wishlist" element={<Wishlist/>}/>
  <Route path="/orders" element={<Orders />} />
  <Route path="/orderlist" element={<Orderlist />} />
  <Route path="/add-address" element={<AddressForm />} />
  <Route path="/addresses" element={<AddressList />} />
  <Route path="/categorylist/:categoryName" element={<Categorylist/>}/>
  <Route path="/search" element={<Search/>}/>
  <Route path='/body' element ={<Body/>}/>
  <Route path="/adminlogin" element={<AdminLogin/>} />

  {/* ✅ make these public */}
  <Route path="/paypal-return" element={<PaypalReturnHandler />} />
  <Route path="/orderplaced" element={<OrderPlaced />} />
  <Route path="/paymentfailed" element={<PaymentFailed />} />

  {/* ✅ keep admin-only routes inside Adminprotect */}
  <Route element={<Adminprotect />}>
    <Route path="/adminhome" element={<Adminhome />} />
    <Route path="/adminuser" element={<Adminuser />} />
    <Route path="/adminproduct" element={<Adminproducts />} />
  </Route>
</Routes>

  
    </Adminprovider>
     </Wishlistprovider>
    </Cartprovider>
   
    </FetchContext>
    </AuthProvider>
   
  <ToastContainer
  position="top-right"
  autoClose={3000}   
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
/>
      
    </>
  )
}

export default App
