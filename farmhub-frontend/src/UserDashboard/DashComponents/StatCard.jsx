// components/dashboard/StatCard.jsx
import React from "react";

const StatCard = ({ title, value, icon: Icon }) => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-green-600 hover:shadow-md transition cursor-pointer">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm text-gray-500">{title}</h3>
          <p className="text-2xl font-semibold text-gray-800 mt-1">{value}</p>
        </div>

        <div className="p-3 bg-green-100 rounded-xl">
          <Icon className="w-6 h-6 text-green-700" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
