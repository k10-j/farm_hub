import React from "react";

const categories = ["All", "Vegetables", "Fruits", "Grains", "Fertilizers"];

const CategoryFilter = ({ selected, onSelect }) => {
  return (
    <div className="flex gap-3 overflow-x-auto">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
            selected === cat
              ? "bg-green-600 text-white border-green-600"
              : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
