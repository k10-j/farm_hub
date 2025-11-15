import React from "react";
import { PlusCircle } from "lucide-react";
import SellerProductCard from "../../DashComponents/marketplace/SellerProductCard";

const myProducts = [
  { id: 1, name: "Carrots (1kg)", price: 900, image: "https://i.imgur.com/IKFPf5F.png" },
  { id: 2, name: "Irish Potatoes (10kg)", price: 5500, image: "https://i.imgur.com/4CIq9Vy.png" }
];

const MarketplaceSell = () => {
  return (
    <div>
      {/* Add New Product */}
      <button className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition mb-6">
        <PlusCircle className="w-5 h-5" />
        Add New Product
      </button>

      {/* My Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {myProducts.map((p) => (
          <SellerProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default MarketplaceSell;
