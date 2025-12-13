import React, { useState } from "react";
import { Menu, Bell, Bike, Clock, IndianRupee, MapPin, LogOut, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const [online, setOnline] = useState(false);
  const [hasRide, setHasRide] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#00ADB5]/10 to-white pb-14">

      {/* Navbar */}
      <nav className="w-full bg-white px-5 py-3 shadow-sm flex justify-between items-center sticky top-0">
        <Menu className="text-[#00ADB5]" size={26} />
        <h1 className="text-xl font-bold text-[#00ADB5]">OnWay Pilot</h1>
        <Bell className="text-gray-600" size={22} />
      </nav>

      {/* Status + Online Switch */}
      <div className="px-5 mt-4">
        <div className="flex justify-between items-center bg-white shadow-sm p-4 rounded-2xl">
          <div>
            <p className="text-gray-700 font-semibold">Pilot Status</p>
            <p className={`font-bold ${online ? "text-green-600" : "text-red-500"}`}>
              {online ? "Online" : "Offline"}
            </p>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={online}
              onChange={() => setOnline(!online)}
            />
            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-[#00ADB5]"></div>
            <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition"></span>
          </label>
        </div>
      </div>

      {/* Earnings & Stats */}
      <div className="px-5 mt-4 grid grid-cols-2 gap-3">
        <div className="bg-white p-4 rounded-2xl shadow-sm">
          <IndianRupee className="text-[#00ADB5]" />
          <p className="text-gray-700 mt-2 text-sm">Today's Earnings</p>
          <h2 className="text-2xl font-bold">₹420</h2>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm">
          <Bike className="text-[#00ADB5]" />
          <p className="text-gray-700 mt-2 text-sm">Total Rides</p>
          <h2 className="text-2xl font-bold">12</h2>
        </div>
      </div>

      {/* Live Ride Request */}
      {hasRide && (
        <div className="w-[90%] mt-5 mx-auto bg-white rounded-2xl p-4 shadow-md border border-[#00ADB5]/30">
          <h3 className="font-semibold mb-2">New Ride Request</h3>

          <div className="flex items-center mb-3">
            <MapPin className="text-green-600 mr-2" />
            <p className="text-gray-700 text-sm">Pickup: Sector 14, Kurukshetra</p>
          </div>

          <div className="flex items-center mb-3">
            <MapPin className="text-red-600 mr-2" />
            <p className="text-gray-700 text-sm">Drop: UIET College Gate</p>
          </div>

          <div className="flex justify-between">
            <button className="bg-green-600 text-white px-4 py-2 rounded-xl w-[48%]">
              Accept
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-xl w-[48%]">
              Reject
            </button>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-8 px-5">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Quick Actions</h2>

        <div className="space-y-3">
          <ActionItem
            icon={<Clock size={22} />}
            label="Ride History"
            onClick={() => navigate("/pilot-history")}
          />
          <ActionItem
            icon={<CheckCircle size={22} />}
            label="Verify Documents"
            onClick={() => navigate("/pilot-documents")}
          />
          <ActionItem
            icon={<Bell size={22} />}
            label="Notifications"
          />
          <ActionItem
            icon={<LogOut size={22} />}
            label="Logout"
          />
        </div>
      </div>
    </div>
  );
}

function ActionItem({ icon, label, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm cursor-pointer"
    >
      <div className="flex items-center space-x-3">
        {icon}
        <p className="font-medium text-gray-700">{label}</p>
      </div>
      
    </div>
  );
}
