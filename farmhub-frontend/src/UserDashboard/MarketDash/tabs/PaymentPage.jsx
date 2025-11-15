import React, { useState } from "react";
import { CreditCard, Smartphone, Lock, ArrowLeft } from "lucide-react";

const PaymentPage = ({ product, shippingInfo, onBackToCheckout, onPaymentSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [mobileMoneyPhone, setMobileMoneyPhone] = useState("");
  const [mobileMoneyProvider, setMobileMoneyProvider] = useState("mtn");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVV, setCardCVV] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");

  const quantity = shippingInfo.quantity || 1;
  const shippingCost = 5000;
  const tax = (product.price * quantity) * 0.18;
  const subtotal = product.price * quantity;
  const total = subtotal + shippingCost + tax;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const paymentData = {
      method: paymentMethod,
      ...(paymentMethod === "mpesa" || paymentMethod === "mobilemoney" 
        ? { phone: mobileMoneyPhone, provider: mobileMoneyProvider }
        : paymentMethod === "card"
        ? { cardNumber, cardExpiry, cardCVV }
        : { paypalEmail })
    };

    alert(`Payment of RWF ${total.toLocaleString()} successful via ${paymentMethod.toUpperCase()}!`);
    onPaymentSuccess(paymentData);
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
                  ✓
                </div>
                <span className="ml-2 font-semibold">Shipping</span>
              </div>
              <div className="w-24 h-1 bg-green-600 mx-4"></div>
              <div className="flex items-center text-green-600">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
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
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-2 mb-6">
                <CreditCard className="w-6 h-6 text-green-600" />
                <h2 className="text-2xl font-bold text-gray-800">Payment Method</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Payment Method Selection */}
                <div className="space-y-3">
                  {/* M-Pesa */}
                  <label className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition ${
                    paymentMethod === "mpesa" ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-green-300"
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value="mpesa"
                      checked={paymentMethod === "mpesa"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-5 h-5 text-green-600"
                    />
                    <Smartphone className="w-6 h-6 text-green-600" />
                    <span className="font-semibold text-gray-800">M-Pesa</span>
                  </label>

                  {/* Mobile Money */}
                  <label className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition ${
                    paymentMethod === "mobilemoney" ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-green-300"
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value="mobilemoney"
                      checked={paymentMethod === "mobilemoney"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-5 h-5 text-green-600"
                    />
                    <Smartphone className="w-6 h-6 text-green-600" />
                    <span className="font-semibold text-gray-800">Mobile Money (MTN, Airtel)</span>
                  </label>

                  {/* Card */}
                  <label className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition ${
                    paymentMethod === "card" ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-green-300"
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-5 h-5 text-green-600"
                    />
                    <CreditCard className="w-6 h-6 text-green-600" />
                    <span className="font-semibold text-gray-800">Credit / Debit Card</span>
                  </label>

                  {/* PayPal */}
                  <label className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition ${
                    paymentMethod === "paypal" ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-green-300"
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value="paypal"
                      checked={paymentMethod === "paypal"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-5 h-5 text-green-600"
                    />
                    <div className="w-6 h-6 bg-amber-600 rounded flex items-center justify-center text-white font-bold text-xs">
                      P
                    </div>
                    <span className="font-semibold text-gray-800">PayPal</span>
                  </label>
                </div>

                {/* Payment Details */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  {/* M-Pesa Details */}
                  {paymentMethod === "mpesa" && (
                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-800 text-lg">M-Pesa Payment Details</h3>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          placeholder="07XXXXXXXX"
                          value={mobileMoneyPhone}
                          onChange={(e) => setMobileMoneyPhone(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                      </div>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <p className="text-sm text-green-800">
                          💡 You will receive a payment prompt on your phone to authorize this transaction
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Mobile Money Details */}
                  {paymentMethod === "mobilemoney" && (
                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-800 text-lg">Mobile Money Payment Details</h3>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Select Provider *
                        </label>
                        <select
                          value={mobileMoneyProvider}
                          onChange={(e) => setMobileMoneyProvider(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        >
                          <option value="mtn">MTN Mobile Money</option>
                          <option value="airtel">Airtel Money</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          placeholder="07XXXXXXXX"
                          value={mobileMoneyPhone}
                          onChange={(e) => setMobileMoneyPhone(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                      </div>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <p className="text-sm text-green-800">
                          💡 You will receive a payment prompt on your phone to authorize this transaction
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Card Details */}
                  {paymentMethod === "card" && (
                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-800 text-lg">Card Payment Details</h3>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Card Number *
                        </label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          maxLength="19"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Expiry Date *
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            maxLength="5"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            CVV *
                          </label>
                          <input
                            type="text"
                            placeholder="123"
                            value={cardCVV}
                            onChange={(e) => setCardCVV(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            maxLength="4"
                            required
                          />
                        </div>
                      </div>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <p className="text-sm text-green-800">
                          🔒 Your card information is encrypted and secure
                        </p>
                      </div>
                    </div>
                  )}

                  {/* PayPal Details */}
                  {paymentMethod === "paypal" && (
                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-800 text-lg">PayPal Payment Details</h3>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          PayPal Email *
                        </label>
                        <input
                          type="email"
                          placeholder="your@email.com"
                          value={paypalEmail}
                          onChange={(e) => setPaypalEmail(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                      </div>
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                        <p className="text-sm text-amber-800">
                          💡 You will be redirected to PayPal to complete your payment securely
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 transition font-bold text-lg shadow-lg flex items-center justify-center gap-2"
                  >
                    <Lock className="w-5 h-5" />
                    Pay RWF {total.toLocaleString()}
                  </button>
                  
                  <button
                    type="button"
                    onClick={onBackToCheckout}
                    className="w-full text-gray-700 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition font-medium flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Shipping
                  </button>
                </div>
              </form>
            </div>

            {/* Security Notice */}
            <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-green-800">
                <Lock className="w-5 h-5" />
                <p className="text-sm font-medium">
                  256-bit SSL encryption protects your payment information
                </p>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h3>

              {/* Product */}
              <div className="border-b pb-4 mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-32 object-cover rounded-lg mb-3 border-2 border-green-100"
                />
                <h4 className="font-semibold text-gray-800">{product.name}</h4>
                <p className="text-sm text-gray-600 mt-1">Quantity: {quantity}</p>
                <p className="text-sm text-green-600 font-semibold mt-1">
                  RWF {product.price.toLocaleString()} each
                </p>
              </div>

              {/* Shipping Info */}
              <div className="border-b pb-4 mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">Shipping To:</h4>
                <p className="text-sm text-gray-600">{shippingInfo.fullName}</p>
                <p className="text-sm text-gray-600">{shippingInfo.address}</p>
                <p className="text-sm text-gray-600">{shippingInfo.city}</p>
                <p className="text-sm text-gray-600">{shippingInfo.phone}</p>
                <p className="text-sm text-gray-600">{shippingInfo.email}</p>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 mb-4">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;