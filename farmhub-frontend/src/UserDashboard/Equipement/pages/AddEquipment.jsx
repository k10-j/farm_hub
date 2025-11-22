import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import EquipmentForm from '../components/EquipmentForm';

const AddEquipment = () => {
    const navigate = useNavigate();

    const handleBack = (e) => {
        e.preventDefault();
        e.stopPropagation();
        // Navigate directly to share equipment tab
        navigate('/dashboard/equipment/share', { replace: false });
    };

    const handleSubmit = (formData) => {
        const newEquipment = {
            id: `eq-${Date.now()}`,
            ...formData,
            availability: 'AVAILABLE',
            owner: {
                id: 'current-user-id', // In real app, get from auth context
                name: 'Current User',
                email: 'user@example.com',
                phone: '1234567890'
            },
            createdAt: new Date().toISOString()
        };

        const existingEquipment = JSON.parse(localStorage.getItem('equipment') || '[]');
        existingEquipment.push(newEquipment);
        localStorage.setItem('equipment', JSON.stringify(existingEquipment));

        alert('Equipment added successfully!');
        navigate('/dashboard/equipment/share');
    };

    return (
        <div className="px-6 py-6 max-w-4xl mx-auto">
            <button
                type="button"
                onClick={handleBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors cursor-pointer hover:underline focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded px-2 py-1"
            >
                <ArrowLeft className="w-5 h-5" />
                Back to Equipment
            </button>

            <h1 className="text-3xl font-bold text-gray-900 mb-6">Add New Equipment</h1>

            <EquipmentForm onSubmit={handleSubmit} />
        </div>
    );
};

export default AddEquipment;

