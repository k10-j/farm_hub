import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { History, Settings, LogOut, User, ArrowLeft } from 'lucide-react';
import ProfileHistory from './ProfileHistory';
import ProfileSettings from './ProfileSettings';

const ProfilePage = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('history');

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            // Clear user data
            localStorage.removeItem('user');
            localStorage.removeItem('authToken');
            // Navigate to home or login page
            navigate('/');
            window.location.reload();
        }
    };

    const menuItems = [
        { id: 'history', label: 'History', icon: History },
        { id: 'settings', label: 'Settings', icon: Settings }
    ];

    return (
        <div className="px-4 sm:px-6 py-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-6">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Dashboard
                </button>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">My Profile</h1>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Sidebar */}
                <div className="w-full lg:w-64 flex-shrink-0">
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        {/* Profile Header */}
                        <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 text-white">
                            <div className="flex items-center gap-4">
                                <div className="bg-white/20 p-3 rounded-full">
                                    <User className="w-8 h-8" />
                                </div>
                                <div>
                                    <h2 className="font-semibold text-lg">Current User</h2>
                                    <p className="text-sm text-green-100">Farmer</p>
                                </div>
                            </div>
                        </div>

                        {/* Menu Items */}
                        <div className="p-2">
                            {menuItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveSection(item.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${activeSection === item.id
                                                ? 'bg-green-50 text-green-700 font-semibold'
                                                : 'text-gray-700 hover:bg-gray-50'
                                            }`}
                                    >
                                        <Icon className="w-5 h-5" />
                                        <span>{item.label}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Logout Button */}
                        <div className="p-2 border-t border-gray-200">
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium"
                            >
                                <LogOut className="w-5 h-5" />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    <div className="bg-white rounded-xl shadow-md p-6">
                        {activeSection === 'history' && <ProfileHistory />}
                        {activeSection === 'settings' && <ProfileSettings />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;

