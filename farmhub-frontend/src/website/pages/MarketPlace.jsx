import React, { useState } from "react";
import ProductCard from "../Components/marketplace/ProductCard";
import FilterSidebar from "../Components/marketplace/FilterMarket";
import products from "../Components/marketplace/ProductData"; 
import { Link } from "react-router-dom";

const Marketplace = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [priceRange, setPriceRange] = useState([0, Math.max(...products.map(p => p.price))]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);

  const categories = [
    { name: "All Categories", count: products.length },
    { name: "Vegetables", count: products.filter(p => p.category === "Vegetables").length },
    { name: "Fruits", count: products.filter(p => p.category === "Fruits").length },
    { name: "Grains", count: products.filter(p => p.category === "Grains").length },
    { name: "Equipment", count: products.filter(p => p.category === "Equipment").length },
    { name: "Seeds", count: products.filter(p => p.category === "Seeds").length },
    { name: "Livestock", count: products.filter(p => p.category === "Livestock").length },
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "All Categories" || product.category === selectedCategory;
    const matchesPrice = product.price <= priceRange[1];
    const matchesRating = selectedRatings.length === 0 || selectedRatings.some(r => product.rating >= r);
    return matchesCategory && matchesPrice && matchesRating;
  });

  const handleReset = () => {
    setSelectedCategory("All Categories");
    setPriceRange([0, Math.max(...products.map(p => p.price))]);
    setSelectedRatings([]);
  };

  return (
    <div className="min-h-screen font-sanserif bg-gray-50 pt-50 ">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden flex justify-end px-6 mb-4">
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="py-2 px-4 bg-green-600 text-white rounded-lg"
        >
          {showSidebar ? "Close Filters" : "Filters"}
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 flex gap-6">
        {showSidebar && (
          <FilterSidebar
            categories={categories.map(c => ({ ...c, selected: c.name === selectedCategory }))}
            onCategoryChange={setSelectedCategory}
            onPriceChange={setPriceRange}
            onRatingChange={setSelectedRatings}
            onReset={handleReset}
          />
        )}

        {/* Sidebar always visible on large screens */}
        <div className="hidden lg:block">
          <FilterSidebar
            categories={categories.map(c => ({ ...c, selected: c.name === selectedCategory }))}
            onCategoryChange={setSelectedCategory}
            onPriceChange={setPriceRange}
            onRatingChange={setSelectedRatings}
            onReset={handleReset}
          />
        </div>

        {/* Products grid */}
        <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-8 gap-5">
          {filteredProducts.length === 0 ? (
            <p className="col-span-full text-center text-gray-500 mt-10">
              No products match your filters.
            </p>
          ) : (
            filteredProducts.map(product => (
              <Link key={product.id} to={`/product/${product.id}`}>
                <ProductCard product={product} />
              </Link>
            ))
          )}
        </main>
      </div>
    </div>
  );
};

export default Marketplace;
