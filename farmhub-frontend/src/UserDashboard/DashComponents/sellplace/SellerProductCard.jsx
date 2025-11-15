import React from "react";
import { Edit, Trash2, Eye } from "lucide-react";

const SellerProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition group">
      {/* Product Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
        />
        {/* Stock Badge */}
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
            product.stock > 10 
              ? "bg-green-100 text-green-700" 
              : "bg-red-100 text-red-700"
          }`}>
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-1 truncate">{product.name}</h3>
        <p className="text-green-600 font-bold text-lg mb-3">
          RWF {product.price.toLocaleString()}
        </p>

        {product.category && (
          <p className="text-xs text-gray-500 mb-3">
            Category: {product.category}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(product.id)}
            className="flex-1 flex items-center justify-center gap-1 bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition text-sm font-medium"
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="flex-1 flex items-center justify-center gap-1 bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-100 transition text-sm font-medium"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellerProductCard;