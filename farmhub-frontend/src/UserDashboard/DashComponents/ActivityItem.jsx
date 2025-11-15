// src/components/dashboard/ActivityItem.jsx
import React from "react";

const ActivityItem = ({ text, time }) => {
  return (
    <div className="flex justify-between p-3 bg-white rounded-lg shadow-sm border border-green-600">
      <p className="text-gray-700 text-sm">{text}</p>
      <span className="text-gray-400 text-xs">{time}</span>
    </div>
  );
};

export default ActivityItem;
