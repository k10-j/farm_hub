import React, { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';

const EquipmentForm = ({ onSubmit, initialData }) => {
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        location: '',
        hourlyRate: '',
        dailyRate: '',
        description: '',
        image: '',
        availableSlots: []
    });

    const [slotForm, setSlotForm] = useState({
        date: '',
        startTime: '',
        endTime: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                type: initialData.type || '',
                location: initialData.location || '',
                hourlyRate: initialData.hourlyRate || '',
                dailyRate: initialData.dailyRate || '',
                description: initialData.description || '',
                image: initialData.image || '',
                availableSlots: initialData.availableSlots || []
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const handleSlotChange = (e) => {
        const { name, value } = e.target;
        setSlotForm((prev) => ({ ...prev, [name]: value }));
    };

    const addSlot = () => {
        if (!slotForm.date || !slotForm.startTime || !slotForm.endTime) {
            alert('Please fill in all slot fields');
            return;
        }

        const newSlot = {
            date: slotForm.date,
            startTime: slotForm.startTime,
            endTime: slotForm.endTime,
            booked: false
        };

        setFormData((prev) => ({
            ...prev,
            availableSlots: [...prev.availableSlots, newSlot]
        }));

        setSlotForm({ date: '', startTime: '', endTime: '' });
    };

    const removeSlot = (index) => {
        setFormData((prev) => ({
            ...prev,
            availableSlots: prev.availableSlots.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.type.trim()) newErrors.type = 'Type is required';
        if (!formData.location.trim()) newErrors.location = 'Location is required';
        if (!formData.hourlyRate || formData.hourlyRate <= 0)
            newErrors.hourlyRate = 'Valid hourly rate is required';
        if (!formData.dailyRate || formData.dailyRate <= 0)
            newErrors.dailyRate = 'Valid daily rate is required';
        if (formData.availableSlots.length === 0)
            newErrors.availableSlots = 'At least one time slot is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        onSubmit({
            ...formData,
            hourlyRate: parseFloat(formData.hourlyRate),
            dailyRate: parseFloat(formData.dailyRate)
        });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Equipment Name *
                </label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                    placeholder="e.g., John Deere Tractor"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type *</label>
                <input
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${errors.type ? 'border-red-500' : 'border-gray-300'
                        }`}
                    placeholder="e.g., Tractor, Harvester, etc."
                />
                {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${errors.location ? 'border-red-500' : 'border-gray-300'
                        }`}
                    placeholder="e.g., Main Farm, Eldoret"
                />
                {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hourly Rate (RWF) *
                    </label>
                    <input
                        type="number"
                        name="hourlyRate"
                        value={formData.hourlyRate}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${errors.hourlyRate ? 'border-red-500' : 'border-gray-300'
                            }`}
                    />
                    {errors.hourlyRate && (
                        <p className="text-red-500 text-sm mt-1">{errors.hourlyRate}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Daily Rate (RWF) *
                    </label>
                    <input
                        type="number"
                        name="dailyRate"
                        value={formData.dailyRate}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${errors.dailyRate ? 'border-red-500' : 'border-gray-300'
                            }`}
                    />
                    {errors.dailyRate && (
                        <p className="text-red-500 text-sm mt-1">{errors.dailyRate}</p>
                    )}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="Describe your equipment..."
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="https://example.com/image.jpg"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available Time Slots *
                </label>
                <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                        <input
                            type="date"
                            name="date"
                            value={slotForm.date}
                            onChange={handleSlotChange}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        />
                        <input
                            type="time"
                            name="startTime"
                            value={slotForm.startTime}
                            onChange={handleSlotChange}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        />
                        <input
                            type="time"
                            name="endTime"
                            value={slotForm.endTime}
                            onChange={handleSlotChange}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={addSlot}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                        <Plus className="w-4 h-4" />
                        Add Slot
                    </button>
                </div>

                {formData.availableSlots.length > 0 && (
                    <div className="mt-4 space-y-2">
                        {formData.availableSlots.map((slot, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-3 bg-green-50 rounded-lg"
                            >
                                <span className="text-sm">
                                    {slot.date} - {slot.startTime} to {slot.endTime}
                                    {slot.booked && (
                                        <span className="ml-2 px-2 py-1 bg-red-100 text-red-700 rounded text-xs">
                                            Booked
                                        </span>
                                    )}
                                </span>
                                {!slot.booked && (
                                    <button
                                        type="button"
                                        onClick={() => removeSlot(index)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {errors.availableSlots && (
                    <p className="text-red-500 text-sm mt-1">{errors.availableSlots}</p>
                )}
            </div>

            <button
                type="submit"
                className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
                {initialData ? 'Update Equipment' : 'Add Equipment'}
            </button>
        </form>
    );
};

export default EquipmentForm;

