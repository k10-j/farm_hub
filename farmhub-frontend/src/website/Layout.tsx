// components/Layout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";   // your Navbar component
import Footer from "./Components/Footer";   // your Footer component

export default function Layout() {
  return (
    <div className="website-layout">
      <Navbar />
      <main>
        <Outlet />  
      </main>
      <Footer />
    </div>
  );
}
