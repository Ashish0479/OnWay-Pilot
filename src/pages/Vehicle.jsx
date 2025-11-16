import React, { useState } from "react";
import { ArrowLeft, HelpCircle, Bike, Car, Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Vehicle() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");

  const vehicles = [
    { id: "bike", label: "Bike", icon: <Bike size={22} /> },
    { id: "auto", label: "Auto", icon: <Truck size={22} /> },
    { id: "erickshaw", label: "E-Rickshaw", icon: <Truck size={22} /> },
    { id: "cab", label: "Cab", icon: <Car size={22} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-8">

      {/* NAVBAR */}
      <nav className="w-full bg-white shadow-sm px-5 py-3 flex justify-between items-center">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft size={26} className="text-gray-700" />
        </button>

        <button className="flex items-center gap-1 text-[#00ADB5] font-medium">
          <HelpCircle size={20} />
          Help
        </button>
      </nav>

      {/* Heading */}
      <h2 className="text-2xl font-bold text-gray-800 mt-6 mb-4 text-center">
        Select Your Vehicle
      </h2>

      {/* Vehicle Options */}
      <div className="flex-col  px-5 mt-4">
        {vehicles.map((v) => (
          <div
            key={v.id}
            onClick={() => setSelected(v.id)}
            className={`p-5 w-[95%]  bg-white rounded-xl shadow-sm border cursor-pointer flex flex-col items-center justify-center transition 
              ${
                selected === v.id
                  ? "border-[#00ADB5] bg-[#00ADB5]/10"
                  : "border-gray-200"
              }`}
          >
            <div className="text-[#00ADB5] mb-2">{v.icon}</div>
            <p className="font-semibold text-gray-700">{v.label}</p>
          </div>
        ))}
      </div>

      {/* Confirm Button */}
      <div className="mt-8 px-5">
        <button
         
          onClick={() => navigate("/pilot-details")}
          className={`w-full py-3 rounded-xl font-semibold text-white shadow-lg transition bg-[#00ADB5] hover:bg-[#0099A5] `}
            
        >
          Confirm Vehicle
        </button>
      </div>
    </div>
  );
}
