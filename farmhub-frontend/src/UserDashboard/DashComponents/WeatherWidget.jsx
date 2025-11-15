// src/components/dashboard/WeatherWidget.jsx
import React from "react";
import { Sun, CloudRain } from "lucide-react";

const WeatherWidget = () => {
  return (
    <div className="bg-green-50 p-5 rounded-xl shadow">
      <h3 className="text-lg font-bold text-green-700">Weather</h3>
      <div className="flex items-center mt-3 space-x-4">
        <Sun className="w-10 h-10 text-yellow-500" />
        <div>
          <p className="text-2xl font-bold">27°C</p>
          <p className="text-gray-600 text-sm">Sunny, low chance of rain</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
