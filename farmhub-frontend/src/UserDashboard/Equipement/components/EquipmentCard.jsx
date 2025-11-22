import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, CheckCircle, XCircle } from 'lucide-react';

const EquipmentCard = ({ equipment }) => {
    const navigate = useNavigate();
    const isAvailable = equipment.availability === 'AVAILABLE';

    const handleViewDetails = () => {
        navigate(`/dashboard/equipment/${equipment.id}`);
    };

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
                    {isAvailable ? 'Available' : 'Unavailable'}
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

                <button
                    onClick={handleViewDetails}
                    className={`w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-white font-medium ${isAvailable
                            ? 'bg-green-600 hover:bg-green-700'
                            : 'bg-gray-400 cursor-not-allowed'
                        }`}
                    disabled={!isAvailable}
                >
                    {isAvailable ? (
                        <>
                            <CheckCircle className="w-4 h-4" /> View Details
                        </>
                    ) : (
                        <>
                            <XCircle className="w-4 h-4" /> Not Available
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default EquipmentCard;

