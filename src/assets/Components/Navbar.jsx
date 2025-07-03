import React, { useState, useContext, useEffect } from 'react';
import { FaSearch, FaUser, FaShoppingBasket, FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Cartcontext } from '../Context/Cartcontext';

function Navbar() {
  const [search, setSearch] = useState('');
  const { cartCount } = useContext(Cartcontext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    <nav className="bg-[#F5BAC7] shadow-lg flex items-center justify-between px-4 md:px-6 py-2 fixed w-full z-50 top-0 left-0 ">
      {/* Mobile menu button */}
      <div className="lg:hidden">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white focus:outline-none"
        >
          {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Logo */}
      <div 
        className="flex items-center cursor-pointer"
        onClick={() => navigate('/')}
      >
        <h3 className="font-bold text-white text-xl md:text-2xl lg:text-3xl hover:text-pink-100 transition duration-300">
          Baby Moo
        </h3>
      </div>

      {/* Desktop Search - Smaller version */}
      <div className="hidden lg:flex items-center flex-1 max-w-xs mx-4">
        <div className="relative w-full">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search..."
            className="w-full px-3 py-1 text-sm text-white border border-white rounded-full outline-none bg-transparent placeholder-white focus:ring-1 focus:ring-white"
          />
          <button 
            onClick={handleSearchSubmit}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-pink-600 hover:text-pink-800"
          >
            <FaSearch size={14} />
          </button>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center space-x-4">
        <div 
          className="relative cursor-pointer text-white hover:text-pink-100 transition"
          onClick={() => navigate('/cart')}
        >
          <FaShoppingBasket size={18} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-white text-pink-600 text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </div>

        <div className="relative">
          <div
            className="flex items-center cursor-pointer hover:text-pink-100 transition"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="flex items-center bg-white bg-opacity-20 p-1.5 rounded-full">
              <FaUser className="text-gray-800" />
              {username && <span className="ml-2 text-gray-800">{username}</span>}
            </div>
          </div>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-xl w-48 z-50 overflow-hidden">
              <ul>
                {role === 'user' && (
                  <li
                    className="px-4 py-2 text-gray-700 hover:bg-pink-50 transition"
                    onClick={handleOrders}
                  >
                    My Orders
                  </li>
                )}

                {!username && (
                  <>
                    <li
                      className="px-4 py-2 text-gray-700 hover:bg-pink-50 transition"
                      onClick={handleLogIn}
                    >
                      User Login
                    </li>
                    <li
                      className="px-4 py-2 text-gray-700 hover:bg-pink-50 transition"
                      onClick={handleAdminLogin}
                    >
                      Admin Login
                    </li>
                  </>
                )}

                {username && (
                  <li
                    className="px-4 py-2 text-gray-700 hover:bg-pink-50 transition"
                    onClick={handleLogout}
                  >
                    Logout
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4 px-6">
          {/* Mobile Search */}
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder="Search products..."
                className="w-full px-4 py-2 border rounded-full outline-none text-sm"
              />
              <button 
                onClick={handleSearchSubmit}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pink-600"
              >
                <FaSearch size={14} />
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <ul className="space-y-3">
            <li 
              className="flex items-center text-gray-700 py-2"
              onClick={() => navigate('/cart')}
            >
              <FaShoppingBasket className="mr-2 text-pink-600" />
              Cart {cartCount > 0 && `(${cartCount})`}
            </li>

            {role === 'user' && (
              <li
                className="text-gray-700 py-2 hover:text-pink-600 transition"
                onClick={handleOrders}
              >
                My Orders
              </li>
            )}

            {!username && (
              <>
                <li
                  className="text-gray-700 py-2 hover:text-pink-600 transition"
                  onClick={handleLogIn}
                >
                  User Login
                </li>
                <li
                  className="text-gray-700 py-2 hover:text-pink-600 transition"
                  onClick={handleAdminLogin}
                >
                  Admin Login
                </li>
              </>
            )}

            {username && (
              <li
                className="text-gray-700 py-2 hover:text-pink-600 transition"
                onClick={handleLogout}
              >
                Logout
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;