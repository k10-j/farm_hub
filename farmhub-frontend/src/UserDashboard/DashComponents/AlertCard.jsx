// src/components/dashboard/AlertCard.jsx
import React from "react";
import { AlertTriangle } from "lucide-react";

const AlertCard = ({ message }) => {
  return (
    <div className="flex items-start gap-3 bg-yellow-50 border-l-4 border-yellow-500 p-3 sm:p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <AlertTriangle className="text-yellow-600 w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 mt-0.5" />
      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{message}</p>
    </div>
  );
};

export default AlertCard;
