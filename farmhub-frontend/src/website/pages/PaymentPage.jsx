import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Smartphone, Shield, CheckCircle } from 'lucide-react';

const PaymentPage = ({ orderData, onBack, onPaymentComplete }) => {
  const [paymentMethod, setPaymentMethod] = useState('mobile');
  const [paymentDetails, setPaymentDetails] = useState({
    phoneNumber: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });
  const [processing, setProcessing] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      onPaymentComplete({
        ...orderData,
        paymentMethod,
        paymentDetails,
        orderId: 'ORD-' + Date.now(),
        status: 'CONFIRMED'
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Shipping
          </button>
          
          {/* Progress Steps */}
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
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Method</h2>
              
              {/* Payment Method Selection */}
              <div className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => setPaymentMethod('mobile')}
                    className={`p-4 border-2 rounded-lg flex items-center gap-3 ${
                      paymentMethod === 'mobile' ? 'border-green-500 bg-green-50' : 'border-gray-200'
                    }`}
                  >
                    <Smartphone className="w-6 h-6 text-green-600" />
                    <div className="text-left">
                      <p className="font-semibold">Mobile Money</p>
                      <p className="text-sm text-gray-600">MTN, Airtel Money</p>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 border-2 rounded-lg flex items-center gap-3 ${
                      paymentMethod === 'card' ? 'border-green-500 bg-green-50' : 'border-gray-200'
                    }`}
                  >
                    <CreditCard className="w-6 h-6 text-green-600" />
                    <div className="text-left">
                      <p className="font-semibold">Credit/Debit Card</p>
                      <p className="text-sm text-gray-600">Visa, Mastercard</p>
                    </div>
                  </button>
                </div>
              </div>

              <form onSubmit={handlePayment}>
                {paymentMethod === 'mobile' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={paymentDetails.phoneNumber}
                        onChange={(e) => setPaymentDetails({...paymentDetails, phoneNumber: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="078XXXXXXX"
                        required
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cardholder Name *
                      </label>
                      <input
                        type="text"
                        value={paymentDetails.cardName}
                        onChange={(e) => setPaymentDetails({...paymentDetails, cardName: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        value={paymentDetails.cardNumber}
                        onChange={(e) => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="1234 5678 9012 3456"
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
                          value={paymentDetails.expiryDate}
                          onChange={(e) => setPaymentDetails({...paymentDetails, expiryDate: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="MM/YY"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV *
                        </label>
                        <input
                          type="text"
                          value={paymentDetails.cvv}
                          onChange={(e) => setPaymentDetails({...paymentDetails, cvv: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={processing}
                  className="w-full mt-6 bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 transition font-semibold text-lg disabled:opacity-50"
                >
                  {processing ? 'Processing...' : `Pay RWF ${orderData.total.toLocaleString()}`}
                </button>
              </form>

              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600">
                <Shield className="w-4 h-4" />
                <span>Secured by 256-bit SSL encryption</span>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>RWF {orderData.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>RWF {orderData.shipping.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>RWF {orderData.tax.toLocaleString()}</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-xl font-bold text-green-700">
                  <span>Total</span>
                  <span>RWF {orderData.total.toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm text-green-800 font-medium">
                  ✓ 30-day money back guarantee
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;