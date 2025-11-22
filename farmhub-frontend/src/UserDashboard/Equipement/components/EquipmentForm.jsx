import React, { useState, useEffect, useRef } from 'react';
import { Plus, X, Upload, Image as ImageIcon } from 'lucide-react';

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
    const [imagePreview, setImagePreview] = useState('');
    const fileInputRef = useRef(null);

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
            // Set image preview if image exists
            if (initialData.image) {
                setImagePreview(initialData.image);
            }
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

    const handleImageUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            // Check file type
            if (!file.type.startsWith('image/')) {
                alert('Please upload an image file (PNG, JPG, JPEG, or WebP)');
                return;
            }

            // Check file size (max 10MB)
            if (file.size > 10 * 1024 * 1024) {
                alert('Image size must be less than 10MB');
                return;
            }

            // Create preview and convert to base64
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setImagePreview(base64String);
                setFormData((prev) => ({ ...prev, image: base64String }));
            };
            reader.onerror = () => {
                alert('Error reading image file. Please try again.');
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageRemove = () => {
        setImagePreview('');
        setFormData((prev) => ({ ...prev, image: '' }));
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleImageUrlUpload = () => {
        const url = prompt('Enter image URL:');
        if (url) {
            // Basic URL validation
            try {
                new URL(url);
                setImagePreview(url);
                setFormData((prev) => ({ ...prev, image: url }));
            } catch (e) {
                alert('Please enter a valid URL');
            }
        }
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-green-600" />
                        Equipment Image
                    </div>
                </label>

                {imagePreview ? (
                    <div className="relative">
                        <img
                            src={imagePreview}
                            alt="Equipment preview"
                            className="w-full h-64 object-cover rounded-lg border-2 border-gray-300"
                        />
                        <button
                            type="button"
                            onClick={handleImageRemove}
                            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                            aria-label="Remove image"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {/* File Upload */}
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    fileInputRef.current?.click();
                                }
                            }}
                            role="button"
                            tabIndex={0}
                            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-green-500 hover:bg-green-50 transition"
                        >
                            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                            <p className="text-gray-600 font-medium mb-1">Click to upload image</p>
                            <p className="text-sm text-gray-500">PNG, JPG, JPEG, WebP up to 10MB</p>
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            aria-label="Upload equipment image"
                        />

                        {/* URL Upload Option */}
                        <div className="text-center">
                            <span className="text-gray-500 text-sm">or</span>
                        </div>
                        <button
                            type="button"
                            onClick={handleImageUrlUpload}
                            className="w-full py-3 border-2 border-gray-300 rounded-lg text-gray-700 font-medium hover:border-green-500 hover:bg-green-50 transition"
                        >
                            Enter Image URL
                        </button>
                    </div>
                )}
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

