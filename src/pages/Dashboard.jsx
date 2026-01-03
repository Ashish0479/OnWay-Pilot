import React, { useState, useEffect } from "react";
import {
  Menu,
  Bell,
  Bike,
  Clock,
  IndianRupee,
  MapPin,
  LogOut,
  CheckCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import socket from "../socket";
import logout from "../redux/slices/authSlice"

export default function Dashboard() {
  const navigate = useNavigate();

  const pilotData = JSON.parse(localStorage.getItem("data"));
  const pilotId = pilotData?.user?._id;

  const [online, setOnline] = useState(false);
  const [hasRide, setHasRide] = useState(false);
  const [rideData, setRideData] = useState(null);

 useEffect(() => {
  if (!online || !pilotId) return;

  socket.connect();

  socket.on("connect", () => {
    console.log("🟢 Pilot socket connected:", socket.id);
    socket.emit("pilot_online", pilotId);
  });

  socket.on("new_ride_request", (ride) => {
    console.log("🚨 New ride received:", ride);
    setRideData(ride);
    setHasRide(true);
  });

  return () => {
    socket.off("new_ride_request");
    socket.disconnect();
  };
}, [online, pilotId]);

useEffect(() => {
  if (!navigator.geolocation) return;

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      // backend ko bhejo
      socket.emit("pilot_location_init", {
        pilotId,
        lat,
        lng
      });
    },
    (err) => {
      console.log("Pilot location error", err.message);
    },
    { enableHighAccuracy: false }
  );
}, []);


  const toggleOnline = () => {
    const newStatus = !online;
    setOnline(newStatus);

    if (newStatus) {
      socket.emit("pilot_online", pilotId);
    } else {
      socket.emit("pilot_offline", pilotId);
    }
  };

  const acceptRide = () => {

    if (!rideData) return;

    socket.emit("pilot_accept", {
      rideId: rideData.rideId,
      pilotId,
      userId: rideData.userId
    });

    setHasRide(false);
    setRideData(null);
  };

  const rejectRide = () => {
    if (!rideData) return;

    socket.emit("pilot_reject", {
      rideId: rideData._id,
      pilotId,
      userId: rideData.userId
    });

    setHasRide(false);
    setRideData(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    socket.disconnect();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#00ADB5]/10 to-white pb-14">

      
      <nav className="w-full bg-white px-5 py-3 shadow-sm flex justify-between items-center sticky top-0">
        <Menu className="text-[#00ADB5]" size={26} />
        <h1 className="text-xl font-bold text-[#00ADB5]">OnWay Pilot</h1>
        <Bell className="text-gray-600" size={22} />
      </nav>

      
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
              onChange={toggleOnline}
            />
            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-[#00ADB5]"></div>
            <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition"></span>
          </label>
        </div>
      </div>

      
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

      
      {hasRide && rideData && (
        <div className="w-[90%] mt-5 mx-auto bg-white rounded-2xl p-4 shadow-md border border-[#00ADB5]/30">
          <h3 className="font-semibold mb-2">New Ride Request</h3>

          <div className="flex items-center mb-3">
            <MapPin className="text-green-600 mr-2" />
            <p className="text-gray-700 text-sm">
              Pickup: {rideData.pickup.address}
            </p>
          </div>

          <div className="flex items-center mb-3">
            <MapPin className="text-red-600 mr-2" />
            <p className="text-gray-700 text-sm">
              Drop: {rideData.drop.address}
            </p>
          </div>

          <div>
            <IndianRupee className="text-gray-700 mr-2 inline" />
            <span className="text-gray-700 font-medium">
              Fare: ₹{rideData.fare}
            </span>
          </div>

          <div className="flex justify-between">
            <button
              onClick={acceptRide}
              className="bg-green-600 text-white px-4 py-2 rounded-xl w-[48%]"
            >
              Accept
            </button>
            <button
              onClick={rejectRide}
              className="bg-red-500 text-white px-4 py-2 rounded-xl w-[48%]"
            >
              Reject
            </button>
          </div>
        </div>
      )}

      
      <div className="mt-8 px-5">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Quick Actions</h2>

        <div className="space-y-3">
          <ActionItem icon={<Clock size={22} />} label="Ride History" />
          <ActionItem icon={<CheckCircle size={22} />} label="Verify Documents" />
          <ActionItem icon={<LogOut size={22} />} label="Logout" onClick={handleLogout} />
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
