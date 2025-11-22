// src/components/dashboard/ActivityItem.jsx
import React from "react";
import { ShoppingBag, Wrench, Scan, Package } from "lucide-react";

const ActivityItem = ({ text, time, type }) => {
  const getIcon = () => {
    switch (type) {
      case 'marketplace':
        return <ShoppingBag className="w-4 h-4" />;
      case 'equipment':
        return <Wrench className="w-4 h-4" />;
      case 'diagnosis':
        return <Scan className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'marketplace':
        return 'bg-blue-100 text-blue-600';
      case 'equipment':
        return 'bg-purple-100 text-purple-600';
      case 'diagnosis':
        return 'bg-yellow-100 text-yellow-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="flex items-start gap-3 p-3 sm:p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200">
      <div className={`p-2 ${getIconColor()} rounded-lg flex-shrink-0`}>
        {getIcon()}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{text}</p>
        <span className="text-gray-400 text-xs mt-1 block">{time}</span>
      </div>
    </div>
  );
};

export default ActivityItem;
