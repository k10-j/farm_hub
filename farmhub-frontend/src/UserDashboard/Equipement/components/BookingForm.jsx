import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';

const BookingForm = ({ equipment, availableSlots }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        selectedSlot: '',
        customerName: '',
        customerPhone: '',
        customerLocation: '',
        bookingType: 'hourly', // hourly or daily
        duration: 1
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const calculateTotal = () => {
        if (!formData.selectedSlot || !formData.duration) return 0;
        const rate = formData.bookingType === 'hourly' ? equipment.hourlyRate : equipment.dailyRate;
        return rate * parseInt(formData.duration);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        const newErrors = {};
        if (!formData.selectedSlot) newErrors.selectedSlot = 'Please select a time slot';
        if (!formData.customerName.trim()) newErrors.customerName = 'Name is required';
        if (!formData.customerPhone.trim()) newErrors.customerPhone = 'Phone is required';
        if (!formData.customerLocation.trim()) newErrors.customerLocation = 'Location is required';
        if (!formData.duration || formData.duration < 1) newErrors.duration = 'Invalid duration';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Get selected slot details
        const selectedSlotIndex = parseInt(formData.selectedSlot);
        const selectedSlot = availableSlots[selectedSlotIndex];

        // Create order
        const order = {
            id: `order-${Date.now()}`,
            equipmentId: equipment.id,
            equipmentName: equipment.name,
            customerId: 'current-user-id', // In real app, get from auth context
            customerName: formData.customerName,
            customerPhone: formData.customerPhone,
            customerLocation: formData.customerLocation,
            startDate: selectedSlot.date,
            startTime: selectedSlot.startTime,
            endDate: selectedSlot.date,
            endTime: selectedSlot.endTime,
            bookingType: formData.bookingType,
            duration: parseInt(formData.duration),
            totalAmount: calculateTotal(),
            status: 'PENDING',
            createdAt: new Date().toISOString()
        };

        // Save order
        const orders = JSON.parse(localStorage.getItem('equipmentOrders') || '[]');
        orders.push(order);
        localStorage.setItem('equipmentOrders', JSON.stringify(orders));

        // Mark slot as booked
        const allEquipment = JSON.parse(localStorage.getItem('equipment') || '[]');
        const equipmentIndex = allEquipment.findIndex((eq) => eq.id === equipment.id);
        if (equipmentIndex !== -1) {
            const slotIndex = allEquipment[equipmentIndex].availableSlots.findIndex(
                (slot) =>
                    slot.date === selectedSlot.date &&
                    slot.startTime === selectedSlot.startTime &&
                    slot.endTime === selectedSlot.endTime
            );
            if (slotIndex !== -1) {
                allEquipment[equipmentIndex].availableSlots[slotIndex].booked = true;
                // Check if all slots are booked
                const allBooked = allEquipment[equipmentIndex].availableSlots.every((s) => s.booked);
                if (allBooked) {
                    allEquipment[equipmentIndex].availability = 'UNAVAILABLE';
                }
                localStorage.setItem('equipment', JSON.stringify(allEquipment));
            }
        }

        alert('Booking submitted successfully!');
        navigate('/dashboard/equipment/book');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Time Slot
                </label>
                <select
                    name="selectedSlot"
                    value={formData.selectedSlot}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${errors.selectedSlot ? 'border-red-500' : 'border-gray-300'
                        }`}
                >
                    <option value="">Choose a time slot</option>
                    {availableSlots.map((slot, index) => (
                        <option key={index} value={index}>
                            {slot.date} - {slot.startTime} to {slot.endTime}
                        </option>
                    ))}
                </select>
                {errors.selectedSlot && (
                    <p className="text-red-500 text-sm mt-1">{errors.selectedSlot}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Booking Type</label>
                <div className="flex gap-4">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="bookingType"
                            value="hourly"
                            checked={formData.bookingType === 'hourly'}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        Hourly
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="bookingType"
                            value="daily"
                            checked={formData.bookingType === 'daily'}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        Daily
                    </label>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration ({formData.bookingType === 'hourly' ? 'Hours' : 'Days'})
                </label>
                <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    min="1"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${errors.duration ? 'border-red-500' : 'border-gray-300'
                        }`}
                />
                {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${errors.customerName ? 'border-red-500' : 'border-gray-300'
                        }`}
                />
                {errors.customerName && (
                    <p className="text-red-500 text-sm mt-1">{errors.customerName}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                    type="tel"
                    name="customerPhone"
                    value={formData.customerPhone}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${errors.customerPhone ? 'border-red-500' : 'border-gray-300'
                        }`}
                />
                {errors.customerPhone && (
                    <p className="text-red-500 text-sm mt-1">{errors.customerPhone}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                    type="text"
                    name="customerLocation"
                    value={formData.customerLocation}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${errors.customerLocation ? 'border-red-500' : 'border-gray-300'
                        }`}
                />
                {errors.customerLocation && (
                    <p className="text-red-500 text-sm mt-1">{errors.customerLocation}</p>
                )}
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">Total Amount:</span>
                    <span className="text-2xl font-bold text-green-600">RWF {calculateTotal()}</span>
                </div>
            </div>

            <button
                type="submit"
                className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
                Confirm Booking
            </button>
        </form>
    );
};

export default BookingForm;

