// src/components/dashboard/QuickActionButton.jsx
import React from "react";

const QuickActionButton = ({ label, icon: Icon, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center p-5 bg-green-600 text-white rounded-xl hover:bg-green-700 transition shadow-md"
    >
      <Icon className="w-8 h-8 mb-2" />
      <span className="text-sm font-semibold">{label}</span>
    </button>
  );
};

export default QuickActionButton;
