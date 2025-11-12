import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UploadIcon, CameraIcon, LeafIcon, AlertCircleIcon, XIcon, Loader2Icon } from 'lucide-react';

export function PestDiagnosis() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [showResults, setShowResults] = useState(false);
    const [loading, setLoading] = useState(false);
    const [reading, setReading] = useState(false);
    const [diagnosisResult, setDiagnosisResult] = useState(null); // This holds the API response
    const [error, setError] = useState(null);

    const cropTypes = ['Maize', 'Beans', 'Cassava', 'Rice', 'Potato', 'Banana'];
    const symptoms = ['Yellow Leaves', 'Spots', 'Wilting', 'Holes', 'Mold', 'Discoloration'];

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setLoading(true); // <-- FIX: Start loading
            setError(null);
            setReading(true);

            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
                setReading(false); // Done reading file
            };
            reader.readAsDataURL(file);

            // Prepare form data for backend
            const formData = new FormData();
            formData.append("image", file);

            try {
                const res = await fetch("https://farm-hub.onrender.com/api/detect-disease", {
                    method: "POST",
                    body: formData,
                });

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const data = await res.json();
                console.log("Diagnosis result:", data);

                setDiagnosisResult(data); // Set the result
                setShowResults(true); // Show the results section
            } catch (error) {
                console.error("Image analysis failed:", error);
                setError(error.message); // Set error state
            } finally {
                setLoading(false); // <-- FIX: Stop loading
            }
        }
    };

    // <-- FIX: Added missing function
    const handleManualAnalysis = () => {
        console.log("Manual analysis clicked");
        // Placeholder logic for manual analysis
        setLoading(true);
        setError(null);
        setSelectedImage(null); // Clear image if one was selected
        
        // Simulate an API call
        setTimeout(() => {
            setDiagnosisResult({
                disease: "Manual Symptom Analysis",
                confidence: "N/A",
                treatment: "Please consult an agronomist with the symptoms you have selected for the best advice.",
                causes: "Based on user-selected symptoms."
            });
            setShowResults(true);
            setLoading(false);
        }, 1500);
    };

    const resetState = () => {
        setSelectedImage(null);
        setShowResults(false);
        setDiagnosisResult(null);
        setError(null);
        setLoading(false);
        setReading(false);
    };


    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 pt-40 to-white w-full font-serif">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="text-center mb-12"
                >
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
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            {/* FIX: The code block from <h2..> to </h2> was duplicated
                              and broken. I have removed the entire duplicated section.
                              This was the cause of your build failure.
                            */}
                            
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                Upload Crop Image
                            </h2>

                            {/* This is the correct, single upload box */}
                            <div className="border-2 border-dashed border-green-300 rounded-xl p-12 text-center mb-6 hover:border-green-500 transition-colors">
                                {reading ? (
                                    <div className="flex flex-col items-center justify-center space-y-4">
                                        <Loader2Icon className="w-8 h-8 text-green-600 animate-spin" />
                                        <p className="text-gray-700 font-medium">
                                            Reading image file...
                                        </p>
                                    </div>
                                ) : selectedImage ? (
                                    <div className="relative">
                                        <img
                                            src={selectedImage}
                                            alt="Uploaded crop"
                                            className="max-h-64 mx-auto rounded-lg"
                                        />
                                        <button
                                            onClick={resetState} // Use a reset function
                                            className="mt-4 text-green-600 hover:text-green-700 font-medium"
                                        >
                                            Upload Different Image
                                        </button>
                                    </div>
                                ) : (
                                    <label className="cursor-pointer">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                        />
                                        <UploadIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
                                        <p className="text-lg font-medium text-gray-900 mb-2">
                                            Click to upload or drag and drop
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            PNG, JPG, or WebP (MAX. 10MB)
                                        </p>
                                    </label>
                                )}
                            </div>

                            <button className="w-full flex items-center justify-center space-x-2 py-3 border-2 border-green-600 text-green-700 rounded-lg font-medium hover:bg-green-50 transition-colors">
                                <CameraIcon className="w-5 h-5" />
                                <span>Take Photo</span>
                            </button>

                            {/* Manual Diagnosis */}
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
                                        {cropTypes.map((crop) => (
                                            <option key={crop}>{crop}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Visible Symptoms
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {symptoms.map((symptom) => (
                                            <label
                                                key={symptom}
                                                className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-green-50 cursor-pointer"
                                            >
                                                <input
                                                    type="checkbox"
                                                    className="rounded text-green-600 focus:ring-green-500"
                                                />
                                                <span className="text-sm text-gray-700">
                                                    {symptom}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    onClick={handleManualAnalysis} // This function is now defined
                                    className="w-full mt-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                                >
                                    Analyze Symptoms
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Results Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="bg-white rounded-xl shadow-lg p-8 h-full flex items-center justify-center">
                            {loading ? (
                                <div className="text-center">
                                    <Loader2Icon className="w-12 h-12 text-green-600 mx-auto mb-4 animate-spin" />
                                    <p className="text-green-700 font-medium">
                                        Analyzing your crop...
                                    </p>
                                </div>
                            ) : error ? ( // <-- FIX: Show error message
                                <div className="text-center text-red-600">
                                    <AlertCircleIcon className="w-12 h-12 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold mb-2">Analysis Failed</h3>
                                    <p>{error}</p>
                                    <button onClick={resetState} className="mt-4 text-green-600 hover:text-green-700 font-medium">
                                        Try Again
                                    </button>
                                </div>
                            ) : showResults && diagnosisResult ? ( // <-- FIX: Changed `results` to `diagnosisResult`
                                <div className="text-left w-full">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Diagnosis Results</h2>
                                    <div className="mb-6">
                                        <h3 className="text-lg font-semibold text-gray-700">Detected Disease</h3>
                                        <p className="text-2xl font-bold text-green-700">{diagnosisResult.disease || 'Unknown'}</p>
                                    </div>
                                    <div className="mb-6">
                                        <h3 className="text-lg font-semibold text-gray-700">Confidence</h3>
                                        <p className="text-xl text-gray-900">{diagnosisResult.confidence || 'N/A'}</p>
                                    </div>
                                    <div className="mb-6">
                                        <h3 className="text-lg font-semibold text-gray-700">Possible Causes</h3>
                                        <p className="text-gray-600">{diagnosisResult.causes || 'No information available.'}</p>
                                    </div>
                                    <div className="mb-6">
                                        <h3 className="text-lg font-semibold text-gray-700">Recommended Treatment</h3>
                                        <p className="text-gray-600">{diagnosisResult.treatment || 'No treatment information available.'}</p>
                                    </div>
                                    <button onClick={resetState} className="mt-4 w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors">
                                        Analyze Another
                                    </button>
                                </div>
                            ) : (
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
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default PestDiagnosis;
