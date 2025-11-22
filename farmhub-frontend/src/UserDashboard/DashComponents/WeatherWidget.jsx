// src/components/dashboard/WeatherWidget.jsx
import React from "react";
import { Sun, CloudRain, Droplets, Wind } from "lucide-react";

const WeatherWidget = () => {
  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 sm:p-6 rounded-xl shadow-md border border-green-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800">Weather Forecast</h3>
        <Sun className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 sm:p-4">
          <div className="flex items-center gap-2 mb-2">
            <Sun className="w-5 h-5 text-yellow-500" />
            <span className="text-xs text-gray-600">Temperature</span>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">27°C</p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 sm:p-4">
          <div className="flex items-center gap-2 mb-2">
            <Droplets className="w-5 h-5 text-blue-500" />
            <span className="text-xs text-gray-600">Humidity</span>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">65%</p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 sm:p-4 col-span-2 sm:col-span-1">
          <div className="flex items-center gap-2 mb-2">
            <Wind className="w-5 h-5 text-gray-500" />
            <span className="text-xs text-gray-600">Wind</span>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">12 km/h</p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-green-200">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Today:</span> Sunny with low chance of rain. Perfect for harvesting!
        </p>
      </div>
    </div>
  );
};

export default WeatherWidget;
