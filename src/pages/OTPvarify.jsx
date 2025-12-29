import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { verifyPhoneOTP } from "../redux/slices/authSlice";
import { ArrowLeft, HelpCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();
  const phone = `+91${location.state?.phone}`;   // from previous screen

  const handleVerify = () => {
    if (otp.length !== 6) {
      alert("Enter a valid 6 digit OTP");
      return;
    }

    dispatch(verifyPhoneOTP({ phone, otp }))
      .unwrap()
      .then(() => {
        navigate("/dashboard");
      });
  };

  return (
    <div className="min-h-screen bg-white p-5 flex flex-col">
      {/* Navbar */}
      <div className="flex justify-between items-center mb-8">
        <ArrowLeft onClick={() => navigate(-1)} className="cursor-pointer" />
        <HelpCircle className="text-gray-600" />
      </div>

      <h1 className="text-2xl font-bold mb-2">Verify OTP</h1>
      <p className="text-gray-500 mb-6">OTP sent to +91 {phone}</p>

      <input
        type="number"
        maxLength={6}
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter 6-digit OTP"
        className="border p-3 rounded-xl w-full mb-5 outline-none"
      />

      <button
        onClick={handleVerify}
        className="bg-[#00ADB5] text-white py-3 rounded-xl font-semibold"
      >
        Verify OTP
      </button>
    </div>
  );
}
