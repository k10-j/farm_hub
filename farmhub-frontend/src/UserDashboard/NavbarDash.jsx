import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Leaf, Menu, X, User, ChevronDown, ShoppingCart } from "lucide-react";
import AuthUtils from "../utils/authUtils";
import { useCart } from "../website/hooks/cartHook";
import CartDropdown from "../website/Components/CartDropdown";

const FarmerNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const user = AuthUtils.getCurrentUser();
    setCurrentUser(user);
  }, []);

  const dashboardLinks = [
    { name: "Dashboard", to: "/dashboard" },
    { name: "Marketplace", to: "/dashboard/marketplace" },
    { name: "Equipment Hub", to: "/dashboard/equipment" },
    { name: "Diagnosis", to: "/dashboard/diagnosis" },
    { name: "Orders", to: "/dashboard/orders" },
  ];

  return (
    <nav className="w-full fixed top-0 left-0 z-50 font-sanserif">

      {/* MAIN NAVBAR */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between gap-6">

            {/* LOGO */}
            <div className="flex items-center space-x-2 shrink-0 cursor-pointer">
              <div className="bg-green-700 p-2.5 rounded-xl shadow-lg">
                <Leaf className="text-white w-7 h-7" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold text-green-700 leading-none">FarmHub</h1>
                <span className="text-[10px] text-gray-500 leading-none">Farmer Dashboard</span>
              </div>
            </div>

            {/* DESKTOP NAV LINKS */}
            <div className="hidden md:flex items-center space-x-8">
              {dashboardLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.to}
                  className={({ isActive }) =>
                    `text-sm font-medium pb-3 border-b-2 transition-colors ${isActive
                      ? "text-green-700 border-green-700 font-semibold"
                      : "text-gray-700 hover:text-green-700 border-transparent"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            {/* CART & PROFILE */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Cart */}
              <div className="relative">
                <button
                  onMouseEnter={() => setIsCartOpen(true)}
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  className="relative p-2 hover:bg-gray-100 rounded-full transition group"
                >
                  <ShoppingCart className="w-5 h-5 text-gray-700 group-hover:text-green-700" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                      {totalItems}
                    </span>
                  )}
                </button>
                <div onMouseLeave={() => setIsCartOpen(false)}>
                  <CartDropdown isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
                </div>
              </div>

              {/* Profile */}
              <NavLink
                to="/dashboard/profile"
                className={({ isActive }) =>
                  `flex items-center space-x-2 cursor-pointer group ${isActive ? 'text-green-700' : ''
                  }`
                }
              >
                <div className="bg-gray-100 p-2 rounded-full group-hover:bg-green-50 transition">
                  <User className="w-5 h-5 text-gray-700 group-hover:text-green-700" />
                </div>
                <span className="text-sm font-semibold text-gray-800 flex items-center">
                  {AuthUtils.getUserDisplayName(currentUser)} <ChevronDown className="w-3 h-3 ml-1" />
                </span>
              </NavLink>
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
            >
              {isOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU DRAWER */}
        <div
          className={`md:hidden fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform ${isOpen ? "translate-x-0" : "translate-x-full"
            } transition-transform duration-300 ease-in-out z-50`}
        >
          <div className="px-6 py-5 flex justify-between items-center border-b bg-gradient-to-r from-green-50 to-white">
            <div className="flex items-center space-x-2">
              <div className="bg-green-700 p-2 rounded-lg">
                <Leaf className="text-white w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-green-700">Farmer Menu</h2>
            </div>

            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-gray-100 rounded-lg transition">
              <X className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          {/* MOBILE LINKS */}
          <ul className="flex flex-col mt-2 px-4 text-gray-700">
            {dashboardLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-4 py-3 rounded-lg my-1 font-medium transition-colors ${isActive ? "bg-green-50 text-green-700" : "hover:bg-gray-50"
                    }`
                  }
                >
                  <span>{link.name}</span>
                </NavLink>
              </li>
            ))}
            
            {/* Mobile Cart Link */}
            <li>
              <button
                onClick={() => {
                  setIsCartOpen(!isCartOpen);
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg my-1 font-medium transition-colors hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <ShoppingCart className="w-5 h-5" />
                  <span>Cart</span>
                </div>
                {totalItems > 0 && (
                  <span className="bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {totalItems}
                  </span>
                )}
              </button>
            </li>
          </ul>

          {/* PROFILE BUTTON */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t bg-gray-50">
            <NavLink
              to="/dashboard/profile"
              onClick={() => setIsOpen(false)}
              className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-medium flex items-center justify-center"
            >
              My Profile
            </NavLink>
          </div>
        </div>

        {/* MOBILE OVERLAY */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm md:hidden"
            onClick={() => setIsOpen(false)}
          ></div>
        )}
        
        {/* Mobile Cart Dropdown */}
        {isCartOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex items-start justify-center pt-20">
            <div className="bg-black/40 absolute inset-0" onClick={() => setIsCartOpen(false)}></div>
            <div className="relative w-full max-w-md mx-4">
              <CartDropdown isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            </div>
          </div>
        )}
      </div>

      {/* Spacer so content doesn’t hide under navbar */}
      <div className="h-24 md:h-28"></div>
    </nav>
  );
};

export default FarmerNavbar;
