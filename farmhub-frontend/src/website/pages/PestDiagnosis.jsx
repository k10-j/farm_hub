import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UploadIcon, CameraIcon, AlertCircleIcon, CheckCircleIcon, PhoneIcon, LeafIcon } from 'lucide-react';

export function PestDiagnosis() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [showResults, setShowResults] = useState(false);
    const cropTypes = ['Maize', 'Beans', 'Cassava', 'Rice', 'Potato', 'Banana'];
    const symptoms = ['Yellow Leaves', 'Spots', 'Wilting', 'Holes', 'Mold', 'Discoloration'];
    const handleImageUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
                setTimeout(() => setShowResults(true), 1500);
            };
            reader.readAsDataURL(file);
        }
    };
    return <div className="min-h-screen bg-gradient-to-b from-green-50 pt-40 to-white w-full font-serif">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header */}
            <motion.div initial={{
                opacity: 0,
                y: -20
            }} animate={{
                opacity: 1,
                y: 0
            }} className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Pest & Disease Diagnosis
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Upload an image of your crop or describe the symptoms to get instant
                    diagnosis and treatment recommendations
                </p>
            </motion.div>
            <div className="grid lg:grid-cols-2 gap-8">
                {/* Upload Section */}
                <motion.div initial={{
                    opacity: 0,
                    x: -50
                }} animate={{
                    opacity: 1,
                    x: 0
                }} transition={{
                    delay: 0.2
                }}>
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            Upload Crop Image
                        </h2>
                        <div className="border-2 border-dashed border-green-300 rounded-xl p-12 text-center mb-6 hover:border-green-500 transition-colors">
                            {selectedImage ? <div className="relative">
                                <img src={selectedImage} alt="Uploaded crop" className="max-h-64 mx-auto rounded-lg" />
                                <button onClick={() => {
                                    setSelectedImage(null);
                                    setShowResults(false);
                                }} className="mt-4 text-green-600 hover:text-green-700 font-medium">
                                    Upload Different Image
                                </button>
                            </div> : <label className="cursor-pointer">
                                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                <UploadIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
                                <p className="text-lg font-medium text-gray-900 mb-2">
                                    Click to upload or drag and drop
                                </p>
                                <p className="text-sm text-gray-500">
                                    PNG, JPG or JPEG (MAX. 10MB)
                                </p>
                            </label>}
                        </div>
                        <button className="w-full flex items-center justify-center space-x-2 py-3 border-2 border-green-600 text-green-700 rounded-lg font-medium hover:bg-green-50 transition-colors">
                            <CameraIcon className="w-5 h-5" />
                            <span>Take Photo</span>
                        </button>
                        <div className="mt-8">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Or Select Manually
                            </h3>
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Crop Type
                                </label>
                                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                                    <option>Select crop type</option>
                                    {cropTypes.map(crop => <option key={crop}>{crop}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Visible Symptoms
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    {symptoms.map(symptom => <label key={symptom} className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-green-50 cursor-pointer">
                                        <input type="checkbox" className="rounded text-green-600 focus:ring-green-500" />
                                        <span className="text-sm text-gray-700">{symptom}</span>
                                    </label>)}
                                </div>
                            </div>
                            <button className="w-full mt-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors">
                                Analyze Symptoms
                            </button>
                        </div>
                    </div>
                </motion.div>
                {/* Results Section */}
                <motion.div initial={{
                    opacity: 0,
                    x: 50
                }} animate={{
                    opacity: 1,
                    x: 0
                }} transition={{
                    delay: 0.4
                }}>
                    {showResults ? <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="bg-red-100 p-3 rounded-lg">
                                    <AlertCircleIcon className="w-6 h-6 text-red-600" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        Diagnosis Results
                                    </h2>
                                    <p className="text-sm text-gray-600">
                                        95% confidence match
                                    </p>
                                </div>
                            </div>
                            <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded-r-lg mb-6">
                                <h3 className="text-lg font-bold text-red-900 mb-2">
                                    Fall Armyworm Infestation
                                </h3>
                                <p className="text-sm text-red-800">
                                    A serious pest affecting maize crops. Immediate action
                                    recommended.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                                        <CheckCircleIcon className="w-5 h-5 text-green-600 mr-2" />
                                        Prevention Tips
                                    </h4>
                                    <ul className="space-y-2 text-gray-600 text-sm ml-7">
                                        <li>• Practice crop rotation with non-host crops</li>
                                        <li>• Remove and destroy infested plants</li>
                                        <li>• Use pheromone traps for early detection</li>
                                        <li>• Maintain field hygiene</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                                        <LeafIcon className="w-5 h-5 text-green-600 mr-2" />
                                        Treatment Recommendations
                                    </h4>
                                    <ul className="space-y-2 text-gray-600 text-sm ml-7">
                                        <li>• Apply Neem-based biopesticides</li>
                                        <li>• Use Bacillus thuringiensis (Bt) spray</li>
                                        <li>• Hand-pick larvae in early morning</li>
                                        <li>• Apply wood ash in plant whorls</li>
                                    </ul>
                                </div>
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-green-900 mb-2">
                                        Recommended Products
                                    </h4>
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-700">
                                                Neem Oil Solution
                                            </span>
                                            <span className="text-sm font-medium text-green-700">
                                                RWF 5,000
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-700">
                                                Bt Pesticide
                                            </span>
                                            <span className="text-sm font-medium text-green-700">
                                                RWF 8,000
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl shadow-lg p-8 text-white">
                            <h3 className="text-xl font-bold mb-4">
                                Need Expert Advice?
                            </h3>
                            <p className="mb-6 text-green-50">
                                Connect with an agricultural extension officer for
                                personalized guidance
                            </p>
                            <button className="w-full flex items-center justify-center space-x-2 py-3 bg-white text-green-700 rounded-lg font-semibold hover:bg-green-50 transition-colors">
                                <PhoneIcon className="w-5 h-5" />
                                <span>Contact Expert</span>
                            </button>
                        </div>
                    </div> : <div className="bg-white rounded-xl shadow-lg p-8 h-full flex items-center justify-center">
                        <div className="text-center">
                            <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                                <LeafIcon className="w-12 h-12 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                Waiting for Analysis
                            </h3>
                            <p className="text-gray-600">
                                Upload an image or select symptoms to get started
                            </p>
                        </div>
                    </div>}
                </motion.div>
            </div>
        </div>
    </div>;
};

export default PestDiagnosis;