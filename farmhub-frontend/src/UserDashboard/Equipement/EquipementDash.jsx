import React, { useState, useEffect } from 'react';
import BookEquipment from './tabs/BookEquipement';
import ShareEquipment from './tabs/Myequipement';
import OrdersEquipment from './tabs/OrderedEquipment';
import { initializeEquipmentData } from './utils/equipmentUtils';

const EquipementDash = () => {
    const [activeTab, setActiveTab] = useState('book');

    useEffect(() => {
        // Initialize sample data on mount
        initializeEquipmentData();
    }, []);

    const tabs = [
        { id: 'book', label: 'Book Equipment' },
        { id: 'share', label: 'Share Your Equipment' },
        { id: 'orders', label: 'Orders' }
    ];

    return (
        <div className="px-6 py-6 max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Equipment Hub</h1>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
                <div className="flex space-x-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`pb-3 px-1 font-medium text-sm transition-colors ${activeTab === tab.id
                                    ? 'text-green-700 border-b-2 border-green-700'
                                    : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div>
                {activeTab === 'book' && <BookEquipment />}
                {activeTab === 'share' && <ShareEquipment />}
                {activeTab === 'orders' && <OrdersEquipment />}
            </div>
        </div>
    );
};

export default EquipementDash;

