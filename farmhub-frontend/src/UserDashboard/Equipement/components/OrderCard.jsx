import React from 'react';
import { Calendar, User, Phone, MapPin } from 'lucide-react';

const OrderCard = ({ order }) => {
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
                                : 'bg-gray-100 text-gray-700'
                        }`}
                >
                    {order.status}
                </span>
            </div>

            <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-600">
                    <User className="w-4 h-4" />
                    <span className="text-sm">{order.customerName}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{order.customerPhone}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{order.customerLocation}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <div className="text-sm">
                        <p>From: {order.startDate} {order.startTime}</p>
                        <p>To: {order.endDate} {order.endTime}</p>
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

export default OrderCard;

