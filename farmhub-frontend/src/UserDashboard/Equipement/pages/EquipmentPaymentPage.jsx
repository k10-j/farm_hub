import React, { useState } from "react";
import { CreditCard, Smartphone, Lock, ArrowLeft, AlertCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const EquipmentPaymentPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const bookingData = location.state?.bookingData;

    const [paymentMethod, setPaymentMethod] = useState("mpesa");
    const [mobileMoneyPhone, setMobileMoneyPhone] = useState("");
    const [mobileMoneyProvider, setMobileMoneyProvider] = useState("mtn");
    const [cardNumber, setCardNumber] = useState("");
    const [cardExpiry, setCardExpiry] = useState("");
    const [cardCVV, setCardCVV] = useState("");
    const [paypalEmail, setPaypalEmail] = useState("");

    if (!bookingData) {
        return (
            <div className="px-6 py-6 max-w-7xl mx-auto">
                <div className="text-center py-12">
                    <p className="text-gray-600 text-lg">No booking data found. Please start over.</p>
                    <button
                        onClick={() => navigate('/dashboard/equipment/book')}
                        className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    const total = bookingData.totalAmount || 0;
    const lateReturnCharge = bookingData.equipment?.dailyRate * 0.2 || 0; // 20% of daily rate per day

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

        // Create order with payment info
        const order = {
            ...bookingData,
            paymentData,
            paymentStatus: 'PAID',
            status: 'CONFIRMED',
            paidAt: new Date().toISOString()
        };

        // Save order
        const orders = JSON.parse(localStorage.getItem('equipmentOrders') || '[]');
        orders.push(order);
        localStorage.setItem('equipmentOrders', JSON.stringify(orders));

        // Mark slot as booked
        const allEquipment = JSON.parse(localStorage.getItem('equipment') || '[]');
        const equipmentIndex = allEquipment.findIndex((eq) => eq.id === bookingData.equipmentId);
        if (equipmentIndex !== -1) {
            const selectedSlot = bookingData.selectedSlot;
            const slotIndex = allEquipment[equipmentIndex].availableSlots.findIndex(
                (slot) =>
                    slot.date === selectedSlot.date &&
                    slot.startTime === selectedSlot.startTime &&
                    slot.endTime === selectedSlot.endTime
            );
            if (slotIndex !== -1) {
                allEquipment[equipmentIndex].availableSlots[slotIndex].booked = true;
                const allBooked = allEquipment[equipmentIndex].availableSlots.every((s) => s.booked);
                if (allBooked) {
                    allEquipment[equipmentIndex].availability = 'UNAVAILABLE';
                }
                localStorage.setItem('equipment', JSON.stringify(allEquipment));
            }
        }

        // Navigate to confirmation
        navigate('/dashboard/equipment/confirmation', {
            state: {
                bookingData: order,
                paymentData
            }
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Progress Steps */}
                <div className="mb-8">
                    <div className="flex items-center justify-center flex-wrap gap-2">
                        <div className="flex items-center text-green-600">
                            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                                ✓
                            </div>
                            <span className="ml-2 font-semibold text-sm sm:text-base">Booking</span>
                        </div>
                        <div className="w-12 sm:w-24 h-1 bg-green-600 mx-2 sm:mx-4"></div>
                        <div className="flex items-center text-green-600">
                            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                                2
                            </div>
                            <span className="ml-2 font-semibold text-sm sm:text-base">Payment</span>
                        </div>
                        <div className="w-12 sm:w-24 h-1 bg-gray-300 mx-2 sm:mx-4"></div>
                        <div className="flex items-center text-gray-400">
                            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold">
                                3
                            </div>
                            <span className="ml-2 font-semibold text-sm sm:text-base">Confirmation</span>
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
                                    <label className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition ${paymentMethod === "mpesa" ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-green-300"
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

                                    <label className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition ${paymentMethod === "mobilemoney" ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-green-300"
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

                                    <label className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition ${paymentMethod === "card" ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-green-300"
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

                                    <label className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition ${paymentMethod === "paypal" ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-green-300"
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
                                        onClick={() => navigate(-1)}
                                        className="w-full text-gray-700 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition font-medium flex items-center justify-center gap-2"
                                    >
                                        <ArrowLeft className="w-5 h-5" />
                                        Back to Booking
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
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Booking Summary</h3>

                            {/* Equipment */}
                            <div className="border-b pb-4 mb-4">
                                <img
                                    src={bookingData.equipment?.image || `https://source.unsplash.com/400x250/?${bookingData.equipment?.type},farm`}
                                    alt={bookingData.equipmentName}
                                    className="w-full h-32 object-cover rounded-lg mb-3 border-2 border-green-100"
                                />
                                <h4 className="font-semibold text-gray-800">{bookingData.equipmentName}</h4>
                                <p className="text-sm text-gray-600 mt-1">
                                    {bookingData.bookingType === 'hourly' ? 'Hourly' : 'Daily'} Booking
                                </p>
                                <p className="text-sm text-gray-600">
                                    Duration: {bookingData.duration} {bookingData.bookingType === 'hourly' ? 'hour(s)' : 'day(s)'}
                                </p>
                            </div>

                            {/* Booking Details */}
                            <div className="border-b pb-4 mb-4">
                                <h4 className="font-semibold text-gray-800 mb-2">Booking Details:</h4>
                                <p className="text-sm text-gray-600">{bookingData.startDate}</p>
                                <p className="text-sm text-gray-600">
                                    {bookingData.startTime} - {bookingData.endTime}
                                </p>
                            </div>

                            {/* Late Return Notice */}
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                                <div className="flex items-start gap-2">
                                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-semibold text-yellow-800 mb-1">Late Return Charges</p>
                                        <p className="text-xs text-yellow-700">
                                            If equipment is returned late, you will be charged <strong>RWF {lateReturnCharge.toLocaleString()} per day</strong> beyond the return date.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Price Breakdown */}
                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between text-gray-700">
                                    <span>Booking Fee</span>
                                    <span className="font-medium">RWF {total.toLocaleString()}</span>
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

export default EquipmentPaymentPage;

