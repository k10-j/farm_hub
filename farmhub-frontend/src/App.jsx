import { BrowserRouter, Routes, Route } from "react-router-dom";
import CartProvider from './website/context/CartProvider';

// Public pages
import WebsiteLayout from "./website/Layout";
import Home from "./website/pages/Home";
import Equipment from "./website/pages/Equipement";
import About from "./website/pages/About";
import PestDiagnosis from "./website/pages/PestDiagnosis";
import Marketplace from "./website/pages/MarketPlace";
import ProductPage from "./website/pages/product/[id]";
import SignInUp from "./website/pages/SignInUp";


// Dashboard pages
import DashboardLayout from "./UserDashboard/DashLayout";
import Overview from "./UserDashboard/Overview";
import MarketplaceDash from "./UserDashboard/MarketDash/MarketplaceDash";
import PestDiagnosisDash from "./UserDashboard/Diagnosis/pestDash";
import EquipementDash from "./UserDashboard/Equipement/EquipementDash";
import BookEquipment from "./UserDashboard/Equipement/tabs/BookEquipement";
import ShareEquipment from "./UserDashboard/Equipement/tabs/Myequipement";
import OrdersEquipment from "./UserDashboard/Equipement/tabs/OrderedEquipment";
import EquipmentDetail from "./UserDashboard/Equipement/pages/EquipmentDetail";
import AddEquipment from "./UserDashboard/Equipement/pages/AddEquipment";
import EditEquipment from "./UserDashboard/Equipement/pages/EditEquipment";
import EquipmentPaymentPage from "./UserDashboard/Equipement/pages/EquipmentPaymentPage";
import EquipmentConfirmationPage from "./UserDashboard/Equipement/pages/EquipmentConfirmationPage";
import AllOrders from "./UserDashboard/Orders/AllOrders";
import ProfilePage from "./UserDashboard/Profile/ProfilePage";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>

          {/* PUBLIC WEBSITE ROUTES */}
          <Route element={<WebsiteLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/equipement" element={<Equipment />} />
            <Route path="/about" element={<About />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/pest-diagnosis" element={<PestDiagnosis />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/signinup" element={<SignInUp />} />
          </Route>

          {/* DASHBOARD ROUTES */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Overview />} />
            <Route path="/dashboard/marketplace" element={<MarketplaceDash />} />
            <Route path="/dashboard/diagnosis" element={<PestDiagnosisDash />} />
            <Route path="equipment" element={<EquipementDash />}>
              <Route index element={<BookEquipment />} />
              <Route path="book" element={<BookEquipment />} />
              <Route path="share" element={<ShareEquipment />} />
              <Route path="orders" element={<OrdersEquipment />} />
            </Route>
            <Route path="equipment/add" element={<AddEquipment />} />
            <Route path="equipment/edit/:id" element={<EditEquipment />} />
            <Route path="equipment/detail/:id" element={<EquipmentDetail />} />
            <Route path="equipment/payment" element={<EquipmentPaymentPage />} />
            <Route path="equipment/confirmation" element={<EquipmentConfirmationPage />} />
            <Route path="orders" element={<AllOrders />} />
            <Route path="profile" element={<ProfilePage />} />
            {/* <Route path="/product/:id" element={<ProductPage />} /> */}

            {/* you can add more dashboard pages here */}
          </Route>

        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
