import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useCart } from "../hooks/cartHook";
import AuthUtils from "../../utils/authUtils";
import CartDropdown from "./CartDropdown";
import { Leaf, ShoppingCart, Menu, X, Search, User, MapPin, ChevronDown } from "lucide-react";

const Navbar = () => {
  const { totalItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState("EN");
  const [searchFocused, setSearchFocused] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const cartRef = useRef(null);

  useEffect(() => {
    const user = AuthUtils.getCurrentUser();
    setCurrentUser(user);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setShowCartDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isLoggedIn = AuthUtils.isLoggedIn();
  const displayName = AuthUtils.getUserDisplayName(currentUser);

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "Pest Diagnosis", to: "/pest-diagnosis" },
    { name: "Equipment", to: "/equipement" },
    { name: "Marketplace", to: "/marketplace" },
    { name: "About Us", to: "/About" },
  ];



  return (
    <nav className="w-full fixed top-0 left-0 z-50 font-sanserif">
      {/* Top Bar - Slim promotional/info bar */}
      <div className="bg-gradient-to-r from-green-800 to-green-900 text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-2 flex justify-between items-center">
          {/* Left: Location */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <MapPin className="w-3 h-3" />
              <span className="hidden sm:inline">Deliver to Kigali</span>
            </div>
          </div>

          {/* Center: Promo message */}
          <div className="hidden md:block text-center">
            <span className="font-medium">🌱 Free delivery on orders above 50,000 RWF</span>
          </div>

          {/* Right: Language & Account */}
          <div className="flex items-center space-x-4">
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="bg-transparent border-none text-white text-xs focus:outline-none cursor-pointer"
            >
              <option value="EN" className="bg-green-900">English</option>
              <option value="RW" className="bg-green-900">Kinyarwanda</option>
            </select>
            <span className="hidden sm:inline">|</span>
            <div className="hidden sm:flex items-center space-x-3">
              {isLoggedIn ? (
                <>
                  <Link to="/dashboard" className="hover:text-green-300 transition">
                    Dashboard
                  </Link>
                  <span>|</span>
                  <button 
                    onClick={() => { AuthUtils.logout(); window.location.reload(); }}
                    className="hover:text-green-300 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/signinup"
                    state={{ mode: 'signin' }}
                    className="hover:text-green-300 transition"
                  >
                    Sign In
                  </Link>
                  <span>|</span>
                  <Link
                    to="/signinup"
                    state={{ mode: 'signup' }}
                    className="hover:text-green-300 transition"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center space-x-2 shrink-0">
              <div className="bg-linear-to-br from-green-600 to-green-700 p-2.5 rounded-xl shadow-lg">
                <Leaf className="text-white w-7 h-7" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold text-green-700 leading-none">FarmHub</h1>
                <span className="text-[10px] text-gray-500 leading-none">Smart Farming</span>
              </div>
            </div>

            {/* Search Bar - Prominent */}
            <div className="hidden md:flex flex-1 max-w-2xl">
              <div className={`relative w-full transition-all duration-200 ${searchFocused ? 'transform scale-[1.02]' : ''}`}>
                <input
                  type="text"
                  placeholder="Search for seeds, pesticides, equipment..."
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className={`w-full border-2 ${searchFocused ? 'border-green-500 shadow-lg' : 'border-gray-300'} rounded-lg py-2.5 px-5 pl-12 focus:outline-none transition-all text-sm`}
                />
                <Search className={`absolute top-1/2 left-4 -translate-y-1/2 w-5 h-5 transition-colors ${searchFocused ? 'text-green-600' : 'text-gray-400'}`} />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors">
                  Search
                </button>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-6">
              {/* Account */}
              <div className="hidden lg:flex items-center space-x-2 cursor-pointer group">
                <div className="bg-gray-100 p-2 rounded-full group-hover:bg-green-50 transition">
                  <User className="w-5 h-5 text-gray-700 group-hover:text-green-700 transition" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">Hello, {displayName}</span>
                  <span className="text-sm font-semibold text-gray-800 flex items-center">
                    {isLoggedIn ? 'Account' : 'Sign In'} <ChevronDown className="w-3 h-3 ml-1" />
                  </span>
                </div>
              </div>

              {/* Cart */}
              <div ref={cartRef} className="relative">
                <div 
                  className="cursor-pointer group"
                  onClick={() => setShowCartDropdown(!showCartDropdown)}
                >
                  <div className="bg-gray-100 p-2.5 rounded-full group-hover:bg-green-50 transition">
                    <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-green-700 transition" />
                    {totalItems > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold shadow-md">
                        {totalItems}
                      </span>
                    )}
                  </div>
                </div>
                <CartDropdown 
                  isOpen={showCartDropdown} 
                  onClose={() => setShowCartDropdown(false)} 
                />
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
              >
                {isOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full border-2 border-gray-300 rounded-lg py-2 px-4 pl-10 focus:outline-none focus:border-green-500 text-sm"
              />
              <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Navigation Links - Below main bar */}
        <div className="hidden md:block border-t border-gray-100 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <ul className="flex justify-center items-center space-x-8 text-gray-700 font-medium py-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `transition-colors text-sm pb-3 border-b-2 ${isActive
                        ? "text-green-700 font-semibold border-green-700"
                        : "hover:text-green-700 border-transparent"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>

          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform ${isOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="px-6 py-5 flex justify-between items-center border-b bg-gradient-to-r from-green-50 to-white">
          <div className="flex items-center space-x-2">
            <div className="bg-green-600 p-2 rounded-lg">
              <Leaf className="text-white w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-green-700">FarmHub Menu</h2>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-gray-100 rounded-lg transition">
            <X className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* User section */}
        <div className="px-6 py-4 bg-gray-50 border-b">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-3 rounded-full">
              <User className="w-6 h-6 text-green-700" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">Hello, {displayName}!</p>
              <div className="flex space-x-3 mt-1">
                {isLoggedIn ? (
                  <>
                    <Link to="/dashboard" className="text-xs text-green-700 font-medium hover:underline">Dashboard</Link>
                    <span className="text-xs text-gray-400">|</span>
                    <button 
                      onClick={() => { AuthUtils.logout(); window.location.reload(); }}
                      className="text-xs text-green-700 font-medium hover:underline"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/signinup" state={{ mode: 'signin' }} className="text-xs text-green-700 font-medium hover:underline">Sign In</Link>
                    <span className="text-xs text-gray-400">|</span>
                    <Link to="/signinup" state={{ mode: 'signup' }} className="text-xs text-green-700 font-medium hover:underline">Register</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <ul className="flex flex-col mt-2 px-4 text-gray-700">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg my-1 font-medium transition-colors ${isActive
                    ? "bg-green-50 text-green-700"
                    : "hover:bg-gray-50"
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>


        {/* Cart in mobile */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t bg-gray-50">
          <button 
            onClick={() => setShowCartDropdown(!showCartDropdown)}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>View Cart ({totalItems})</span>
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-32 md:h-36"></div>
    </nav>
  );
};

export default Navbar;