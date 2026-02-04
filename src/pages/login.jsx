import React, { useState } from "react";
import { ArrowLeft, HelpCircle, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";

export default function EmailPasswordLoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleProceed = () => {
    if (!email || !password) {
      alert("Email and password are required");
      return;
    }

    // 🔥 authSlice ke login thunk ko exact payload
    dispatch(login({ email, password })).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        // authSlice already:
        // - token set kar deta hai
        // - localStorage (isLoggedIn, role, data) set kar deta hai

        navigate("/dashboard"); 
        // 👆 apne actual dashboard route se replace kar lena
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

        {/* ICON */}
        <div className="bg-[#00ADB5]/10 p-5 rounded-full">
          <Mail size={45} className="text-[#00ADB5]" />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mt-5 text-center">
          Login with email to ride
        </h2>

        {/* EMAIL */}
        <div className="mt-7 w-full max-w-sm">
          <label className="text-gray-700 text-sm">Email</label>

          <div className="flex items-center mt-2 bg-white p-3 rounded-xl shadow-sm border">
            <Mail size={18} className="text-gray-500 mr-2" />
            <input
              type="email"
              className="w-full outline-none"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* PASSWORD */}
        <div className="mt-5 w-full max-w-sm">
          <label className="text-gray-700 text-sm">Password</label>

          <div className="flex items-center mt-2 bg-white p-3 rounded-xl shadow-sm border">
            <Lock size={18} className="text-gray-500 mr-2" />
            <input
              type="password"
              className="w-full outline-none"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {/* SPACER */}
        <div className="flex-1"></div>

        {/* TERMS */}
        <p className="text-xs text-gray-500 mb-3 text-center w-[80%]">
          Please read our terms and conditions before proceeding
        </p>

        {/* BUTTON */}
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
