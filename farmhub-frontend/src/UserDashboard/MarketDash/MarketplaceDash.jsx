import React, { useState } from "react";
import MarketplaceBuy from "./tabs/MarketplaceBuy";
import MarketplaceSell from "./tabs/MarketplaceSell";
import MarketplaceOrders from "./tabs/MarketplaceOrders";

const Marketplace = () => {
  const [activeTab, setActiveTab] = useState("buy");

  const tabs = [
    { label: "Buy", value: "buy" },
    { label: "Sell", value: "sell" },
    { label: "My Orders", value: "orders" },
  ];

  return (
    <div className="px-20 py-10  bg-gray-50 min-h-screen">

      <h1 className="text-3xl font-bold text-gray-800 mb-8">Marketplace</h1>

      {/* TAB BUTTONS */}
      <div className="flex gap-6 border-b mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`pb-3 text-lg font-medium transition ${
              activeTab === tab.value
                ? "text-green-700 border-b-4 border-green-700"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      {activeTab === "buy" && <MarketplaceBuy />}
      {activeTab === "sell" && <MarketplaceSell />}
      {activeTab === "orders" && <MarketplaceOrders />}
    </div>
  );
};

export default Marketplace;
