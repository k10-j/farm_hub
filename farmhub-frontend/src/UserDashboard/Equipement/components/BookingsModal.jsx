import React from 'react';
import { X, Calendar, User, Phone, MapPin } from 'lucide-react';

const BookingsModal = ({ equipment, bookings, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Bookings for {equipment.name}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6">
                    {bookings.length > 0 ? (
                        <div className="space-y-4">
                            {bookings.map((booking) => (
                                <div
                                    key={booking.id}
                                    className="bg-gray-50 rounded-lg p-5 border border-gray-200"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {booking.customerName}
                                            </h3>
                                            <p className="text-sm text-gray-600">Order ID: {booking.id}</p>
                                        </div>
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.status === 'CONFIRMED'
                                                    ? 'bg-green-100 text-green-700'
                                                    : booking.status === 'PENDING'
                                                        ? 'bg-yellow-100 text-yellow-700'
                                                        : booking.status === 'COMPLETED'
                                                            ? 'bg-blue-100 text-blue-700'
                                                            : 'bg-gray-100 text-gray-700'
                                                }`}
                                        >
                                            {booking.status}
                                        </span>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Phone className="w-4 h-4" />
                                            <span className="text-sm">{booking.customerPhone}</span>
                                        </div>

                                        <div className="flex items-center gap-2 text-gray-600">
                                            <MapPin className="w-4 h-4" />
                                            <span className="text-sm">{booking.customerLocation}</span>
                                        </div>

                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Calendar className="w-4 h-4" />
                                            <div className="text-sm">
                                                <p>
                                                    <span className="font-semibold">From:</span> {booking.startDate}{' '}
                                                    {booking.startTime}
                                                </p>
                                                <p>
                                                    <span className="font-semibold">To:</span> {booking.endDate}{' '}
                                                    {booking.endTime}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="pt-3 border-t border-gray-200">
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600 text-sm">Total Amount:</span>
                                                <span className="text-green-600 font-bold">
                                                    RWF {booking.totalAmount}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-600 text-lg">No bookings found for this equipment.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookingsModal;

