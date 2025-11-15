import React from "react";
import { Edit, Trash } from "lucide-react";

const SellerProductCard = ({ product }) => {
  return (
    <div className="bg-white border shadow-sm rounded-xl overflow-hidden">

      <img src={product.image} alt="" className="h-40 w-full object-cover" />

      <div className="p-4">
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-green-700 font-bold mt-1">{product.price} RWF</p>

        <div className="flex justify-between mt-4">
          <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800">
            <Edit className="w-4" /> Edit
          </button>
          <button className="flex items-center gap-1 text-red-600 hover:text-red-800">
            <Trash className="w-4" /> Delete
          </button>
        </div>
      </div>

    </div>
  );
};

export default SellerProductCard;
