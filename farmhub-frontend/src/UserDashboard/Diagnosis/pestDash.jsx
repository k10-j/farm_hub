import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UploadIcon, CameraIcon, LeafIcon, AlertCircleIcon, XIcon, Loader2Icon } from 'lucide-react';

export function PestDiagnosis() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reading, setReading] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState(null); // holds the API response
  const [error, setError] = useState(null);

  const cropTypes = ['Maize', 'Beans', 'Cassava', 'Rice', 'Potato', 'Banana'];
  const symptoms = ['Yellow Leaves', 'Spots', 'Wilting', 'Holes', 'Mold', 'Discoloration'];

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setLoading(true);
      setError(null);
      setReading(true);

      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setReading(false);
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append('image', file);

      try {
        const res = await fetch('https://farm-hub.onrender.com/api/detect-disease', {
          method: 'POST',
          body: formData,
          credentials: 'include',
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setDiagnosisResult(data);
        setShowResults(true);
      } catch (err) {
        console.error('Image analysis failed:', err);
        setError(err.message || 'Failed to analyze image.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleManualAnalysis = () => {
    setLoading(true);
    setError(null);
    setSelectedImage(null);

    // This is a placeholder for your manual logic.
    // We'll mock a "sick" response for consistency.
    setTimeout(() => {
      setDiagnosisResult({
        plantDetected: true,
        healthy: false,
        healthProbability: 0.95,
        possibleDiseases: [
          {
            id: 'manual',
            name: 'Manual Symptom Analysis',
            probability: 0.95,
          },
        ],
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Pest & Disease Diagnosis</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload an image of your crop or describe the symptoms to get instant diagnosis and
            treatment recommendations
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Crop Image</h2>

              {/* Upload box */}
              <div className="border-2 border-dashed border-green-300 rounded-xl p-12 text-center mb-6 hover:border-green-500 transition-colors">
                {reading ? (
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <Loader2Icon className="w-8 h-8 text-green-600 animate-spin" />
                    <p className="text-gray-700 font-medium">Reading image file...</p>
                  </div>
                ) : selectedImage ? (
                  <div className="relative">
                    <img
                      src={selectedImage}
                      alt="Uploaded crop"
                      className="max-h-64 mx-auto rounded-lg"
                    />
                    <button
                      onClick={resetState}
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
                    <p className="text-sm text-gray-500">PNG, JPG, or WebP (MAX. 10MB)</p>
                  </label>
                )}
              </div>

              <button className="w-full flex items-center justify-center space-x-2 py-3 border-2 border-green-600 text-green-700 rounded-lg font-medium hover:bg-green-50 transition-colors">
                <CameraIcon className="w-5 h-5" />
                <span>Take Photo</span>
              </button>

              {/* Manual Diagnosis */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Or Select Manually</h3>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Crop Type</label>
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
                        <span className="text-sm text-gray-700">{symptom}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleManualAnalysis}
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
            <div className="bg-white rounded-xl shadow-lg p-8 h-full flex items-center justify-center min-h-[500px]">
              {loading ? (
                <div className="text-center">
                  <Loader2Icon className="w-12 h-12 text-green-600 mx-auto mb-4 animate-spin" />
                  <p className="text-green-700 font-medium">Analyzing your crop...</p>
                </div>
              ) : error ? (
                <div className="text-center text-red-600">
                  <AlertCircleIcon className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Analysis Failed</h3>
                  <p>{error}</p>
                  <button
                    onClick={resetState}
                    className="mt-4 text-green-600 hover:text-green-700 font-medium"
                  >
                    Try Again
                  </button>
                </div>
              ) : 
              
              // --- START OF FIXED CODE ---
              
              showResults && diagnosisResult ? (
                <div className="text-left w-full relative">
                  <button
                    onClick={resetState}
                    className="absolute -top-4 -right-4 text-gray-400 hover:text-gray-600 bg-white rounded-full p-1 shadow"
                  >
                    <XIcon className="w-6 h-6" />
                  </button>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Diagnosis Results</h2>

                  {/* Check 1: Was a plant even detected? */}
                  {!diagnosisResult.plantDetected ? (
                    <div className="text-center">
                      <AlertCircleIcon className="w-12 h-12 mx-auto mb-4 text-orange-500" />
                      <h3 className="text-xl font-semibold mb-2">Analysis Complete</h3>
                      <p>The image submitted does not appear to be a plant.</p>
                    </div>
                  ) : 
                  
                  /* Check 2: Was the plant healthy? */
                  diagnosisResult.healthy ? (
                    <div className="text-center">
                      <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                        <LeafIcon className="w-12 h-12 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-semibold text-green-700 mb-2">
                        Plant is Healthy!
                      </h3>
                      <p className="text-gray-600">
                        Our analysis indicates your plant is healthy.
                      </p>
                      <p className="text-sm text-gray-500">
                        (Confidence: {(diagnosisResult.healthProbability * 100).toFixed(0)}%)
                      </p>
                    </div>
                  ) : 
                  
                  /* Check 3: The plant is sick, show the diseases */
                  (
                    <div>
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-700">Top Match</h3>
                        {/* Use the first disease in the list as the main result */}
                        <p className="text-2xl font-bold text-red-700">
                          {diagnosisResult.possibleDiseases[0]?.name || 'Unknown Disease'}
                        </p>
                        <p className="text-sm text-gray-500">
                          Confidence: {(diagnosisResult.possibleDiseases[0]?.probability * 100).toFixed(0)}%
                        </p>
                      </div>

                      {/* Show other possibilities if they exist */}
                      {diagnosisResult.possibleDiseases.length > 1 && (
                        <div className="mb-6">
                          <h3 className="text-lg font-semibold text-gray-700">Other Possibilities</h3>
                          <ul className="list-disc list-inside text-gray-600 space-y-1">
                            {diagnosisResult.possibleDiseases.slice(1).map((disease) => (
                              <li key={disease.id}>
                                {disease.name} ({(disease.probability * 100).toFixed(0)}% confidence)
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Note: The API doesn't provide causes/treatment, so we guide the user */}
                      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <h3 className="text-lg font-semibold text-yellow-800">Next Steps</h3>
                        <p className="text-yellow-700">
                          Please show this diagnosis to a local agro-vet to get specific treatment recommendations.
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <button
                    onClick={resetState}
                    className="mt-6 w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Analyze Another
                  </button>
                </div>
              ) : (
                // --- END OF FIXED CODE ---
                
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
