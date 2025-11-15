// components/Layout.jsx
import { Outlet } from "react-router-dom";
import NavbarDash from "./NavbarDash";   
import Footer from "../website/Components/Footer";

export default function Layout() {
  return (
    <div>
      <NavbarDash />
      <main className="py-20">
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
}
