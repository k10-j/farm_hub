import React, { useState, useEffect } from 'react';
import { Calendar, Package, Wrench, ShoppingBag, Clock } from 'lucide-react';

const ProfileHistory = () => {
    const [history, setHistory] = useState({
        orders: [],
        equipment: [],
        activities: []
    });

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = () => {
        // Load marketplace orders
        const marketplaceOrders = JSON.parse(localStorage.getItem('marketplaceOrders') || '[]');

        // Load equipment orders
        const equipmentOrders = JSON.parse(localStorage.getItem('equipmentOrders') || '[]');

        // Load equipment
        const allEquipment = JSON.parse(localStorage.getItem('equipment') || '[]');

        // Combine and sort by date
        const allOrders = [
            ...marketplaceOrders.map(o => ({ ...o, type: 'marketplace', date: o.createdAt || o.date })),
            ...equipmentOrders.map(o => ({ ...o, type: 'equipment', date: o.createdAt }))
        ].sort((a, b) => new Date(b.date) - new Date(a.date));

        // Create activity log
        const activities = [
            ...allOrders.map(order => ({
                id: `activity-${order.id}`,
                type: order.type === 'marketplace' ? 'order' : 'booking',
                title: order.type === 'marketplace'
                    ? `Ordered ${order.product || order.productName || 'Product'}`
                    : `Booked ${order.equipmentName}`,
                description: order.type === 'marketplace'
                    ? `Order #${order.id} - RWF ${order.price || order.totalAmount || 0}`
                    : `Booking #${order.id} - ${order.startDate} ${order.startTime}`,
                date: order.date,
                status: order.status
            })),
            ...allEquipment.map(eq => ({
                id: `activity-${eq.id}`,
                type: 'equipment',
                title: `Posted ${eq.name}`,
                description: `${eq.type} - ${eq.location}`,
                date: eq.createdAt,
                status: eq.availability
            }))
        ].sort((a, b) => new Date(b.date) - new Date(a.date));

        setHistory({
            orders: allOrders,
            equipment: allEquipment,
            activities: activities.slice(0, 50) // Limit to 50 most recent
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'COMPLETED':
            case 'DELIVERED':
            case 'CONFIRMED':
                return 'bg-green-100 text-green-700';
            case 'PENDING':
                return 'bg-yellow-100 text-yellow-700';
            case 'CANCELLED':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Activity History</h2>

            {history.activities.length > 0 ? (
                <div className="space-y-4">
                    {history.activities.map((activity) => (
                        <div
                            key={activity.id}
                            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-start gap-4">
                                <div className={`p-2 rounded-lg ${activity.type === 'order'
                                        ? 'bg-blue-100 text-blue-600'
                                        : activity.type === 'booking'
                                            ? 'bg-purple-100 text-purple-600'
                                            : 'bg-green-100 text-green-600'
                                    }`}>
                                    {activity.type === 'order' ? (
                                        <ShoppingBag className="w-5 h-5" />
                                    ) : activity.type === 'booking' ? (
                                        <Wrench className="w-5 h-5" />
                                    ) : (
                                        <Package className="w-5 h-5" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{activity.title}</h3>
                                            <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                                        </div>
                                        {activity.status && (
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(activity.status)}`}>
                                                {activity.status}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-500 text-sm mt-2">
                                        <Clock className="w-4 h-4" />
                                        <span>{formatDate(activity.date)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 text-lg">No activity history yet</p>
                    <p className="text-gray-500 text-sm mt-2">
                        Your orders, bookings, and activities will appear here.
                    </p>
                </div>
            )}
        </div>
    );
};

export default ProfileHistory;

