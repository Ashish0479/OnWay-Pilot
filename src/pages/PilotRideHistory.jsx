import React from "react";

export default function PilotRideHistory({ rides }) {
  if (!rides || rides.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-4">
        No rides yet
      </div>
    );
  }

  return (
    <div className="space-y-3 mt-4">
      {rides.map((ride) => (
        <div
          key={ride.id}
          className="bg-white shadow-sm rounded-xl p-4 border"
        >
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-[#00ADB5]">
              ₹{ride.earning}
            </h3>

            <span className="text-xs text-gray-500">
              {new Date(ride.date).toLocaleString()}
            </span>
          </div>

          <div className="mt-2 text-sm text-gray-700">
            <p>
              <span className="font-semibold">Pickup:</span>{" "}
              {ride.pickup.address}
            </p>

            <p>
              <span className="font-semibold">Drop:</span>{" "}
              {ride.drop.address}
            </p>
          </div>

          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>Distance: {ride.distance}</span>
            <span>Duration: {ride.duration}</span>
          </div>

          <div className="flex justify-between mt-2 text-xs">
            <span className="text-gray-600">
              Fare: ₹{ride.fare}
            </span>

            <span className="text-red-500">
              Commission: ₹{ride.commission}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}