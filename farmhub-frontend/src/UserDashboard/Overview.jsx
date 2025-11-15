import React from "react";
import StatCard from "../UserDashboard/DashComponents/StatCard";
import QuickActionButton from "../UserDashboard/DashComponents/QuickActionButton";
import ActivityItem from "../UserDashboard/DashComponents/ActivityItem";
import WeatherWidget from "../UserDashboard/DashComponents/WeatherWidget";
import AlertCard from "../UserDashboard/DashComponents/AlertCard";

import { ShoppingBag, Wrench, MessageSquare, Scan, PlusCircle } from "lucide-react";

const Overview = () => {
  return (
    <div className="px-6 py-6 max-w-7xl mx-auto">

      {/* Welcome */}
      <h1 className="text-2xl font-bold text-gray-800 mb-2">👋 Welcome Back, Farmer!</h1>
      <p className="text-gray-600 mb-6">Here is your farm’s activity overview.</p>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <StatCard title="My Orders" value="12" icon={ShoppingBag} color="bg-green-500" />
        <StatCard title="Equipment Rentals" value="5" icon={Wrench} color="bg-blue-500" />
        <StatCard title="Diagnosis Results" value="3" icon={Scan} color="bg-yellow-500" />
        <StatCard title="Messages" value="8" icon={MessageSquare} color="bg-purple-500" />
      </div>

      {/* QUICK ACTIONS */}
      <h2 className="text-xl font-bold text-gray-800 mb-3">Quick Actions</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mb-10">
        <QuickActionButton label="Post Produce" icon={PlusCircle} />
        <QuickActionButton label="Post Equipment" icon={Wrench} />
        <QuickActionButton label="Diagnosis" icon={Scan} />
        <QuickActionButton label="Marketplace" icon={ShoppingBag} />
      </div>

      {/* ALERTS & WEATHER */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800">Alerts</h2>
          <AlertCard message="⚠️ Rain expected tomorrow — consider harvesting today." />
          <AlertCard message="🐛 Pest alert in your district — maize leaf blight risk high." />
        </div>

        <div className="lg:col-span-2">
          <WeatherWidget />
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <h2 className="text-xl font-bold text-gray-800 mb-3">Recent Activity</h2>
      <div className="space-y-3">
        <ActivityItem text="You posted 10kg of tomatoes for sale." time="2 hours ago" />
        <ActivityItem text="Your tractor was rented by Alice." time="6 hours ago" />
        <ActivityItem text="Diagnosis result: Leaf spot detected in beans." time="1 day ago" />
        <ActivityItem text="You purchased fertilizer from the marketplace." time="3 days ago" />
      </div>
    </div>
  );
};

export default Overview;
