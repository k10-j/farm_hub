import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Clock, User, Phone } from 'lucide-react';
import BookingForm from '../components/BookingForm';

const EquipmentDetail = () => {
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

    if (loading) {
        return (
            <div className="px-6 py-6 max-w-7xl mx-auto">
                <div className="text-center py-12">Loading...</div>
            </div>
        );
    }

    if (!equipment) {
        return (
            <div className="px-6 py-6 max-w-7xl mx-auto">
                <div className="text-center py-12">
                    <p className="text-gray-600 text-lg">Equipment not found.</p>
                    <button
                        onClick={() => navigate('/dashboard/equipment')}
                        className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                        Back to Equipment
                    </button>
                </div>
            </div>
        );
    }

    const availableSlots = equipment.availableSlots?.filter((slot) => !slot.booked) || [];

    return (
        <div className="px-6 py-6 max-w-7xl mx-auto">
            <button
                onClick={() => navigate('/dashboard/equipment')}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
            >
                <ArrowLeft className="w-5 h-5" />
                Back to Equipment
            </button>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Equipment Info */}
                <div>
                    <img
                        src={equipment.image || `https://source.unsplash.com/600x400/?${equipment.type},farm`}
                        alt={equipment.name}
                        className="w-full h-96 object-cover rounded-xl mb-6"
                    />

                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">{equipment.name}</h1>
                        <p className="text-lg text-gray-600 mb-6">{equipment.type}</p>

                        <div className="space-y-4 mb-6">
                            <div className="flex items-center gap-3">
                                <MapPin className="w-5 h-5 text-green-600" />
                                <span className="text-gray-700">{equipment.location}</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-600 mb-1">Per Hour</p>
                                    <p className="text-2xl font-bold text-green-600">RWF {equipment.hourlyRate}</p>
                                </div>
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-600 mb-1">Per Day</p>
                                    <p className="text-2xl font-bold text-green-600">RWF {equipment.dailyRate}</p>
                                </div>
                            </div>

                            {equipment.description && (
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                                    <p className="text-gray-600">{equipment.description}</p>
                                </div>
                            )}

                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">Owner Information</h3>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <User className="w-4 h-4 text-gray-500" />
                                        <span className="text-gray-700">{equipment.owner?.name || 'N/A'}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-gray-500" />
                                        <span className="text-gray-700">{equipment.owner?.phone || 'N/A'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Booking Section */}
                <div>
                    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Availability</h2>

                        {availableSlots.length > 0 ? (
                            <div className="space-y-3">
                                <p className="text-gray-600 mb-4">
                                    This equipment is available for the following time slots:
                                </p>
                                {availableSlots.map((slot, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Calendar className="w-5 h-5 text-green-600" />
                                            <div>
                                                <p className="font-semibold text-gray-900">{slot.date}</p>
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <Clock className="w-4 h-4" />
                                                    <span>
                                                        {slot.startTime} - {slot.endTime}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <span className="px-3 py-1 bg-green-600 text-white text-sm rounded-full font-semibold">
                                            Available
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 bg-red-50 rounded-lg border border-red-200">
                                <p className="text-red-600 font-semibold">No available slots</p>
                                <p className="text-sm text-red-500 mt-2">This equipment is fully booked.</p>
                            </div>
                        )}
                    </div>

                    {availableSlots.length > 0 && (
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Book Equipment</h2>
                            <BookingForm equipment={equipment} availableSlots={availableSlots} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EquipmentDetail;

