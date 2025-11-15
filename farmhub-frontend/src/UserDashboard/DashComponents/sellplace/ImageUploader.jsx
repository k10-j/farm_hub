import React, { useRef } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";

const ImageUploader = ({ imagePreview, onImageUpload, onImageRemove }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file");
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size must be less than 5MB");
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageUpload(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlUpload = () => {
    const url = prompt("Enter image URL:");
    if (url) {
      // Basic URL validation
      try {
        new URL(url);
        onImageUpload(url);
      } catch (e) {
        alert("Please enter a valid URL");
      }
    }
  };

  return (
    <fieldset>
      <legend className="block text-sm font-medium text-gray-700 mb-2">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-green-600" />
          Product Image *
        </div>
      </legend>

      {imagePreview ? (
        // Image Preview
        <div className="relative">
          <img
            src={imagePreview}
            alt="Product preview"
            className="w-full h-64 object-cover rounded-lg border-2 border-gray-300"
          />
          <button
            type="button"
            onClick={onImageRemove}
            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
            aria-label="Remove image"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      ) : (
        // Upload Options
        <div className="space-y-3">
          {/* File Upload */}
          <div
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                fileInputRef.current?.click();
              }
            }}
            role="button"
            tabIndex={0}
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
            aria-label="Upload product image"
          />

          {/* URL Upload */}
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

      <p className="text-xs text-gray-500 mt-2">
        * High-quality images help sell your products faster
      </p>
    </fieldset>
  );
};

export default ImageUploader;