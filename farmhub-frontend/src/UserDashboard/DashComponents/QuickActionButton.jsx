// src/components/dashboard/QuickActionButton.jsx
import React from "react";

const QuickActionButton = ({ label, icon: Icon, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center p-4 sm:p-5 bg-gradient-to-br from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
    >
      <Icon className="w-6 h-6 sm:w-8 sm:h-8 mb-2" />
      <span className="text-xs sm:text-sm font-semibold text-center">{label}</span>
    </button>
  );
};

export default QuickActionButton;
