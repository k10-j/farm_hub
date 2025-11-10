import React from "react";
import { Filter } from "lucide-react";

export default function EquipmentFilter({
  selectedType,
  setSelectedType,
  availabilityFilter,
  setAvailabilityFilter,
  searchTerm,
  setSearchTerm,
  equipmentTypes,
}) {
  return (
    <div className="w-full sm:w-64 bg-white rounded-xl shadow-md p-5 h-fit border border-gray-100">
      <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800 mb-4">
        <Filter className="text-green-600" /> Filters
      </h3>

      {/* Search */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Search
        </label>
        <input
          type="text"
          placeholder="Search equipment..."
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Type Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Type
        </label>
        <select
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          {equipmentTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Availability Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Availability
        </label>
        <select
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500"
          value={availabilityFilter}
          onChange={(e) => setAvailabilityFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="AVAILABLE">Available</option>
          <option value="UNAVAILABLE">Unavailable</option>
        </select>
      </div>
    </div>
  );
}
