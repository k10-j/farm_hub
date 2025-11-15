import React, { useState } from "react";

// Dummy data
const orderedByMeData = [
  { id: 1, name: "Fresh Tomatoes", price: 1200, quantity: 5 },
  { id: 2, name: "Maize (50kg)", price: 26000, quantity: 2 },
];

const orderedFromMeData = [
  { id: 1, name: "Organic Fertilizer", price: 1500, quantity: 3, buyer: "Alice" },
  { id: 2, name: "Carrots", price: 900, quantity: 10, buyer: "Bob" },
];

const MyOrders = () => {
  const [activeTab, setActiveTab] = useState("byMe");

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("byMe")}
          className={`px-6 py-2 -mb-px font-medium text-sm ${
            activeTab === "byMe"
              ? "border-b-2 border-green-600 text-green-600"
              : "text-gray-600 hover:text-green-600"
          }`}
        >
          Ordered By Me
        </button>
        <button
          onClick={() => setActiveTab("fromMe")}
          className={`px-6 py-2 -mb-px font-medium text-sm ${
            activeTab === "fromMe"
              ? "border-b-2 border-green-600 text-green-600"
              : "text-gray-600 hover:text-green-600"
          }`}
        >
          Ordered From Me
        </button>
      </div>

      {/* Orders List */}
      <div>
        {activeTab === "byMe" && (
          <div className="grid gap-4">
            {orderedByMeData.map((order) => (
              <div key={order.id} className="flex justify-between items-center p-4 border rounded-lg hover:shadow">
                <div>
                  <p className="font-semibold">{order.name}</p>
                  <p className="text-gray-500 text-sm">Qty: {order.quantity}</p>
                </div>
                <p className="font-bold text-green-700">{order.price} RWF</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "fromMe" && (
          <div className="grid gap-4">
            {orderedFromMeData.map((order) => (
              <div key={order.id} className="flex justify-between items-center p-4 border rounded-lg hover:shadow">
                <div>
                  <p className="font-semibold">{order.name}</p>
                  <p className="text-gray-500 text-sm">
                    Qty: {order.quantity} | Buyer: {order.buyer}
                  </p>
                </div>
                <p className="font-bold text-green-700">{order.price} RWF</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
