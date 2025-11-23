import React, { useState, useEffect } from "react";
import EquipmentCard from "../Components/equipement/EquipementCard";
import EquipmentFilterSidebar from "../Components/equipement/FilterEquipe";
import { equipmentAPI } from "../../utils/api";

export default function EquipmentPage() {
  const [equipmentData, setEquipmentData] = useState([]);
  const [selectedType, setSelectedType] = useState("All");
  const [availabilityFilter, setAvailabilityFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEquipment();
  }, []);

  const loadEquipment = async () => {
    try {
      setLoading(true);
      const data = await equipmentAPI.getAll();
      setEquipmentData(data || []);
    } catch (error) {
      console.error("Error loading equipment:", error);
      setEquipmentData([]);
    } finally {
      setLoading(false);
    }
  };

  // Unique types for filter dropdown
  const equipmentTypes = [
    "All",
    ...new Set(equipmentData.map((item) => item.type || item.equipmentType).filter(Boolean)),
  ];

  // Filter logic
  const filteredEquipment = equipmentData.filter((item) => {
    const matchesType =
      selectedType === "All" || item.type === selectedType || item.equipmentType === selectedType;
    const matchesAvailability =
      availabilityFilter === "All" ||
      item.availability === availabilityFilter ||
      item.availabilityStatus === availabilityFilter;
    const matchesSearch =
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesAvailability && matchesSearch;
  });

  return (
    <div className="flex flex-col sm:flex-row bg-gray-50 min-h-screen p-10 pt-50 gap-6">
      {/* Sidebar */}
      <EquipmentFilterSidebar
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        availabilityFilter={availabilityFilter}
        setAvailabilityFilter={setAvailabilityFilter}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        equipmentTypes={equipmentTypes}

      />

      {/* Main Content */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Available Equipment
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <p className="text-gray-500 text-center col-span-full">
              Loading equipment...
            </p>
          ) : filteredEquipment.length > 0 ? (
            filteredEquipment.map((item) => (
              <EquipmentCard key={item.id} equipment={item} />
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">
              No equipment found matching your criteria.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
