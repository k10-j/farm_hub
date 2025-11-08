import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Search, Filter, MapPin, Star, Plus, User, Grid, List, ChevronDown, TrendingUp } from "lucide-react";

// Animation configuration
const animations = {
  fadeUp: {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: 0.5, ease: "easeOut" }
  },
  staggerContainer: {
    initial: {},
    whileInView: {},
    viewport: { once: true, amount: 0.05 },
    transition: { staggerChildren: 0.08 }
  }
};

const Marketplace = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("popular");
  const [priceRange, setPriceRange] = useState([0, 5000]);

  const categories = [
    { name: "All Categories", count: 156 },
    { name: "Vegetables", count: 45 },
    { name: "Fruits", count: 32 },
    { name: "Grains", count: 28 },
    { name: "Equipment", count: 18 },
    { name: "Seeds", count: 22 },
    { name: "Livestock", count: 11 }
  ];

  const products = [
    {
      id: 1,
      name: "Fresh Maize",
      category: "Grains",
      price: 300,
      originalPrice: 350,
      unit: "per Sack",
      image: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&q=80&w=600",
      seller: "John's Farm",
      location: "Kigali",
      rating: 4.8,
      reviews: 124,
      sold: 89,
      inStock: true,
      isNew: false,
      discount: 14
    },
    {
      id: 2,
      name: "Organic Tomatoes",
      category: "Vegetables",
      price: 500,
      originalPrice: 500,
      unit: "per Kilogram",
      image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&q=80&w=600",
      seller: "Green Valley Co.",
      location: "Musanze",
      rating: 4.9,
      reviews: 218,
      sold: 156,
      inStock: true,
      isNew: true,
      discount: 0
    },
    {
      id: 3,
      name: "Irish Potatoes",
      category: "Vegetables",
      price: 250,
      originalPrice: 300,
      unit: "per Kilogram",
      image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=600",
      seller: "Highland Farms",
      location: "Rubavu",
      rating: 4.7,
      reviews: 92,
      sold: 203,
      inStock: true,
      isNew: false,
      discount: 17
    },
    {
      id: 4,
      name: "Fresh Beans",
      category: "Grains",
      price: 800,
      originalPrice: 950,
      unit: "per Sack",
      image: "https://images.unsplash.com/photo-1589994160734-c8838c600e4f?auto=format&fit=crop&q=80&w=600",
      seller: "Peter's Agro",
      location: "Huye",
      rating: 4.6,
      reviews: 67,
      sold: 45,
      inStock: true,
      isNew: false,
      discount: 16
    },
    {
      id: 5,
      name: "Premium Bananas",
      category: "Fruits",
      price: 2000,
      originalPrice: 2000,
      unit: "per Bunch",
      image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&q=80&w=600",
      seller: "Banana Hub",
      location: "Nyagatare",
      rating: 4.8,
      reviews: 178,
      sold: 234,
      inStock: true,
      isNew: false,
      discount: 0
    },
    {
      id: 6,
      name: "Live Chickens",
      category: "Livestock",
      price: 700,
      originalPrice: 850,
      unit: "per Chicken",
      image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=600",
      seller: "Emma's Poultry",
      location: "Kigali",
      rating: 4.5,
      reviews: 43,
      sold: 67,
      inStock: false,
      isNew: false,
      discount: 18
    }
  ];

  const filteredProducts = selectedCategory === "All Categories" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 pt-40 font-sans ">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-2 px-6 text-center text-sm">
        <p>🎉 Special Offer: Get 20% off on all vegetables this week! Use code: <strong>VEGGIE20</strong></p>
      </div>


      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <aside className="w-64 shrink-0 hidden lg:block">
            <div className="bg-white rounded-lg p-5 shadow-sm sticky top-24">
              <h3 className="font-bold text-gray-800 mb-4 text-lg">Filters</h3>
              
              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-700 mb-3 text-sm">Categories</h4>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <button
                      key={cat.name}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        selectedCategory === cat.name
                          ? "bg-green-50 text-green-700 font-medium"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{cat.name}</span>
                        <span className="text-xs text-gray-400">{cat.count}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6 pb-6 border-b">
                <h4 className="font-semibold text-gray-700 mb-3 text-sm">Price Range</h4>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>RWF 0</span>
                    <span>RWF {priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-700 mb-3 text-sm">Rating</h4>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map(rating => (
                    <label key={rating} className="flex items-center gap-2 cursor-pointer text-sm">
                      <input type="checkbox" className="rounded text-green-600" />
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-gray-600">{rating}+ stars</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <button className="w-full py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors text-sm font-medium">
                Reset Filters
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Breadcrumb */}
            <div className="text-sm text-gray-600 mb-4">
              <span>Home</span> / <span>Marketplace</span> / <span className="text-gray-800 font-medium">{selectedCategory}</span>
            </div>

            {/* Toolbar */}
            <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 text-sm">{filteredProducts.length} Products found</span>
                </div>

                <div className="flex items-center gap-3">
                  {/* Sort By */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest First</option>
                  </select>

                  {/* View Toggle */}
                  <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 ${viewMode === "grid" ? "bg-gray-100" : "bg-white"}`}
                    >
                      <Grid className="w-5 h-5 text-gray-600" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 border-l ${viewMode === "list" ? "bg-gray-100" : "bg-white"}`}
                    >
                      <List className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              {...animations.staggerContainer}
            >
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
                  {...animations.fadeUp}
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
                        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded font-bold">
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
                      <button className="w-full py-2 bg-white text-gray-800 rounded-md text-sm font-medium hover:bg-gray-100">
                        Quick View
                      </button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    {/* Category Badge */}
                    <span className="inline-block text-xs text-green-600 bg-green-50 px-2 py-1 rounded font-medium mb-2">
                      {product.category}
                    </span>

                    <h3 className="text-base font-semibold text-gray-800 mb-1 line-clamp-2 min-h-[3rem]">
                      {product.name}
                    </h3>
                    
                    {/* Rating & Sales */}
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

                    {/* Seller Info */}
                    <div className="flex items-center gap-2 text-xs text-gray-600 mb-3 pb-3 border-b">
                      <User className="w-3.5 h-3.5" />
                      <span>{product.seller}</span>
                      <span className="text-gray-400">•</span>
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{product.location}</span>
                    </div>

                    {/* Price */}
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

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button 
                        disabled={!product.inStock}
                        className={`flex-1 py-2.5 rounded-lg font-medium transition-all text-sm ${
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
              ))}
            </motion.div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center items-center gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                Previous
              </button>
              {[1, 2, 3, 4, 5].map(page => (
                <button
                  key={page}
                  className={`px-4 py-2 rounded-lg text-sm ${
                    page === 1
                      ? "bg-green-600 text-white"
                      : "border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                Next
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;