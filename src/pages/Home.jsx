import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-[#00ADB5]/10 to-white">
      
      {/* Navbar */}
      <nav className="w-full bg-white shadow-md px-5 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#00ADB5]">OnWay Pilot</h1>
        <button
          onClick={() => navigate("/pilot-login")}
          className="px-4 py-1.5 rounded-xl bg-[#00ADB5] text-white font-medium hover:bg-[#00ADB5]/90"
        >
          Login
        </button>
      </nav>

      {/* Hero Section */}
      <section className="text-center mt-10 w-[90%] md:w-[70%]">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
          Drive, Earn, and Grow with{" "}
          <span className="text-[#00ADB5]">OnWay Pilot</span>
        </h2>
        <p className="text-gray-600 mt-3">
          Join India’s fast-growing mobility network. Become a pilot and earn flexibly on your schedule.
        </p>

        <button
          onClick={() => navigate("/signup")}
          className="mt-6 px-6 py-3 rounded-2xl bg-[#00ADB5] text-white font-semibold hover:bg-[#00ADB5]/90 shadow-md transition"
        >
          Join as Pilot
        </button>
      </section>

      {/* ---------------------- CUSTOMER SECTION ---------------------- */}
      <section className="w-full bg-white mt-10 py-10 px-6 flex justify-center">
        <div className="w-full max-w-md text-center bg-gray-50 rounded-2xl p-6 shadow-sm border border-gray-200">
          
          <h3 className="text-xl font-semibold text-gray-800">Customer?</h3>
          <p className="text-gray-600 mt-1">Book rides using our user app</p>

          <button
            onClick={() => window.location.href = "http://localhost:5173"}
            className="mt-4 w-full py-3 bg-[#00ADB5] text-white rounded-xl font-medium hover:bg-[#0099A5] transition shadow"
          >
            Open User App
          </button>
        </div>
      </section>
      {/* --------------------------------------------------------------- */}

    </div>
  );
}
