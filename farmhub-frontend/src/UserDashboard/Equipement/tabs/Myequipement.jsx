import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import MyEquipmentCard from '../components/MyEquipmentCard';

const ShareEquipment = () => {
    const navigate = useNavigate();
    const [myEquipment, setMyEquipment] = useState([]);

    const loadEquipment = () => {
        // Load user's equipment from localStorage
        // In real app, this would filter by current user ID
        const allEquipment = JSON.parse(localStorage.getItem('equipment') || '[]');
        // For demo, showing all equipment. In production, filter by userId
        setMyEquipment(allEquipment);
    };

    useEffect(() => {
        loadEquipment();
        // Refresh when window gains focus (user returns from add/edit page)
        const handleFocus = () => loadEquipment();
        window.addEventListener('focus', handleFocus);
        return () => window.removeEventListener('focus', handleFocus);
    }, []);

    const handleAddEquipment = () => {
        navigate('/dashboard/equipment/add');
    };

    const handleEdit = (equipment) => {
        navigate(`/dashboard/equipment/edit/${equipment.id}`);
    };

    const handleDelete = (equipmentId) => {
        if (window.confirm('Are you sure you want to delete this equipment?')) {
            const updated = myEquipment.filter((eq) => eq.id !== equipmentId);
            setMyEquipment(updated);
            localStorage.setItem('equipment', JSON.stringify(updated));
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">My Equipment</h2>
                <button
                    onClick={handleAddEquipment}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Add Equipment
                </button>
            </div>

            {myEquipment.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myEquipment.map((item) => (
                        <MyEquipmentCard
                            key={item.id}
                            equipment={item}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <p className="text-gray-600 text-lg mb-4">You haven't posted any equipment yet.</p>
                    <button
                        onClick={handleAddEquipment}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        Add Your First Equipment
                    </button>
                </div>
            )}
        </div>
    );
};

export default ShareEquipment;

