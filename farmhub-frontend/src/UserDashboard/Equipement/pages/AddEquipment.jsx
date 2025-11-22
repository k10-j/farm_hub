import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import EquipmentForm from '../components/EquipmentForm';

const AddEquipment = () => {
    const navigate = useNavigate();

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
        navigate('/dashboard/equipment');
    };

    return (
        <div className="px-6 py-6 max-w-4xl mx-auto">
            <button
                onClick={() => navigate('/dashboard/equipment')}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
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

