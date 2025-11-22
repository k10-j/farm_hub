import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import EquipmentForm from '../components/EquipmentForm';

const EditEquipment = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [equipment, setEquipment] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const allEquipment = JSON.parse(localStorage.getItem('equipment') || '[]');
        const found = allEquipment.find((eq) => eq.id === id);
        setEquipment(found);
        setLoading(false);
    }, [id]);

    const handleBack = (e) => {
        e.preventDefault();
        e.stopPropagation();
        // Navigate directly to share equipment tab
        navigate('/dashboard/equipment/share', { replace: false });
    };

    const handleSubmit = (formData) => {
        const allEquipment = JSON.parse(localStorage.getItem('equipment') || '[]');
        const index = allEquipment.findIndex((eq) => eq.id === id);

        if (index !== -1) {
            allEquipment[index] = {
                ...allEquipment[index],
                ...formData,
                updatedAt: new Date().toISOString()
            };
            localStorage.setItem('equipment', JSON.stringify(allEquipment));
            alert('Equipment updated successfully!');
            navigate('/dashboard/equipment/share');
        }
    };

    if (loading) {
        return (
            <div className="px-6 py-6 max-w-4xl mx-auto">
                <div className="text-center py-12">Loading...</div>
            </div>
        );
    }

    if (!equipment) {
        return (
            <div className="px-6 py-6 max-w-4xl mx-auto">
                <div className="text-center py-12">
                    <p className="text-gray-600 text-lg">Equipment not found.</p>
                    <button
                        type="button"
                        onClick={handleBack}
                        className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors cursor-pointer"
                    >
                        Back to Equipment
                    </button>
                </div>
            </div>
        );
    }

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

            <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Equipment</h1>

            <EquipmentForm onSubmit={handleSubmit} initialData={equipment} />
        </div>
    );
};

export default EditEquipment;

