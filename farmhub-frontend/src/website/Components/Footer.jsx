import React from "react";
import { NavLink } from "react-router-dom";
import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300 font-serif">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 pb-10 border-b border-gray-800">
          {/* Logo and About Section */}
          <div className="lg:col-span-2">
            <NavLink to="/" className="flex items-center space-x-2 mb-4 group">
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-2.5 rounded-xl shadow-lg group-hover:shadow-green-500/50 transition-shadow">
                <Leaf className="text-white" size={24} />
              </div>
              <div className="flex flex-col">
                <h1 className="text-white font-bold text-xl leading-none">FarmHub</h1>
                <span className="text-[10px] text-gray-400 leading-none">Smart Farming</span>
              </div>
            </NavLink>
            <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-sm">
              Empowering Rwandan farmers through digital innovation. Access smart farming tools, quality equipment, and a thriving marketplace.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <div className="bg-gray-800 p-2 rounded-lg">
                  <Phone className="w-4 h-4 text-green-500" />
                </div>
                <span>+250 788 123 456</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="bg-gray-800 p-2 rounded-lg">
                  <Mail className="w-4 h-4 text-green-500" />
                </div>
                <span>support@farmhub.rw</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="bg-gray-800 p-2 rounded-lg">
                  <MapPin className="w-4 h-4 text-green-500" />
                </div>
                <span>Kigali, Rwanda</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <NavLink 
                  to="/" 
                  className={({ isActive }) =>
                    `hover:text-green-400 transition-colors flex items-center group ${
                      isActive ? 'text-green-400' : ''
                    }`
                  }
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-green-400 transition-all mr-0 group-hover:mr-2"></span>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/About" 
                  className={({ isActive }) =>
                    `hover:text-green-400 transition-colors flex items-center group ${
                      isActive ? 'text-green-400' : ''
                    }`
                  }
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-green-400 transition-all mr-0 group-hover:mr-2"></span>
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/marketplace" 
                  className={({ isActive }) =>
                    `hover:text-green-400 transition-colors flex items-center group ${
                      isActive ? 'text-green-400' : ''
                    }`
                  }
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-green-400 transition-all mr-0 group-hover:mr-2"></span>
                  Marketplace
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/equipment" 
                  className={({ isActive }) =>
                    `hover:text-green-400 transition-colors flex items-center group ${
                      isActive ? 'text-green-400' : ''
                    }`
                  }
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-green-400 transition-all mr-0 group-hover:mr-2"></span>
                  Equipment
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/pest-diagnosis" 
                  className={({ isActive }) =>
                    `hover:text-green-400 transition-colors flex items-center group ${
                      isActive ? 'text-green-400' : ''
                    }`
                  }
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-green-400 transition-all mr-0 group-hover:mr-2"></span>
                  Pest Diagnosis
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Services
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <NavLink 
                  to="/pest-diagnosis" 
                  className={({ isActive }) =>
                    `hover:text-green-400 transition-colors flex items-center group ${
                      isActive ? 'text-green-400' : ''
                    }`
                  }
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-green-400 transition-all mr-0 group-hover:mr-2"></span>
                  Pest Diagnosis
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/equipment" 
                  className={({ isActive }) =>
                    `hover:text-green-400 transition-colors flex items-center group ${
                      isActive ? 'text-green-400' : ''
                    }`
                  }
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-green-400 transition-all mr-0 group-hover:mr-2"></span>
                  Equipment Rental
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/weather" 
                  className={({ isActive }) =>
                    `hover:text-green-400 transition-colors flex items-center group ${
                      isActive ? 'text-green-400' : ''
                    }`
                  }
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-green-400 transition-all mr-0 group-hover:mr-2"></span>
                  Weather Forecast
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/consulting" 
                  className={({ isActive }) =>
                    `hover:text-green-400 transition-colors flex items-center group ${
                      isActive ? 'text-green-400' : ''
                    }`
                  }
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-green-400 transition-all mr-0 group-hover:mr-2"></span>
                  Farm Consulting
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/training" 
                  className={({ isActive }) =>
                    `hover:text-green-400 transition-colors flex items-center group ${
                      isActive ? 'text-green-400' : ''
                    }`
                  }
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-green-400 transition-all mr-0 group-hover:mr-2"></span>
                  Training Programs
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Support
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <NavLink 
                  to="/help" 
                  className={({ isActive }) =>
                    `hover:text-green-400 transition-colors flex items-center group ${
                      isActive ? 'text-green-400' : ''
                    }`
                  }
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-green-400 transition-all mr-0 group-hover:mr-2"></span>
                  Help Center
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/contact" 
                  className={({ isActive }) =>
                    `hover:text-green-400 transition-colors flex items-center group ${
                      isActive ? 'text-green-400' : ''
                    }`
                  }
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-green-400 transition-all mr-0 group-hover:mr-2"></span>
                  Contact Us
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/faqs" 
                  className={({ isActive }) =>
                    `hover:text-green-400 transition-colors flex items-center group ${
                      isActive ? 'text-green-400' : ''
                    }`
                  }
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-green-400 transition-all mr-0 group-hover:mr-2"></span>
                  FAQs
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/shipping" 
                  className={({ isActive }) =>
                    `hover:text-green-400 transition-colors flex items-center group ${
                      isActive ? 'text-green-400' : ''
                    }`
                  }
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-green-400 transition-all mr-0 group-hover:mr-2"></span>
                  Shipping Info
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/returns" 
                  className={({ isActive }) =>
                    `hover:text-green-400 transition-colors flex items-center group ${
                      isActive ? 'text-green-400' : ''
                    }`
                  }
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-green-400 transition-all mr-0 group-hover:mr-2"></span>
                  Returns & Refunds
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-8 border-b border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-white font-semibold text-lg mb-2">
                Stay Updated with FarmHub
              </h3>
              <p className="text-sm text-gray-400">
                Subscribe to get farming tips, product updates, and exclusive offers.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors text-sm"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-green-500/50 text-sm whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <div className="text-sm text-gray-500 text-center md:text-left">
            <p>&copy; {new Date().getFullYear()} FarmHub. All rights reserved.</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2">
              <NavLink 
                to="/privacy-policy" 
                className={({ isActive }) =>
                  `hover:text-green-400 transition-colors ${
                    isActive ? 'text-green-400' : ''
                  }`
                }
              >
                Privacy Policy
              </NavLink>
              <span className="text-gray-700">•</span>
              <NavLink 
                to="/terms-of-service" 
                className={({ isActive }) =>
                  `hover:text-green-400 transition-colors ${
                    isActive ? 'text-green-400' : ''
                  }`
                }
              >
                Terms of Service
              </NavLink>
              <span className="text-gray-700">•</span>
              <NavLink 
                to="/cookie-policy" 
                className={({ isActive }) =>
                  `hover:text-green-400 transition-colors ${
                    isActive ? 'text-green-400' : ''
                  }`
                }
              >
                Cookie Policy
              </NavLink>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500 mr-2">Follow us:</span>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 p-2.5 rounded-full hover:bg-green-600 transition-colors group"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 p-2.5 rounded-full hover:bg-green-600 transition-colors group"
              aria-label="Twitter"
            >
              <Twitter className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 p-2.5 rounded-full hover:bg-green-600 transition-colors group"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 p-2.5 rounded-full hover:bg-green-600 transition-colors group"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 p-2.5 rounded-full hover:bg-green-600 transition-colors group"
              aria-label="YouTube"
            >
              <Youtube className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
            </a>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-gray-950 border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          <div className="flex flex-wrap justify-center items-center gap-8 text-xs text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                <span className="text-green-500 font-bold text-sm">✓</span>
              </div>
              <span>Secure Payments</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                <span className="text-green-500 font-bold text-sm">✓</span>
              </div>
              <span>Quality Guaranteed</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                <span className="text-green-500 font-bold text-sm">✓</span>
              </div>
              <span>Fast Delivery</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                <span className="text-green-500 font-bold text-sm">✓</span>
              </div>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}