import React from 'react';
import { CheckCircle, Package, Truck, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OrderConfirmationPage = ({ orderData, onContinueShopping }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">Thank you for your purchase. Your order has been successfully placed.</p>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="border-b pb-4 mb-4">
            <h2 className="text-xl font-bold text-gray-800">Order Details</h2>
            <p className="text-gray-600">Order ID: {orderData.orderId}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Shipping Address</h3>
              <p className="text-gray-600">{orderData.shippingInfo.fullName}</p>
              <p className="text-gray-600">{orderData.shippingInfo.address}</p>
              <p className="text-gray-600">{orderData.shippingInfo.city}</p>
              <p className="text-gray-600">{orderData.shippingInfo.phone}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Payment Method</h3>
              <p className="text-gray-600 capitalize">{orderData.paymentMethod} Payment</p>
              <p className="text-gray-600">Amount: RWF {orderData.total.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">What's Next?</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Package className="w-6 h-6 text-green-600" />
              <div>
                <p className="font-semibold">Order Processing</p>
                <p className="text-sm text-gray-600">We'll prepare your order within 24 hours</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Truck className="w-6 h-6 text-blue-600" />
              <div>
                <p className="font-semibold">Shipping</p>
                <p className="text-sm text-gray-600">Expected delivery in 2-3 business days</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
          >
            View Dashboard
          </button>
          <button
            onClick={() => navigate('/marketplace')}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;