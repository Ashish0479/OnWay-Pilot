import React, { useState } from "react";
import { ArrowLeft, HelpCircle, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sendPhoneOTP } from "../redux/slices/authSlice";

export default function PhoneLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [phone, setPhone] = useState("");

  const handleProceed = () => {
    if (!phone || phone.length !== 10) {
      alert("Enter a valid 10-digit phone number");
      return;
    }
    const contactNumber = `+91${phone}`;

    dispatch(sendPhoneOTP(contactNumber)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        navigate("/pilot-verify-otp", { state: { phone } });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* NAVBAR */}
      <nav className="w-full bg-white shadow-sm px-4 py-3 flex justify-between items-center">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft size={24} className="text-gray-700" />
        </button>

        <button className="flex items-center gap-1 text-[#00ADB5]">
          <HelpCircle size={20} />
          <span className="font-medium">Help</span>
        </button>
      </nav>

      {/* CONTENT */}
      <div className="flex flex-col items-center mt-10 px-5">

        {/* Phone SVG */}
        <div className="bg-[#00ADB5]/10 p-5 rounded-full">
          <Phone size={45} className="text-[#00ADB5]" />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mt-5">
          Enter your phone number to drive
        </h2>

        {/* PHONE INPUT */}
        <div className="mt-7 w-full max-w-sm">
          <label className="text-gray-700 text-sm">Phone Number</label>

          <div className="flex items-center mt-2 bg-white p-3 rounded-xl shadow-sm border">
            <span className="font-semibold text-gray-700 pr-2 border-r">+91</span>
            <input
              type="number"
              className="w-full pl-3 outline-none"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value.slice(0, 10))}
            />
          </div>
        </div>

        {/* SPACER */}
        <div className="flex-1"></div>

        {/* TERMS TEXT */}
        <p className="text-xs text-gray-500 mb-3 text-center w-[80%]">
          Please read our terms and conditions before proceeding
        </p>

        {/* PROCEED BUTTON */}
        <button
          onClick={handleProceed}
          className="mb-10 w-[85%] py-3 bg-[#00ADB5] text-white font-semibold rounded-2xl shadow-md hover:bg-[#0099A5] transition"
        >
          Proceed
        </button>
      </div>
    </div>
  );
}
