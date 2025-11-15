import React from "react";
import { Package, DollarSign, Hash, Tag, User, MapPin, Percent } from "lucide-react";

const ProductFormFields = ({ formData, onChange }) => {
  const categories = [
    "Vegetables",
    "Fruits",
    "Grains",
    "Equipment",
    "Seeds",
    "Livestock",
    "Dairy",
    "Other"
  ];

  const units = ["kg", "g", "piece", "bag", "liter", "dozen"];

  return (
    <fieldset className="space-y-4">
      <legend className="sr-only">Product Information</legend>
      
      {/* Product Name */}
      <div>
        <label htmlFor="product-name" className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-green-600" />
            Product Name *
          </div>
        </label>
        <input
          type="text"
          id="product-name"
          name="name"
          value={formData.name}
          onChange={onChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="e.g., Fresh Tomatoes"
          required
        />
      </div>

      {/* Category */}
      <div>
        <label htmlFor="product-category" className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-green-600" />
            Category *
          </div>
        </label>
        <select
          id="product-category"
          name="category"
          value={formData.category}
          onChange={onChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Unit Selection First */}

      {/* Unit Selection First */}
      <div>
        <label htmlFor="product-unit" className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-green-600" />
            Selling Unit *
          </div>
        </label>
        <select
          id="product-unit"
          name="unit"
          value={formData.unit}
          onChange={onChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        >
          {units.map((unit) => (
            <option key={unit} value={unit}>
              per {unit}
            </option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">Select how you want to sell this product</p>
      </div>

      {/* Price per Unit, Original Price, Stock */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="product-price" className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-600" />
              Price per {formData.unit} (RWF) *
            </div>
          </label>
          <input
            type="number"
            id="product-price"
            name="price"
            value={formData.price}
            onChange={onChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="5000"
            min="0"
            step="0.01"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Current selling price</p>
        </div>

        <div>
          <label htmlFor="product-original-price" className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Percent className="w-4 h-4 text-green-600" />
              Original Price per {formData.unit} (RWF)
            </div>
          </label>
          <input
            type="number"
            id="product-original-price"
            name="originalPrice"
            value={formData.originalPrice}
            onChange={onChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="6000"
            min="0"
            step="0.01"
          />
          <p className="text-xs text-gray-500 mt-1">For discounted items (optional)</p>
        </div>

        <div>
          <label htmlFor="product-stock" className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-green-600" />
              Available Stock ({formData.unit}) *
            </div>
          </label>
          <input
            type="number"
            id="product-stock"
            name="stock"
            value={formData.stock}
            onChange={onChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="100"
            min="0"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Total quantity available</p>
        </div>
      </div>

      {/* Seller Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="product-seller" className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-green-600" />
              Seller Name *
            </div>
          </label>
          <input
            type="text"
            id="product-seller"
            name="seller"
            value={formData.seller}
            onChange={onChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Your name or farm name"
            required
          />
        </div>

        <div>
          <label htmlFor="product-location" className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-green-600" />
              Location *
            </div>
          </label>
          <input
            type="text"
            id="product-location"
            name="location"
            value={formData.location}
            onChange={onChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="e.g., Kigali, Rwanda"
            required
          />
        </div>
      </div>

      {/* Checkboxes */}
      <div className="flex gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="isNew"
            checked={formData.isNew}
            onChange={(e) => onChange({ target: { name: 'isNew', value: e.target.checked } })}
            className="w-4 h-4 text-green-600 rounded focus:ring-2 focus:ring-green-500"
          />
          <span className="text-sm font-medium text-gray-700">Mark as NEW product</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="inStock"
            checked={formData.inStock}
            onChange={(e) => onChange({ target: { name: 'inStock', value: e.target.checked } })}
            className="w-4 h-4 text-green-600 rounded focus:ring-2 focus:ring-green-500"
          />
          <span className="text-sm font-medium text-gray-700">In Stock</span>
        </label>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="product-description" className="block text-sm font-medium text-gray-700 mb-2">
          Description *
        </label>
        <textarea
          id="product-description"
          name="description"
          value={formData.description}
          onChange={onChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Describe your product: quality, growing method, freshness, organic certification, etc."
          rows="5"
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          Provide detailed information to help buyers make informed decisions
        </p>
      </div>
    </fieldset>
  );
};


export default ProductFormFields;