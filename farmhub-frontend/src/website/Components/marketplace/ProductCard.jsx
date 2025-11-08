import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/cartHook";

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Star, User, MapPin, TrendingUp } from "lucide-react";

const ProductCard = ({ product, animation }) => {
  const { addToCart } = useCart(); 
  return (
    <motion.div
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
      {...animation}
    >
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.discount > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded font-bold">
              -{product.discount}%
            </span>
          )}
          {product.isNew && (
            <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded font-bold">
              NEW
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-red-50 transition-colors group/heart">
          <Heart className="w-4 h-4 text-gray-600 group-hover/heart:text-red-500" />
        </button>

        {/* Out of Stock Overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-semibold">
              Out of Stock
            </span>
          </div>
        )}

        {/* Quick View */}

<div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
  <Link
    to={`/product/${product.id}`} 
    className="w-full py-2 bg-white text-gray-800 rounded-md text-sm font-medium hover:bg-gray-100 block text-center"
  >
    Quick View
  </Link>
</div>

      </div>

      {/* Product Info */}
      <div className="p-4">
        <span className="inline-block text-xs text-green-600 bg-green-50 px-2 py-1 rounded font-medium mb-2">
          {product.category}
        </span>

        <h3 className="text-base font-semibold text-gray-800 mb-1 line-clamp-2 min-h-[3rem]">
          {product.name}
        </h3>

        <div className="flex items-center gap-3 mb-3 text-xs">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-gray-700">{product.rating}</span>
            <span className="text-gray-500">({product.reviews})</span>
          </div>
          <span className="text-gray-400">•</span>
          <div className="flex items-center gap-1 text-gray-500">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{product.sold} sold</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-600 mb-3 pb-3 border-b">
          <User className="w-3.5 h-3.5" />
          <span>{product.seller}</span>
          <span className="text-gray-400">•</span>
          <MapPin className="w-3.5 h-3.5" />
          <span>{product.location}</span>
        </div>

        <div className="mb-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-green-600">
              RWF {product.price.toLocaleString()}
            </span>
            {product.discount > 0 && (
              <span className="text-sm text-gray-400 line-through">
                RWF {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          <span className="text-xs text-gray-500">{product.unit}</span>
        </div>

        <div className="flex gap-2">
      <button
        disabled={!product.inStock}
        onClick={() => addToCart(product)}
        className={`flex-1 py-2.5 rounded-lg font-medium transition-all text-sm mt-3 ${
          product.inStock
            ? "bg-green-600 text-white hover:bg-green-700 active:scale-95"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        <ShoppingCart className="w-4 h-4 inline mr-1" />
        Add to Cart
      </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
