import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import SellerProductCard from "../../../UserDashboard/DashComponents/sellplace/SellerProductCard";
import AddProductForm from "../../DashComponents/sellplace/AddProductForm";
import EditProductModal from "../../MarketDash/Editproduce";

const MarketplaceSell = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [myProducts, setMyProducts] = useState([
    { 
      id: 1, 
      name: "Carrots", 
      price: 900, 
      category: "Vegetables", 
      stock: 50, 
      unit: "kg",
      image: "https://i.imgur.com/IKFPf5F.png",
      seller: "Green Farm",
      location: "Kigali",
      description: "Fresh organic carrots harvested daily",
      inStock: true,
      isNew: false,
      rating: 4.5,
      reviews: 12,
      sold: 45,
      discount: 0,
      originalPrice: 900
    },
    { 
      id: 2, 
      name: "Irish Potatoes", 
      price: 5500, 
      category: "Vegetables", 
      stock: 30, 
      unit: "bag",
      image: "https://i.imgur.com/4CIq9Vy.png",
      seller: "Green Farm",
      location: "Kigali",
      description: "Quality Irish potatoes, perfect for cooking",
      inStock: true,
      isNew: false,
      rating: 4.3,
      reviews: 8,
      sold: 23,
      discount: 0,
      originalPrice: 5500
    }
  ]);

  const handleAddProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: Date.now(),
    };
    setMyProducts([productWithId, ...myProducts]);
    setShowAddForm(false);
  };

  const handleEditProduct = (productId) => {
    const product = myProducts.find(p => p.id === productId);
    if (product) {
      setEditingProduct(product);
    }
  };

  const handleSaveEdit = (updatedProduct) => {
    setMyProducts(myProducts.map(p => 
      p.id === updatedProduct.id ? updatedProduct : p
    ));
    setEditingProduct(null);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setMyProducts(myProducts.filter(p => p.id !== productId));
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
      {myProducts.length === 0 ? (
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