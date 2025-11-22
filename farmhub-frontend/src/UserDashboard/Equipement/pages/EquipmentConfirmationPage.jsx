import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle, Package, Calendar, Clock, Home, Download, Mail, AlertCircle } from "lucide-react";

const EquipmentConfirmationPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { bookingData, paymentData } = location.state || {};

    if (!bookingData) {
        return (
            <div className="px-6 py-6 max-w-7xl mx-auto">
                <div className="text-center py-12">
                    <p className="text-gray-600 text-lg">No booking confirmation found.</p>
                    <button
                        onClick={() => navigate('/dashboard/equipment/book')}
                        className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                        Go to Equipment
                    </button>
                </div>
            </div>
        );
    }

    const lateReturnCharge = bookingData.equipment?.dailyRate * 0.2 || 0;
    const returnDate = new Date(bookingData.endDate);
    returnDate.setHours(parseInt(bookingData.endTime.split(':')[0]), parseInt(bookingData.endTime.split(':')[1]));

    const handleDownloadReceipt = () => {
        alert("Receipt download functionality would be implemented here");
    };

    const handleEmailReceipt = () => {
        alert(`Receipt will be sent to ${bookingData.customerPhone}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
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
                                ✓
                            </div>
                            <span className="ml-2 font-semibold text-sm sm:text-base">Payment</span>
                        </div>
                        <div className="w-12 sm:w-24 h-1 bg-green-600 mx-2 sm:mx-4"></div>
                        <div className="flex items-center text-green-600">
                            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                                ✓
                            </div>
                            <span className="ml-2 font-semibold text-sm sm:text-base">Confirmation</span>
                        </div>
                    </div>
                </div>

                {/* Success Message */}
                <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 mb-6">
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                            <CheckCircle className="w-12 h-12 text-green-600" />
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Booking Confirmed!</h1>
                        <p className="text-gray-600">Thank you for your booking, {bookingData.customerName}!</p>
                        <p className="text-sm text-gray-500 mt-2">
                            A confirmation message has been sent to <span className="font-semibold">{bookingData.customerPhone}</span>
                        </p>
                    </div>

                    {/* Booking Number */}
                    <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 mb-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Booking Number</p>
                                <p className="text-2xl font-bold text-green-700">{bookingData.id}</p>
                            </div>
                            <Package className="w-12 h-12 text-green-600" />
                        </div>
                    </div>

                    {/* Return Date Notice */}
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                        <div className="flex items-start gap-3">
                            <Calendar className="w-8 h-8 text-amber-600 flex-shrink-0" />
                            <div className="flex-1">
                                <p className="text-sm text-gray-600 mb-1">Return Date & Time</p>
                                <p className="text-lg font-semibold text-gray-800">
                                    {returnDate.toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })} at {bookingData.endTime}
                                </p>
                                <div className="mt-3 flex items-start gap-2">
                                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-xs font-semibold text-yellow-800 mb-1">Late Return Charges Apply</p>
                                        <p className="text-xs text-yellow-700">
                                            If equipment is returned after the return time, you will be charged <strong>RWF {lateReturnCharge.toLocaleString()} per day</strong> for each day late.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Booking Details */}
                    <div className="border-t pt-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Booking Details</h2>

                        {/* Equipment */}
                        <div className="flex gap-4 mb-6 bg-gray-50 p-4 rounded-lg">
                            <img
                                src={bookingData.equipment?.image || `https://source.unsplash.com/400x250/?${bookingData.equipment?.type},farm`}
                                alt={bookingData.equipmentName}
                                className="w-24 h-24 object-cover rounded-lg border-2 border-green-100"
                            />
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-800">{bookingData.equipmentName}</h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    {bookingData.bookingType === 'hourly' ? 'Hourly' : 'Daily'} booking - {bookingData.duration} {bookingData.bookingType === 'hourly' ? 'hour(s)' : 'day(s)'}
                                </p>
                                <p className="text-sm text-gray-600">
                                    From: {bookingData.startDate} {bookingData.startTime}
                                </p>
                                <p className="text-sm text-gray-600">
                                    To: {bookingData.endDate} {bookingData.endTime}
                                </p>
                            </div>
                        </div>

                        {/* Price Breakdown */}
                        <div className="bg-gray-50 p-4 rounded-lg mb-6">
                            <div className="space-y-2">
                                <div className="flex justify-between text-gray-700">
                                    <span>Booking Fee</span>
                                    <span className="font-medium">RWF {bookingData.totalAmount.toLocaleString()}</span>
                                </div>
                                <div className="border-t-2 border-green-200 pt-2 flex justify-between text-xl font-bold text-green-700">
                                    <span>Total Paid</span>
                                    <span>RWF {bookingData.totalAmount.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        {/* Contact & Payment Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-green-600" />
                                    Contact Information
                                </h3>
                                <p className="text-sm text-gray-700">{bookingData.customerName}</p>
                                <p className="text-sm text-gray-700">{bookingData.customerPhone}</p>
                                <p className="text-sm text-gray-700">{bookingData.customerLocation}</p>
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
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                                <h3 className="font-semibold text-gray-800">Equipment Pickup</h3>
                                <p className="text-sm text-gray-600">Contact the owner to arrange pickup at {bookingData.startDate} {bookingData.startTime}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-green-600 font-bold">2</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800">Use Equipment</h3>
                                <p className="text-sm text-gray-600">Use the equipment for your booked duration</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-green-600 font-bold">3</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800">Return Equipment</h3>
                                <p className="text-sm text-gray-600">Return the equipment by {returnDate.toLocaleDateString()} at {bookingData.endTime} to avoid late charges</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Back to Home */}
                <div className="text-center">
                    <button
                        onClick={() => navigate('/dashboard/equipment/book')}
                        className="inline-flex items-center gap-2 bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-900 transition font-semibold"
                    >
                        <Home className="w-5 h-5" />
                        Continue Browsing
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EquipmentConfirmationPage;

