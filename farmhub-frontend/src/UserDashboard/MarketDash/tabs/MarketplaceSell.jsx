import React, { useState, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import SellerProductCard from "../../../UserDashboard/DashComponents/sellplace/SellerProductCard";
import AddProductForm from "../../DashComponents/sellplace/AddProductForm";
import EditProductModal from "../../MarketDash/Editproduce";
import { produceAPI } from "../../../utils/api";
import { transformProduceData } from "../../../utils/dataTransformers";

const MarketplaceSell = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [myProducts, setMyProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMyProducts();
  }, []);

  const loadMyProducts = async () => {
    try {
      setLoading(true);
      // Get current user from localStorage
      const userStr = localStorage.getItem("user");
      const currentUser = userStr ? JSON.parse(userStr) : null;

      if (!currentUser || !currentUser.id) {
        console.error("User not found");
        setMyProducts([]);
        return;
      }

      // Fetch all produce and filter by current user
      // NOTE: Backend doesn't have /api/produce/my-produce endpoint
      // This is a missing endpoint - we filter on frontend
      const allProduce = await produceAPI.getAll();
      const userProduce = allProduce.filter(p =>
        p.farmer?.id === currentUser.id || p.farmerId === currentUser.id
      );
      setMyProducts(userProduce);
    } catch (error) {
      console.error("Error loading my products:", error);
      setMyProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (newProduct) => {
    try {
      // Validate required fields
      if (!newProduct.name || !newProduct.name.trim()) {
        alert("Product name is required");
        return;
      }

      const quantity = parseFloat(newProduct.stock || newProduct.quantity || 0);
      if (isNaN(quantity) || quantity <= 0) {
        alert("Valid stock/quantity is required");
        return;
      }

      const pricePerUnit = parseFloat(newProduct.price || newProduct.pricePerUnit || 0);
      if (isNaN(pricePerUnit) || pricePerUnit <= 0) {
        alert("Valid price is required");
        return;
      }

      // Transform frontend form data to match backend DTO
      const backendData = transformProduceData(newProduct);

      console.log("Sending product data:", backendData);
      const created = await produceAPI.create(backendData);
      setMyProducts([created, ...myProducts]);
      setShowAddForm(false);
    } catch (error) {
      console.error("Error adding product:", error);
      const errorMessage = error.message || error.response?.data?.message || "Unknown error occurred";
      alert("Failed to add product: " + errorMessage);
    }
  };

  const handleEditProduct = (productId) => {
    const product = myProducts.find(p => p.id === productId);
    if (product) {
      setEditingProduct(product);
    }
  };

  const handleSaveEdit = async (updatedProduct) => {
    try {
      // Transform frontend form data to match backend update format
      const updateData = {
        name: updatedProduct.name,
        quantity: parseFloat(updatedProduct.stock || updatedProduct.quantity || 0),
        // Backend update only supports name and quantity currently
        // Add other fields if backend supports them
      };

      console.log("Updating product with data:", updateData);
      const updated = await produceAPI.update(updatedProduct.id, updateData);
      setMyProducts(myProducts.map(p =>
        p.id === updated.id ? updated : p
      ));
      setEditingProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product: " + (error.message || "Unknown error"));
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await produceAPI.delete(productId);
        setMyProducts(myProducts.filter(p => p.id !== productId));
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product: " + error.message);
      }
    }
  };

  if (showAddForm) {
    return (
      <AddProductForm
        onCancel={() => setShowAddForm(false)}
        onSubmit={handleAddProduct}
      />
    );
  }

  return (
    <div className="p-6">
      {/* Edit Modal */}
      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={handleSaveEdit}
        />
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Products</h1>
          <p className="text-gray-600 text-sm mt-1">
            Manage your marketplace listings
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition shadow-md"
        >
          <PlusCircle className="w-5 h-5" />
          Add New Product
        </button>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-md">
          <p className="text-gray-500">Loading your products...</p>
        </div>
      ) : myProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-md">
          <PlusCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Products Yet</h3>
          <p className="text-gray-500 mb-6">Start selling by adding your first product</p>
          <button
            type="button"
            onClick={() => setShowAddForm(true)}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Add Product
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {myProducts.map((product) => (
            <SellerProductCard
              key={product.id}
              product={product}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MarketplaceSell;