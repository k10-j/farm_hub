import React, { useState, useEffect } from "react";
import ProductCard from "../Components/marketplace/ProductCard";
import FilterSidebar from "../Components/marketplace/FilterMarket";
import { produceAPI } from "../../utils/api";
import { Link } from "react-router-dom";

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await produceAPI.getAll();
      setProducts(data || []);
      // Update price range based on actual products
      if (data && data.length > 0) {
        const maxPrice = Math.max(...data.map(p => p.price || 0));
        setPriceRange([0, maxPrice || 100000]);
      }
    } catch (error) {
      console.error("Error loading products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Get unique categories from products
  const uniqueCategories = ["All Categories", ...new Set(products.map(p => p.category).filter(Boolean))];
  const categories = uniqueCategories.map(cat => ({
    name: cat,
    count: cat === "All Categories" ? products.length : products.filter(p => p.category === cat).length
  }));

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "All Categories" || product.category === selectedCategory;
    const matchesPrice = (product.price || 0) <= priceRange[1] && (product.price || 0) >= priceRange[0];
    return matchesCategory && matchesPrice;
  });

  const handleReset = () => {
    setSelectedCategory("All Categories");
    const maxPrice = products.length > 0 ? Math.max(...products.map(p => p.price || 0)) : 100000;
    setPriceRange([0, maxPrice]);
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
          {loading ? (
            <p className="col-span-full text-center text-gray-500 mt-10">
              Loading products...
            </p>
          ) : filteredProducts.length === 0 ? (
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
