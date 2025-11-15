// src/components/dashboard/AlertCard.jsx
import React from "react";
import { AlertTriangle } from "lucide-react";

const AlertCard = ({ message }) => {
  return (
    <div className="flex items-center gap-3 bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-lg shadow-sm">
      <AlertTriangle className="text-yellow-600 w-6 h-6" />
      <p className="text-sm text-gray-700">{message}</p>
    </div>
  );
};

export default AlertCard;
