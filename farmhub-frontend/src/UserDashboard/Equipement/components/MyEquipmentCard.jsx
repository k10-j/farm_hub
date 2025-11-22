import React from 'react';
import { MapPin, Edit, Trash2 } from 'lucide-react';

const MyEquipmentCard = ({ equipment, onEdit, onDelete }) => {
    const availableSlots = equipment.availableSlots?.filter(slot => !slot.booked) || [];
    const isAvailable = availableSlots.length > 0;

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
                <img
                    src={equipment.image || `https://source.unsplash.com/400x250/?${equipment.type},farm`}
                    alt={equipment.name}
                    className="h-48 w-full object-cover"
                />
                <div
                    className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full font-semibold ${isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}
                >
                    {isAvailable ? `${availableSlots.length} slots available` : 'Fully booked'}
                </div>
            </div>

            <div className="p-5 space-y-3">
                <h3 className="text-lg font-semibold">{equipment.name}</h3>
                <p className="text-sm text-gray-600">{equipment.type}</p>

                <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <MapPin className="w-4 h-4 text-green-600" />
                    <span>{equipment.location}</span>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-600 text-sm">Per Hour</p>
                        <p className="text-green-600 font-bold">RWF {equipment.hourlyRate}</p>
                    </div>
                    <div>
                        <p className="text-gray-600 text-sm">Per Day</p>
                        <p className="text-green-600 font-bold">RWF {equipment.dailyRate}</p>
                    </div>
                </div>

                <div className="flex gap-2 mt-4">
                    <button
                        onClick={() => onEdit(equipment)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        <Edit className="w-4 h-4" /> Edit
                    </button>
                    <button
                        onClick={() => onDelete(equipment.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                        <Trash2 className="w-4 h-4" /> Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MyEquipmentCard;

