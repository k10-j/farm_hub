// Marketplace.jsx
import React, { useState } from "react";
import ProductCard from "../Components/marketplace/ProductCard";
import FilterSidebar from "../Components/marketplace/FilterMarket";
import products from "../Components/marketplace/ProductData"; 
import { Link } from "react-router-dom";

const Marketplace = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedRatings, setSelectedRatings] = useState([]);

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
    setPriceRange([0, 5000]);
    setSelectedRatings([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-40 font-sans">
      <div className="max-w-7xl mx-auto px-6 py-6 flex gap-6">
        <FilterSidebar
          categories={categories.map(c => ({ ...c, selected: c.name === selectedCategory }))}
          onCategoryChange={setSelectedCategory}
          onPriceChange={setPriceRange}
          onRatingChange={setSelectedRatings}
          onReset={handleReset}
        />

        <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProducts.map(product => (
            <ProductCard
  product={product}
>
  <Link to={`/product/${product.id}`}>View Details</Link>
</ProductCard>
          ))}
        </main>
      </div>
    </div>
  );
};

export default Marketplace;
