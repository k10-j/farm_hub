import React, { useState, useEffect } from 'react';
import EquipmentCard from '../components/EquipmentCard';
import { equipmentAPI } from '../../../utils/api';

const BookEquipment = () => {
    const [equipment, setEquipment] = useState([]);
    const [filteredEquipment, setFilteredEquipment] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadEquipment();
    }, []);

    const loadEquipment = async () => {
        try {
            setLoading(true);
            const data = await equipmentAPI.getAll();
            // Filter for available equipment
            const availableEquipment = data.filter(
                (eq) => eq.availability === 'AVAILABLE' || eq.availabilityStatus === 'AVAILABLE'
            );
            setEquipment(availableEquipment);
            setFilteredEquipment(availableEquipment);
        } catch (error) {
            console.error("Error loading equipment:", error);
            setEquipment([]);
            setFilteredEquipment([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let filtered = equipment;

        if (searchTerm) {
            filtered = filtered.filter(
                (eq) =>
                    eq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    eq.location.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (typeFilter !== 'All') {
            filtered = filtered.filter((eq) => eq.type === typeFilter);
        }

        setFilteredEquipment(filtered);
    }, [searchTerm, typeFilter, equipment]);

    const equipmentTypes = ['All', ...new Set(equipment.map((eq) => eq.type))];

    return (
        <div>
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <input
                    type="text"
                    placeholder="Search equipment..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                    {equipmentTypes.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>

            {loading ? (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <p className="text-gray-600 text-lg">Loading equipment...</p>
                </div>
            ) : filteredEquipment.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEquipment.map((item) => (
                        <EquipmentCard key={item.id} equipment={item} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <p className="text-gray-600 text-lg">No available equipment found.</p>
                    <p className="text-gray-500 text-sm mt-2">Try adjusting your search or filters.</p>
                </div>
            )}
        </div>
    );
};

export default BookEquipment;

