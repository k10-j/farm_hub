import React, { useEffect } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { initializeEquipmentData } from './utils/equipmentUtils';

const EquipementDash = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Initialize sample data on mount
        initializeEquipmentData();

        // Redirect to book tab if on base equipment route (exact match)
        if (location.pathname === '/dashboard/equipment' || location.pathname === '/dashboard/equipment/') {
            navigate('book', { replace: true });
        }
    }, [location.pathname, navigate]);

    const tabs = [
        { id: 'book', label: 'Book Equipment', path: 'book' },
        { id: 'share', label: 'Share Your Equipment', path: 'share' },
        { id: 'orders', label: 'Orders', path: 'orders' }
    ];

    // Check if current path is a detail/add/edit page
    const isDetailPage = location.pathname.includes('/detail/') ||
        location.pathname.includes('/add') ||
        location.pathname.includes('/edit/');

    return (
        <div className="px-6 py-6 max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Equipment Hub</h1>

            {/* Tabs - Show only on main equipment pages, not on detail/add/edit */}
            {!isDetailPage && (
                <div className="border-b border-gray-200 mb-6">
                    <nav className="flex space-x-8" role="tablist">
                        {tabs.map((tab) => (
                            <NavLink
                                key={tab.id}
                                to={tab.path}
                                end={tab.path === 'book'}
                                role="tab"
                                className={({ isActive }) =>
                                    `block pb-3 px-4 py-2 -mb-px font-medium text-sm transition-colors cursor-pointer select-none ${isActive
                                        ? 'text-green-700 border-b-2 border-green-700 font-semibold'
                                        : 'text-gray-600 hover:text-gray-900 hover:border-b-2 hover:border-gray-300'
                                    }`}
                            >
                                {tab.label}
                            </NavLink>
                        ))}
                    </nav>
                </div>
            )}

            {/* Tab Content */}
            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default EquipementDash;
