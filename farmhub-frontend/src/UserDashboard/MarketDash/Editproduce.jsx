import React, { useState, useRef } from "react";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import ProductFormFields from "../DashComponents/sellplace/ProductFormFields";

const EditProductModal = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    ...product,
    originalPrice: product.originalPrice || product.price,
  });
  const [imagePreview, setImagePreview] = useState(product.image);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size must be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlUpload = () => {
    const url = prompt("Enter image URL:");
    if (url) {
      try {
        new URL(url);
        setImagePreview(url);
        setFormData({ ...formData, image: url });
      } catch (e) {
        alert("Please enter a valid URL");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.stock || !formData.seller || !formData.location) {
      alert("Please fill in all required fields");
      return;
    }

    const finalFormData = { ...formData };
    
    // Calculate discount
    if (formData.originalPrice && parseFloat(formData.originalPrice) > parseFloat(formData.price)) {
      const discountPercent = ((parseFloat(formData.originalPrice) - parseFloat(formData.price)) / parseFloat(formData.originalPrice) * 100).toFixed(0);
      finalFormData.discount = parseInt(discountPercent);
    } else {
      finalFormData.originalPrice = formData.price;
      finalFormData.discount = 0;
    }

    finalFormData.price = parseFloat(formData.price);
    finalFormData.originalPrice = parseFloat(formData.originalPrice || formData.price);
    finalFormData.stock = parseInt(formData.stock);

    onSave(finalFormData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full my-8">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Edit Product</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
            type="button"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Image Upload */}
          <fieldset>
            <legend className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-green-600" />
                Product Image *
              </div>
            </legend>

            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Product preview"
                  className="w-full h-64 object-cover rounded-lg border-2 border-gray-300"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview(null);
                    setFormData({ ...formData, image: "" });
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                  aria-label="Remove image"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-green-500 hover:bg-green-50 transition"
                >
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium mb-1">Click to upload image</p>
                  <p className="text-sm text-gray-500">PNG, JPG, GIF up to 5MB</p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="text-center">
                  <span className="text-gray-500 text-sm">or</span>
                </div>
                <button
                  type="button"
                  onClick={handleUrlUpload}
                  className="w-full py-3 border-2 border-gray-300 rounded-lg text-gray-700 font-medium hover:border-green-500 hover:bg-green-50 transition"
                >
                  Enter Image URL
                </button>
              </div>
            )}
          </fieldset>

          {/* Product Form Fields */}
          <ProductFormFields
            formData={formData}
            onChange={handleChange}
          />
        </form>

        {/* Modal Footer */}
        <div className="flex gap-4 p-6 border-t bg-gray-50">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            type="button"
            className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;