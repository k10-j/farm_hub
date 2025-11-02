import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#0B1120] text-gray-300 px-8 py-10 bottom-0">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 border-b border-gray-700 pb-8">
        {/* Logo and mission section*/}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <div className="bg-green-500 p-2 rounded-lg">
              <Leaf className="text-white" size={20} />
            </div>
            <h1 className="text-white font-semibold text-lg">FarmHub</h1>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Empowering Rwandan farmers through digital innovation
          </p>
        </div>

        {/* Features  division*/}
        <div>
          <h3 className="text-white font-semibold mb-3 text-sm uppercase">
            Features
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/pest-diagnosis" className="hover:text-green-400">Pest Diagnosis</Link></li>
            <li><Link to="/equipment-rental" className="hover:text-green-400">Equipment Rental</Link></li>
            <li><Link to="/marketplace" className="hover:text-green-400">Marketplace</Link></li>
          </ul>
        </div>

        {/* Support  division*/}
        <div>
          <h3 className="text-white font-semibold mb-3 text-sm uppercase">
            Support
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/help" className="hover:text-green-400">Help Center</Link></li>
            <li><Link to="/contact" className="hover:text-green-400">Contact Us</Link></li>
            <li><Link to="/faqs" className="hover:text-green-400">FAQs</Link></li>
          </ul>
        </div>

        {/* Legal division */}
        <div>
          <h3 className="text-white font-semibold mb-3 text-sm uppercase">
            Legal
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/privacy-policy" className="hover:text-green-400">Privacy Policy</Link></li>
            <li><Link to="/terms-of-service" className="hover:text-green-400">Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom  footer for copyright*/}
      <div className="mt-6 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} FarmHub. All rights reserved.
      </div>
    </footer>
  );
}
