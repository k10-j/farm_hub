import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/cartHook';
import { Trash2, Plus, Minus, Eye } from 'lucide-react';

const CartDropdown = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  const handleViewCart = () => {
    navigate('/dashboard/cart');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-lg shadow-xl border z-50">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-800">Shopping Cart ({cart.length})</h3>
          {cart.length > 0 && (
            <button 
              onClick={clearCart}
              className="text-red-500 text-sm hover:text-red-700"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {cart.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>Your cart is empty</p>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-sm text-gray-800">{item.name}</h4>
                  <p className="text-green-600 font-semibold">RWF {item.price.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="p-1 text-red-500 hover:bg-red-50 rounded ml-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {cart.length > 0 && (
        <div className="p-4 border-t bg-gray-50">
          <div className="flex justify-between items-center mb-3">
            <span className="font-semibold">Total: RWF {totalPrice.toLocaleString()}</span>
          </div>
          <div className="space-y-2">
            <button 
              onClick={handleViewCart}
              className="w-full bg-gray-600 text-white py-2 rounded-lg font-medium hover:bg-gray-700 flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4" />
              View Cart
            </button>
            <button 
              onClick={() => {
                if (cart.length === 1) {
                  navigate(`/product/${cart[0].id}`);
                } else {
                  navigate('/dashboard/marketplace');
                }
                onClose();
              }}
              className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartDropdown;