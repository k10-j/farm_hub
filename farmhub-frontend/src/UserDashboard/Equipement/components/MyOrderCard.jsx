import React from 'react';
import { Calendar, MapPin, Phone, Package } from 'lucide-react';

const MyOrderCard = ({ order }) => {
    return (
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">{order.equipmentName}</h3>
                    <p className="text-sm text-gray-600">Order ID: {order.id}</p>
                </div>
                <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${order.status === 'CONFIRMED'
                            ? 'bg-green-100 text-green-700'
                            : order.status === 'PENDING'
                                ? 'bg-yellow-100 text-yellow-700'
                                : order.status === 'COMPLETED'
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'bg-gray-100 text-gray-700'
                        }`}
                >
                    {order.status}
                </span>
            </div>

            <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-600">
                    <Package className="w-4 h-4" />
                    <span className="text-sm">
                        {order.bookingType === 'hourly' ? 'Hourly' : 'Daily'} booking - {order.duration}{' '}
                        {order.bookingType === 'hourly' ? 'hour(s)' : 'day(s)'}
                    </span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <div className="text-sm">
                        <p>
                            <span className="font-semibold">From:</span> {order.startDate} {order.startTime}
                        </p>
                        <p>
                            <span className="font-semibold">To:</span> {order.endDate} {order.endTime}
                        </p>
                    </div>
                </div>

                <div className="pt-3 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 text-sm">Total Amount:</span>
                        <span className="text-green-600 font-bold">RWF {order.totalAmount}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyOrderCard;

