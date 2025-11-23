import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import MyEquipmentCard from '../components/MyEquipmentCard';
import BookingsModal from '../components/BookingsModal';
import { equipmentAPI, bookingsAPI } from '../../../utils/api';

const ShareEquipment = () => {
    const navigate = useNavigate();
    const [myEquipment, setMyEquipment] = useState([]);
    const [selectedEquipment, setSelectedEquipment] = useState(null);
    const [showBookingsModal, setShowBookingsModal] = useState(false);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadEquipment = async () => {
        try {
            setLoading(true);
            const data = await equipmentAPI.getMyEquipment();
            setMyEquipment(data || []);
        } catch (error) {
            console.error("Error loading my equipment:", error);
            setMyEquipment([]);
        } finally {
            setLoading(false);
        }
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

    const handleDelete = async (equipmentId) => {
        if (window.confirm('Are you sure you want to delete this equipment?')) {
            try {
                await equipmentAPI.delete(equipmentId);
                setMyEquipment(myEquipment.filter((eq) => eq.id !== equipmentId));
            } catch (error) {
                console.error("Error deleting equipment:", error);
                alert("Failed to delete equipment: " + error.message);
            }
        }
    };

    const handleViewBookings = async (equipment) => {
        try {
            // Get bookings for this equipment
            const allBookings = await bookingsAPI.getMyEquipmentBookings();
            const equipmentBookings = allBookings.filter((booking) =>
                booking.equipment?.id === equipment.id || booking.equipmentId === equipment.id
            );
            setSelectedEquipment(equipment);
            setBookings(equipmentBookings);
            setShowBookingsModal(true);
        } catch (error) {
            console.error("Error loading bookings:", error);
            alert("Failed to load bookings: " + error.message);
        }
    };

    const handleCloseBookingsModal = () => {
        setShowBookingsModal(false);
        setSelectedEquipment(null);
        setBookings([]);
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

            {loading ? (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <p className="text-gray-600 text-lg">Loading your equipment...</p>
                </div>
            ) : myEquipment.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myEquipment.map((item) => (
                        <MyEquipmentCard
                            key={item.id}
                            equipment={item}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onViewBookings={handleViewBookings}
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

            {showBookingsModal && selectedEquipment && (
                <BookingsModal
                    equipment={selectedEquipment}
                    bookings={bookings}
                    onClose={handleCloseBookingsModal}
                />
            )}
        </div>
    );
};

export default ShareEquipment;

