import React, { useState } from "react";
import { ShoppingBag, Truck, CreditCard, Lock, MapPin, Mail, Phone, User } from "lucide-react";

const CheckoutPage = ({ product, onBack, onProceedToPayment }) => {
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
    email: "",
  });

  const [quantity, setQuantity] = useState(1);

  const shippingCost = 5000;
  const tax = (product.price * quantity) * 0.18;
  const subtotal = product.price * quantity;
  const total = subtotal + shippingCost + tax;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onProceedToPayment({ ...shippingInfo, quantity });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <div className="flex items-center text-green-600">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                <span className="ml-2 font-semibold">Shipping</span>
              </div>
              <div className="w-24 h-1 bg-gray-300 mx-4"></div>
              <div className="flex items-center text-gray-400">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <span className="ml-2 font-semibold">Payment</span>
              </div>
              <div className="w-24 h-1 bg-gray-300 mx-4"></div>
              <div className="flex items-center text-gray-400">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
                <span className="ml-2 font-semibold">Confirmation</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Shipping Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-2 mb-6">
                <Truck className="w-6 h-6 text-green-600" />
                <h2 className="text-2xl font-bold text-gray-800">Shipping Information</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-green-600" />
                      Full Name *
                    </div>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={shippingInfo.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="John Doe"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-green-600" />
                      Email Address *
                    </div>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={shippingInfo.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="john.doe@example.com"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-green-600" />
                      Phone Number *
                    </div>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={shippingInfo.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="0781234567"
                    required
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-green-600" />
                      Street Address *
                    </div>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={shippingInfo.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="KG 123 St, Kigali"
                    required
                  />
                </div>

                {/* City & Postal Code */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Kigali"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Postal Code (Optional)
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={shippingInfo.postalCode}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="00000"
                    />
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4 text-green-600" />
                      Quantity *
                    </div>
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold text-xl transition"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-20 px-4 py-3 border border-gray-300 rounded-lg text-center font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      min="1"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-12 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold text-xl transition"
                    >
                      +
                    </button>
                    <span className="text-gray-600 ml-2">items</span>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 transition font-semibold text-lg flex items-center justify-center gap-2 shadow-lg"
                  >
                    <CreditCard className="w-5 h-5" />
                    Proceed to Payment
                  </button>

                  <button
                    type="button"
                    onClick={onBack}
                    className="w-full mt-3 text-gray-700 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition font-medium"
                  >
                    Continue Shopping
                  </button>
                </div>
              </form>
            </div>

            {/* Security Badge */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-green-800">
                <Lock className="w-5 h-5" />
                <p className="text-sm font-medium">
                  Your information is secure and encrypted
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <div className="flex items-center gap-2 mb-4">
                <ShoppingBag className="w-5 h-5 text-green-600" />
                <h3 className="text-xl font-bold text-gray-800">Order Summary</h3>
              </div>

              {/* Product Item */}
              <div className="border-b pb-4 mb-4">
                <div className="flex gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded-lg border-2 border-green-100"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 text-sm">{product.name}</h4>
                    <p className="text-gray-600 text-sm mt-1">Quantity: {quantity}</p>
                    <p className="text-green-600 font-semibold text-sm mt-1">
                      RWF {product.price.toLocaleString()} each
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600 text-lg">
                      RWF {(product.price * quantity).toLocaleString()}
                    </p>
                    {product.discount > 0 && (
                      <p className="text-gray-400 line-through text-xs">
                        RWF {(product.originalPrice * quantity)?.toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-4">
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
                <div className="border-t-2 border-green-200 pt-3 flex justify-between text-xl font-bold text-green-700">
                  <span>Total</span>
                  <span>RWF {total.toLocaleString()}</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t">
                <p className="text-xs text-gray-500 text-center mb-3 font-medium">We accept</p>
                <div className="flex justify-center gap-2 flex-wrap">
                  <div className="px-3 py-2 bg-green-50 border border-green-200 rounded text-xs font-semibold text-green-700">M-Pesa</div>
                  <div className="px-3 py-2 bg-green-50 border border-green-200 rounded text-xs font-semibold text-green-700">MTN</div>
                  <div className="px-3 py-2 bg-green-50 border border-green-200 rounded text-xs font-semibold text-green-700">Airtel</div>
                  <div className="px-3 py-2 bg-green-50 border border-green-200 rounded text-xs font-semibold text-green-700">Visa</div>
                  <div className="px-3 py-2 bg-green-50 border border-green-200 rounded text-xs font-semibold text-green-700">PayPal</div>
                </div>
              </div>

              {/* Free Shipping Notice */}
              <div className="mt-4 bg-green-100 rounded-lg p-3 text-center">
                <p className="text-sm text-green-800 font-medium">
                  🎉 Free returns within 30 days
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;