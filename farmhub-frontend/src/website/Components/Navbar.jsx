import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Leaf, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-sm fixed top-0 left-0 z-50 font-serif">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="bg-green-600 p-2 rounded-lg">
            <Leaf className="text-white w-5 h-5" />
          </div>
          <h1 className="text-lg font-semibold text-green-700">FarmHub</h1>
        </div>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
          {[
            { name: "Home", to: "/" },
            { name: "Pest Diagnosis", to: "/pest-diagnosis" },
            { name: "Equipment", to: "/equipment" },
            { name: "Marketplace", to: "/marketplace" },
            { name: "About", to: "/About" },
          ].map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  isActive
                    ? "text-green-700 bg-green-50 px-3 py-1 rounded-md"
                    : "hover:text-green-700 transition-colors"
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right Section (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          <NavLink
            to="/signin"
            className={({ isActive }) =>
              isActive
                ? "text-green-700 font-medium"
                : "text-gray-700 hover:text-green-700 font-medium"
            }
          >
            Sign In
          </NavLink>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md">
            Get Started
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col space-y-2 px-6 py-4 text-gray-700 font-medium">
            {[
              { name: "Home", to: "/" },
              { name: "Pest Diagnosis", to: "/pest-diagnosis" },
              { name: "Equipment", to: "/equipment" },
              { name: "Marketplace", to: "/marketplace" },
            { name: "About", to: "/About" },
              { name: "Sign In", to: "/signin" },
            ].map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.to}
                  onClick={() => setIsOpen(false)} // Close menu on click
                  className={({ isActive }) =>
                    isActive
                      ? "text-green-700 bg-green-50 px-3 py-1 rounded-md block"
                      : "hover:text-green-700 transition-colors block"
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
            <li>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md mt-2">
                Get Started
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
