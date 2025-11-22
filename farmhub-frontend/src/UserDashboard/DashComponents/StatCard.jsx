// components/dashboard/StatCard.jsx
import React from "react";
import { TrendingUp } from "lucide-react";

const StatCard = ({ title, value, icon: Icon, color = "bg-green-500", trend }) => {
  const colorClasses = {
    'bg-green-500': 'bg-green-100 text-green-700',
    'bg-blue-500': 'bg-blue-100 text-blue-700',
    'bg-yellow-500': 'bg-yellow-100 text-yellow-700',
    'bg-purple-500': 'bg-purple-100 text-purple-700',
    'bg-emerald-500': 'bg-emerald-100 text-emerald-700',
    'bg-orange-500': 'bg-orange-100 text-orange-700',
  };

  const iconColorClasses = {
    'bg-green-500': 'text-green-600',
    'bg-blue-500': 'text-blue-600',
    'bg-yellow-500': 'text-yellow-600',
    'bg-purple-500': 'text-purple-600',
    'bg-emerald-500': 'text-emerald-600',
    'bg-orange-500': 'text-orange-600',
  };

  return (
    <div className="bg-white p-4 sm:p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-green-200 cursor-pointer group">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="text-xs sm:text-sm text-gray-500 font-medium mb-1 truncate">{title}</h3>
          <p className="text-xl sm:text-2xl font-bold text-gray-800 truncate">{value}</p>
          {trend && (
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3 text-green-600" />
              <span className="text-xs text-green-600 font-medium">{trend}</span>
            </div>
          )}
        </div>

        <div className={`p-2 sm:p-3 ${colorClasses[color] || 'bg-green-100 text-green-700'} rounded-lg group-hover:scale-110 transition-transform`}>
          <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${iconColorClasses[color] || 'text-green-600'}`} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
