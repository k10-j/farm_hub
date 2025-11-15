import React, { useState } from "react";
import { ArrowLeft, Upload, X } from "lucide-react";
import ProductFormFields from "./ProductFormFields";
import ImageUploader from "./ImageUploader";

const AddProductForm = ({ onCancel, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Vegetables",
    price: "",
    originalPrice: "",
    discount: 0,
    stock: "",
    unit: "kg",
    image: "",
    seller: "",
    location: "",
    inStock: true,
    isNew: false,
    rating: 4.5,
    reviews: 0,
    sold: 0
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (imageUrl) => {
    setFormData({ ...formData, image: imageUrl });
    setImagePreview(imageUrl);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.price || !formData.stock || !formData.seller || !formData.location) {
      alert("Please fill in all required fields");
      return;
    }

    // Calculate discount if original price is provided
    const finalFormData = { ...formData };
    if (formData.originalPrice && parseFloat(formData.originalPrice) > parseFloat(formData.price)) {
      const discountPercent = ((parseFloat(formData.originalPrice) - parseFloat(formData.price)) / parseFloat(formData.originalPrice) * 100).toFixed(0);
      finalFormData.discount = parseInt(discountPercent);
    } else {
      finalFormData.originalPrice = formData.price;
      finalFormData.discount = 0;
    }

    // Convert string numbers to numbers
    finalFormData.price = parseFloat(formData.price);
    finalFormData.originalPrice = parseFloat(formData.originalPrice || formData.price);
    finalFormData.stock = parseInt(formData.stock);

    onSubmit(finalFormData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to My Products
        </button>
        <h1 className="text-3xl font-bold text-gray-800">Add New Product</h1>
        <p className="text-gray-600 mt-2">Fill in the details to list your product</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
        {/* Image Upload Section */}
        <ImageUploader
          imagePreview={imagePreview}
          onImageUpload={handleImageUpload}
          onImageRemove={() => {
            setImagePreview(null);
            setFormData({ ...formData, image: "" });
          }}
        />

        {/* Product Details Section */}
        <ProductFormFields
          formData={formData}
          onChange={handleChange}
        />

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold"
          >
            Add Product
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition font-semibold"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;