import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition">
      <img
        src={product.image}
        alt={product.name}
        className="h-40 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="text-gray-800 font-semibold">{product.name}</h3>
        <p className="text-green-700 font-bold mt-1">{product.price} RWF</p>
        <p className="text-gray-500 text-sm mt-1">{product.category}</p>
        <button className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
