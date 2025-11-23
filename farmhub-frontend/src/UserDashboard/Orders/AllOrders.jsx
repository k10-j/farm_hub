import React, { useState, useEffect } from 'react';
import { Filter, Package, Wrench, ShoppingBag, Calendar } from 'lucide-react';
import OrderCard from '../Equipement/components/OrderCard';
import MyOrderCard from '../Equipement/components/MyOrderCard';
import { ordersAPI, bookingsAPI, equipmentAPI } from '../../utils/api';

const AllOrders = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all'); // all, marketplace, equipment
    const [statusFilter, setStatusFilter] = useState('all');
    const [showFilters, setShowFilters] = useState(false);
    const [loading, setLoading] = useState(true);

    // Get current user from localStorage
    const getUser = () => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    };

    const [allOrders, setAllOrders] = useState({
        marketplace: [],
        equipment: [],
        fromMe: [],
        myOrders: []
    });

    useEffect(() => {
        loadAllOrders();
    }, []);

    const loadAllOrders = async () => {
        try {
            setLoading(true);
            const currentUser = getUser();
            if (!currentUser || !currentUser.id) {
                console.error("User not found");
                return;
            }

            // Fetch all data in parallel
            const [marketplaceOrders, equipmentBookings, bookingsForMyEquipment, myEquipment] = await Promise.all([
                ordersAPI.getMyOrders().catch(() => []),
                bookingsAPI.getMyBookings().catch(() => []),
                bookingsAPI.getMyEquipmentBookings().catch(() => []),
                equipmentAPI.getMyEquipment().catch(() => [])
            ]);

            // Get my equipment IDs
            const myEquipmentIds = myEquipment.map(eq => eq.id);

            // Separate bookings: my bookings vs bookings for my equipment
            const myBookings = equipmentBookings.filter(booking =>
                booking.farmer?.id === currentUser.id || booking.farmerId === currentUser.id
            );

            const bookingsForMyEquipmentFiltered = bookingsForMyEquipment.filter(booking =>
                myEquipmentIds.includes(booking.equipment?.id || booking.equipmentId)
            );

            setAllOrders({
                marketplace: marketplaceOrders || [],
                equipment: [...equipmentBookings, ...bookingsForMyEquipment] || [],
                fromMe: bookingsForMyEquipmentFiltered || [],
                myOrders: [...marketplaceOrders, ...myBookings] || []
            });
        } catch (error) {
            console.error("Error loading orders:", error);
            setAllOrders({
                marketplace: [],
                equipment: [],
                fromMe: [],
                myOrders: []
            });
        } finally {
            setLoading(false);
        }
    };

    const getFilteredOrders = () => {
        let orders = [];

        // Determine which orders to show based on activeTab
        if (activeTab === 'all') {
            // Combine marketplace and equipment orders
            orders = [
                ...allOrders.marketplace.map(o => ({ ...o, orderType: 'marketplace' })),
                ...allOrders.equipment.map(o => ({ ...o, orderType: 'equipment' }))
            ];
        } else if (activeTab === 'fromMe') {
            // Orders for my products/equipment
            orders = [
                ...allOrders.marketplace.filter(o => o.sellerId === currentUserId).map(o => ({ ...o, orderType: 'marketplace' })),
                ...allOrders.fromMe.map(o => ({ ...o, orderType: 'equipment' }))
            ];
        } else if (activeTab === 'myOrders') {
            // Orders I made
            orders = [
                ...allOrders.marketplace.filter(o => o.buyerId === currentUserId).map(o => ({ ...o, orderType: 'marketplace' })),
                ...allOrders.myOrders.map(o => ({ ...o, orderType: 'equipment' }))
            ];
        }

        // Apply type filter
        if (typeFilter !== 'all') {
            orders = orders.filter(o => o.orderType === typeFilter);
        }

        // Apply status filter
        if (statusFilter !== 'all') {
            orders = orders.filter(o => o.status === statusFilter);
        }

        return orders;
    };

    const filteredOrders = getFilteredOrders();

    return (
        <div className="px-4 sm:px-6 py-6 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">All Orders</h1>
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors sm:hidden"
                >
                    <Filter className="w-5 h-5" />
                    Filters
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Side Filters - Hidden on mobile, shown on desktop */}
                <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-64 flex-shrink-0`}>
                    <div className="bg-white rounded-xl shadow-md p-6 space-y-6 sticky top-24">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Filter className="w-5 h-5" />
                                Filters
                            </h3>
                        </div>

                        {/* Order Type Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Order Type
                            </label>
                            <div className="space-y-2">
                                <button
                                    onClick={() => setActiveTab('all')}
                                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${activeTab === 'all'
                                        ? 'bg-green-100 text-green-700 font-semibold'
                                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    All Orders
                                </button>
                                <button
                                    onClick={() => setActiveTab('fromMe')}
                                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${activeTab === 'fromMe'
                                        ? 'bg-green-100 text-green-700 font-semibold'
                                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    Orders for Me
                                </button>
                                <button
                                    onClick={() => setActiveTab('myOrders')}
                                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${activeTab === 'myOrders'
                                        ? 'bg-green-100 text-green-700 font-semibold'
                                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    My Orders
                                </button>
                            </div>
                        </div>

                        {/* Category Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category
                            </label>
                            <select
                                value={typeFilter}
                                onChange={(e) => setTypeFilter(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            >
                                <option value="all">All Categories</option>
                                <option value="marketplace">Marketplace</option>
                                <option value="equipment">Equipment</option>
                            </select>
                        </div>

                        {/* Status Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Status
                            </label>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            >
                                <option value="all">All Status</option>
                                <option value="PENDING">Pending</option>
                                <option value="CONFIRMED">Confirmed</option>
                                <option value="COMPLETED">Completed</option>
                                <option value="CANCELLED">Cancelled</option>
                                <option value="DELIVERED">Delivered</option>
                            </select>
                        </div>

                        {/* Stats */}
                        <div className="pt-4 border-t border-gray-200">
                            <h4 className="text-sm font-semibold text-gray-700 mb-3">Quick Stats</h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Total Orders:</span>
                                    <span className="font-semibold">{filteredOrders.length}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Pending:</span>
                                    <span className="font-semibold text-yellow-600">
                                        {filteredOrders.filter(o => o.status === 'PENDING').length}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Completed:</span>
                                    <span className="font-semibold text-green-600">
                                        {filteredOrders.filter(o => o.status === 'COMPLETED' || o.status === 'DELIVERED').length}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    {/* Tabs for mobile/tablet */}
                    <div className="lg:hidden mb-6">
                        <div className="flex space-x-2 border-b border-gray-200">
                            <button
                                onClick={() => setActiveTab('all')}
                                className={`pb-3 px-4 font-medium text-sm transition-colors ${activeTab === 'all'
                                    ? 'text-green-700 border-b-2 border-green-700'
                                    : 'text-gray-600'
                                    }`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setActiveTab('fromMe')}
                                className={`pb-3 px-4 font-medium text-sm transition-colors ${activeTab === 'fromMe'
                                    ? 'text-green-700 border-b-2 border-green-700'
                                    : 'text-gray-600'
                                    }`}
                            >
                                For Me
                            </button>
                            <button
                                onClick={() => setActiveTab('myOrders')}
                                className={`pb-3 px-4 font-medium text-sm transition-colors ${activeTab === 'myOrders'
                                    ? 'text-green-700 border-b-2 border-green-700'
                                    : 'text-gray-600'
                                    }`}
                            >
                                My Orders
                            </button>
                        </div>
                    </div>

                    {/* Orders List */}
                    {loading ? (
                        <div className="text-center py-12 bg-gray-50 rounded-xl">
                            <p className="text-gray-600 text-lg">Loading orders...</p>
                        </div>
                    ) : filteredOrders.length > 0 ? (
                        <div className="space-y-4">
                            {filteredOrders.map((order) => (
                                <div key={order.id} className="relative">
                                    {/* Order Type Badge */}
                                    <div className="absolute top-4 right-4 z-10">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${order.orderType === 'marketplace'
                                                ? 'bg-blue-100 text-blue-700'
                                                : 'bg-purple-100 text-purple-700'
                                                }`}
                                        >
                                            {order.orderType === 'marketplace' ? (
                                                <span className="flex items-center gap-1">
                                                    <ShoppingBag className="w-3 h-3" />
                                                    Marketplace
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1">
                                                    <Wrench className="w-3 h-3" />
                                                    Equipment
                                                </span>
                                            )}
                                        </span>
                                    </div>

                                    {/* Render appropriate card */}
                                    {order.orderType === 'equipment' ? (
                                        activeTab === 'myOrders' ? (
                                            <MyOrderCard order={order} />
                                        ) : (
                                            <OrderCard order={order} />
                                        )
                                    ) : (
                                        <MarketplaceOrderCard order={order} />
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-xl">
                            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600 text-lg">No orders found</p>
                            <p className="text-gray-500 text-sm mt-2">
                                {activeTab === 'all'
                                    ? 'You don\'t have any orders yet.'
                                    : activeTab === 'fromMe'
                                        ? 'No one has ordered from you yet.'
                                        : 'You haven\'t placed any orders yet.'}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Marketplace Order Card Component
const MarketplaceOrderCard = ({ order }) => {
    return (
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                        {order.product || order.productName || 'Product'}
                    </h3>
                    <p className="text-sm text-gray-600">Order ID: {order.id}</p>
                </div>
                <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${order.status === 'DELIVERED' || order.status === 'COMPLETED'
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
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{order.date || order.createdAt}</span>
                </div>

                <div className="pt-3 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 text-sm">Total Amount:</span>
                        <span className="text-green-600 font-bold">RWF {order.price || order.totalAmount || 0}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllOrders;

