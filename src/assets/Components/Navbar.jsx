import React, { useState, useContext, useEffect } from 'react';
import { FaSearch, FaUser, FaShoppingBasket } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Cartcontext } from '../Context/Cartcontext';

function Navbar() {
  const [search, setSearch] = useState('');
  const { cartCount } = useContext(Cartcontext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole); 
  }, []);

  const username = localStorage.getItem('name');

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = () => {
    navigate('/search', { state: { result: search } });
  };

  const handleOrders = () => {
    navigate('/orderlist');
  };

  

  const handleLogIn = () => {
    navigate('/userlogin');
  };

  const handleAdminLogin = () => {
    navigate('/adminlogin');
  };

  const handleLogout = () => {
    localStorage.clear(); 
    navigate('/userlogin');
  };

  return (
    <nav className="bg-[#F5BAC7] shadow-md  flex items-center justify-between px-6 lg:px-8 fixed w-full z-50 top-0 left-0">
      
      <h3
        className="font-bold text-white text-2xl lg:text-3xl cursor-pointer hover:text-pink-700 transition duration-300"
        onClick={() => navigate('/')}
      >
        Baby Moo
      </h3>


      <div className="relative flex items-center border rounded-full px-2 py-1 bg-gray-100 h-7">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search..."
          className="outline-none bg-transparent px-2 py-1 flex-grow text-gray-700"
        />
        <FaSearch
          onClick={handleSearchSubmit}
          className="text-gray-500 cursor-pointer hover:text-gray-700 transition duration-300"
        />
      </div>

      
      <div className="relative cursor-pointer" onClick={() => navigate('/cart')}>
        <FaShoppingBasket />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-amber-300 text-white text-sm w-3 h-3 flex items-center justify-center rounded-full">
            {cartCount}
          </span>
        )}
      </div>

      
      <div className="relative">
        <div
          className="flex items-center cursor-pointer hover:text-indigo-600 transition duration-300"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <div className="flex items-center bg-gray-200 p-2 rounded-full h-7">
            <FaUser className="text-xl" />
            {username && <span className="ml-2 text-lg text-gray-700">{username}</span>}
          </div>
        </div>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg w-40 z-50">
            <ul>
             
              {role === 'user' && (
                <li
                  className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-200"
                  onClick={handleOrders}
                >
                  Orders
                </li>
              )}

              

            
              {!username && (
                <>
                  <li
                    className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-200"
                    onClick={handleLogIn}
                  >
                    User Login
                  </li>
                  <li
                    className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-200"
                    onClick={handleAdminLogin}
                  >
                    Admin Login
                  </li>
                </>
              )}

            
              {username && (
                <li
                  className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-200"
                  onClick={handleLogout}
                >
                  Logout
                </li>
               
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
