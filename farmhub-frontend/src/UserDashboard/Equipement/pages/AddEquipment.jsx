import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import EquipmentForm from '../components/EquipmentForm';
import { equipmentAPI } from '../../../utils/api';
import { transformEquipmentData } from '../../../utils/dataTransformers';

const AddEquipment = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleBack = (e) => {
        e.preventDefault();
        e.stopPropagation();
        // Navigate directly to share equipment tab
        navigate('/dashboard/equipment/share', { replace: false });
    };

    const handleSubmit = async (formData) => {
        try {
            setLoading(true);

            // Transform frontend data to backend format
            const backendData = transformEquipmentData({
                ...formData,
                availability: 'AVAILABLE', // Default to available
            });

            console.log('Sending equipment data:', backendData);
            const created = await equipmentAPI.create(backendData);

            alert('Equipment added successfully!');
            navigate('/dashboard/equipment/share');
        } catch (error) {
            console.error('Error adding equipment:', error);
            alert('Failed to add equipment: ' + (error.message || 'Unknown error'));
        } finally {
            setLoading(false);
        }
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

