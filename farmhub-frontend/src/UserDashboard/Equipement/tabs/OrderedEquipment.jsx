import React, { useState, useEffect } from 'react';
import OrderCard from '../components/OrderCard';
import MyOrderCard from '../components/MyOrderCard';

const OrdersEquipment = () => {
    const [myOrders, setMyOrders] = useState([]);
    const [ordersForMe, setOrdersForMe] = useState([]);
    const [activeTab, setActiveTab] = useState('forMe');
    const [statusFilter, setStatusFilter] = useState('All');

    // Mock current user ID - in real app, get from auth context
    const currentUserId = 'current-user-id';

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = () => {
        const allOrders = JSON.parse(localStorage.getItem('equipmentOrders') || '[]');
        const allEquipment = JSON.parse(localStorage.getItem('equipment') || '[]');

        // Enrich orders with equipment data
        const enrichedOrders = allOrders.map(order => {
            const equipment = allEquipment.find(eq => eq.id === order.equipmentId);
            return {
                ...order,
                equipment: equipment
            };
        });

        // Orders I made (where I'm the customer)
        // Filter by customerId or customerName for demo purposes
        const myBookings = enrichedOrders.filter((order) => {
            return order.customerId === currentUserId ||
                order.customerName === 'Current User' ||
                order.customerName === 'Test User'; // For demo compatibility
        });

        // Orders for my equipment (where equipment owner is me)
        const myEquipmentIds = allEquipment
            .filter((eq) => eq.owner?.id === currentUserId)
            .map((eq) => eq.id);
        const ordersForMyEquipment = enrichedOrders.filter((order) =>
            myEquipmentIds.includes(order.equipmentId)
        );

        setMyOrders(myBookings);
        setOrdersForMe(ordersForMyEquipment);
    };

    const getFilteredOrders = (orders) => {
        if (statusFilter === 'All') {
            return orders;
        }
        return orders.filter((order) => order.status === statusFilter);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Equipment Orders</h2>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                    <option value="All">All Status</option>
                    <option value="PENDING">Pending</option>
                    <option value="CONFIRMED">Confirmed</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="CANCELLED">Cancelled</option>
                </select>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
                <div className="flex space-x-8">
                    <button
                        onClick={() => setActiveTab('forMe')}
                        className={`pb-3 px-1 font-medium text-sm transition-colors ${activeTab === 'forMe'
                            ? 'text-green-700 border-b-2 border-green-700'
                            : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Orders for My Equipment ({ordersForMe.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('myOrders')}
                        className={`pb-3 px-1 font-medium text-sm transition-colors ${activeTab === 'myOrders'
                            ? 'text-green-700 border-b-2 border-green-700'
                            : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        My Orders ({myOrders.length})
                    </button>
                </div>
            </div>

            {/* Content */}
            {activeTab === 'forMe' ? (
                <>
                    {getFilteredOrders(ordersForMe).length > 0 ? (
                        <div className="space-y-4">
                            {getFilteredOrders(ordersForMe).map((order) => (
                                <OrderCard key={order.id} order={order} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-xl">
                            <p className="text-gray-600 text-lg">No orders for your equipment.</p>
                            <p className="text-gray-500 text-sm mt-2">
                                When people book your equipment, orders will appear here.
                            </p>
                        </div>
                    )}
                </>
            ) : (
                <>
                    {getFilteredOrders(myOrders).length > 0 ? (
                        <div className="space-y-4">
                            {getFilteredOrders(myOrders).map((order) => (
                                <MyOrderCard key={order.id} order={order} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-xl">
                            <p className="text-gray-600 text-lg">You haven't made any orders yet.</p>
                            <p className="text-gray-500 text-sm mt-2">
                                Book equipment from the "Book Equipment" tab to see your orders here.
                            </p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default OrdersEquipment;

