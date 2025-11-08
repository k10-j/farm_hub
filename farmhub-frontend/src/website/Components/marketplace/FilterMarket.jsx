// components/FilterSidebar.jsx
import React, { useState } from "react";
import { Star } from "lucide-react";

const FilterSidebar = ({ categories, onCategoryChange, onPriceChange, onRatingChange, onReset }) => {
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedRatings, setSelectedRatings] = useState([]);

  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value);
    setPriceRange([0, value]);
    onPriceChange([0, value]);
  };

  const handleRatingToggle = (rating) => {
    let newRatings = [...selectedRatings];
    if (newRatings.includes(rating)) {
      newRatings = newRatings.filter(r => r !== rating);
    } else {
      newRatings.push(rating);
    }
    setSelectedRatings(newRatings);
    onRatingChange(newRatings);
  };

  return (
    <aside className="w-64 shrink-0 hidden lg:block">
      <div className="bg-white rounded-lg p-5 shadow-sm sticky top-24 space-y-6">

        {/* Categories */}
        <div>
          <h4 className="font-semibold text-gray-700 mb-3 text-sm">Categories</h4>
          <div className="space-y-2">
            {categories.map(cat => (
              <button
                key={cat.name}
                onClick={() => onCategoryChange(cat.name)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  cat.selected ? "bg-green-50 text-green-700 font-medium" : "text-gray-600 hover:bg-gray-50"
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
        <div>
          <h4 className="font-semibold text-gray-700 mb-3 text-sm">Price Range</h4>
          <input
            type="range"
            min="0"
            max="5000"
            value={priceRange[1]}
            onChange={handlePriceChange}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600 mt-1">
            <span>RWF 0</span>
            <span>RWF {priceRange[1]}</span>
          </div>
        </div>

        {/* Rating */}
        <div>
          <h4 className="font-semibold text-gray-700 mb-3 text-sm">Rating</h4>
          <div className="space-y-2">
            {[4, 3, 2, 1].map(rating => (
              <label key={rating} className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="checkbox"
                  className="rounded text-green-600"
                  checked={selectedRatings.includes(rating)}
                  onChange={() => handleRatingToggle(rating)}
                />
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-gray-600">{rating}+ stars</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Reset Filters */}
        <button
          onClick={() => {
            setPriceRange([0, 5000]);
            setSelectedRatings([]);
            onReset();
          }}
          className="w-full py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors text-sm font-medium"
        >
          Reset Filters
        </button>
      </div>
    </aside>
  );
};

export default FilterSidebar;
