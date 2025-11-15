import React from "react";
import { CheckCircle, Package, Truck, Home, Download, Mail } from "lucide-react";

const ConfirmationPage = ({ product, shippingInfo, paymentData, onBackToHome }) => {
  const quantity = shippingInfo.quantity || 1;
  const shippingCost = 5000;
  const tax = (product.price * quantity) * 0.18;
  const subtotal = product.price * quantity;
  const total = subtotal + shippingCost + tax;
  
  const orderNumber = `ORD-${Date.now()}`;
  const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleDownloadReceipt = () => {
    alert("Receipt download functionality would be implemented here");
  };

  const handleEmailReceipt = () => {
    alert(`Receipt will be sent to ${shippingInfo.email}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <div className="flex items-center text-green-600">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                  ✓
                </div>
                <span className="ml-2 font-semibold">Shipping</span>
              </div>
              <div className="w-24 h-1 bg-green-600 mx-4"></div>
              <div className="flex items-center text-green-600">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                  ✓
                </div>
                <span className="ml-2 font-semibold">Payment</span>
              </div>
              <div className="w-24 h-1 bg-green-600 mx-4"></div>
              <div className="flex items-center text-green-600">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                  ✓
                </div>
                <span className="ml-2 font-semibold">Confirmation</span>
              </div>
            </div>
          </div>
        </div>

        {/* Success Message */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Confirmed!</h1>
            <p className="text-gray-600">Thank you for your purchase, {shippingInfo.fullName}!</p>
            <p className="text-sm text-gray-500 mt-2">
              A confirmation email has been sent to <span className="font-semibold">{shippingInfo.email}</span>
            </p>
          </div>

          {/* Order Number */}
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Order Number</p>
                <p className="text-2xl font-bold text-green-700">{orderNumber}</p>
              </div>
              <Package className="w-12 h-12 text-green-600" />
            </div>
          </div>

          {/* Estimated Delivery */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <Truck className="w-8 h-8 text-amber-600" />
              <div>
                <p className="text-sm text-gray-600">Estimated Delivery</p>
                <p className="text-lg font-semibold text-gray-800">{estimatedDelivery}</p>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="border-t pt-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Order Details</h2>
            
            {/* Product */}
            <div className="flex gap-4 mb-6 bg-gray-50 p-4 rounded-lg">
              <img
                src={product.image}
                alt={product.name}
                className="w-24 h-24 object-cover rounded-lg border-2 border-green-100"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-600 mt-1">Quantity: {quantity}</p>
                <p className="text-sm text-green-600 font-semibold mt-1">
                  RWF {product.price.toLocaleString()} each
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-600 text-lg">
                  RWF {(product.price * quantity).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="space-y-2">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-medium">RWF {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="font-medium">RWF {shippingCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax (18%)</span>
                  <span className="font-medium">RWF {tax.toLocaleString()}</span>
                </div>
                <div className="border-t-2 border-green-200 pt-2 flex justify-between text-xl font-bold text-green-700">
                  <span>Total Paid</span>
                  <span>RWF {total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-green-600" />
                  Shipping Address
                </h3>
                <p className="text-sm text-gray-700">{shippingInfo.fullName}</p>
                <p className="text-sm text-gray-700">{shippingInfo.address}</p>
                <p className="text-sm text-gray-700">{shippingInfo.city}</p>
                {shippingInfo.postalCode && (
                  <p className="text-sm text-gray-700">{shippingInfo.postalCode}</p>
                )}
                <p className="text-sm text-gray-700 mt-2">{shippingInfo.phone}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Payment Method
                </h3>
                <p className="text-sm text-gray-700 capitalize">
                  {paymentData?.method === "mpesa" && "M-Pesa"}
                  {paymentData?.method === "mobilemoney" && `Mobile Money (${paymentData.provider?.toUpperCase()})`}
                  {paymentData?.method === "card" && "Credit/Debit Card"}
                  {paymentData?.method === "paypal" && "PayPal"}
                </p>
                {paymentData?.phone && (
                  <p className="text-sm text-gray-700 mt-1">Phone: {paymentData.phone}</p>
                )}
                {paymentData?.cardNumber && (
                  <p className="text-sm text-gray-700 mt-1">
                    Card: **** **** **** {paymentData.cardNumber.slice(-4)}
                  </p>
                )}
                {paymentData?.paypalEmail && (
                  <p className="text-sm text-gray-700 mt-1">Email: {paymentData.paypalEmail}</p>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={handleDownloadReceipt}
              className="flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold"
            >
              <Download className="w-5 h-5" />
              Download Receipt
            </button>
            
            <button
              onClick={handleEmailReceipt}
              className="flex items-center justify-center gap-2 bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition font-semibold"
            >
              <Mail className="w-5 h-5" />
              Email Receipt
            </button>
          </div>
        </div>

        {/* What's Next */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">What's Next?</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 font-bold">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Order Processing</h3>
                <p className="text-sm text-gray-600">We're preparing your order for shipment</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 font-bold">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Shipping Updates</h3>
                <p className="text-sm text-gray-600">You'll receive tracking information via email</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 font-bold">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Delivery</h3>
                <p className="text-sm text-gray-600">Your package will arrive by {estimatedDelivery}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-900 transition font-semibold"
          >
            <Home className="w-5 h-5" />
            Continue Shopping
          </button>
        </div>

        {/* Support */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Need help with your order?{" "}
            <a href="#" className="text-green-600 hover:text-green-700 font-semibold">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;