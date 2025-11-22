import React, { useState, useEffect } from 'react';
import OrderCard from '../components/OrderCard';

const OrdersEquipment = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [statusFilter, setStatusFilter] = useState('All');

    useEffect(() => {
        // Load orders from localStorage
        const storedOrders = JSON.parse(localStorage.getItem('equipmentOrders') || '[]');
        // In real app, filter by current user's equipment
        setOrders(storedOrders);
        setFilteredOrders(storedOrders);
    }, []);

    useEffect(() => {
        if (statusFilter === 'All') {
            setFilteredOrders(orders);
        } else {
            setFilteredOrders(orders.filter((order) => order.status === statusFilter));
        }
    }, [statusFilter, orders]);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Equipment Orders</h2>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                    <option value="All">All Orders</option>
                    <option value="PENDING">Pending</option>
                    <option value="CONFIRMED">Confirmed</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="CANCELLED">Cancelled</option>
                </select>
            </div>

            {filteredOrders.length > 0 ? (
                <div className="space-y-4">
                    {filteredOrders.map((order) => (
                        <OrderCard key={order.id} order={order} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <p className="text-gray-600 text-lg">No orders found.</p>
                    <p className="text-gray-500 text-sm mt-2">
                        Orders for your equipment will appear here.
                    </p>
                </div>
            )}
        </div>
    );
};

export default OrdersEquipment;

