import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboard } from "../redux/slices/dashboardSlice";
import { MapPin, IndianRupee, ArrowLeft } from "lucide-react";

export default function PilotRideHistoryPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { rideHistory, status } = useSelector((state) => state.pilot);

  useEffect(() => {
    dispatch(fetchDashboard());
  }, [dispatch]);

  const sortedRides = [...(rideHistory || [])].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#00ADB5]/10 to-white pb-10">

      {/* Header */}
      <nav className="w-full bg-white px-5 py-3 shadow-sm flex items-center gap-3 sticky top-0">
        <ArrowLeft
          className="text-[#00ADB5] cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-xl font-bold text-[#00ADB5]">
          Ride History
        </h1>
      </nav>

      <div className="px-5 mt-4">

        {status === "loading" && (
          <p className="text-center text-gray-500">Loading rides...</p>
        )}

        {sortedRides.length === 0 && status !== "loading" && (
          <div className="bg-white rounded-2xl shadow-sm p-6 text-center text-gray-500">
            No rides yet 🚕
          </div>
        )}

        <div className="space-y-3">
          {sortedRides.map((ride) => (
            <div
              key={ride._id}
              className="bg-white shadow-sm rounded-2xl p-4 border border-[#00ADB5]/10"
            >
              {/* Pickup */}
              <div className="flex items-start gap-2 mb-2">
                <MapPin className="text-green-600 mt-1" size={18} />
                <div>
                  <p className="text-xs text-gray-500">Pickup</p>
                  <p className="font-medium text-gray-800">
                    {ride.pickup?.address}
                  </p>
                </div>
              </div>

              {/* Drop */}
              <div className="flex items-start gap-2 mb-3">
                <MapPin className="text-red-500 mt-1" size={18} />
                <div>
                  <p className="text-xs text-gray-500">Drop</p>
                  <p className="font-medium text-gray-800">
                    {ride.drop?.address}
                  </p>
                </div>
              </div>

              {/* Money Section */}
              <div className="grid grid-cols-3 gap-2 border-t pt-3 text-center">

                <div>
                  <p className="text-xs text-gray-500">Fare</p>
                  <p className="font-semibold flex items-center justify-center text-gray-800">
                    <IndianRupee size={14} />
                    {ride.fare}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Commission</p>
                  <p className="font-semibold flex items-center justify-center text-red-500">
                    <IndianRupee size={14} />
                    {ride.commission}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Earnings</p>
                  <p className="font-bold flex items-center justify-center text-[#00ADB5]">
                    <IndianRupee size={14} />
                    {ride.fare - ride.commission}
                  </p>
                </div>

              </div>

              {/* Date */}
              <p className="text-xs text-gray-500 mt-3 text-right">
                {new Date(ride.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}