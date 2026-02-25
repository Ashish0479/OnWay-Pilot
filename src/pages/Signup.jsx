import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createAccount } from "../redux/slices/authSlice";


export default function PilotSignup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = () => {
    const { fullName, email, phoneNumber, password } = form;

    if (!fullName || !email || !phoneNumber || !password) {
      alert("All fields are required");
      return;
    }

    if (phoneNumber.length !== 10) {
      alert("Enter valid 10 digit phone number");
      return;
    }
    dispatch(createAccount(form));

    //  Backend connect yahin hoga
    console.log("Pilot Signup Data:", form);
    // dispatch(pilotSignup(form))

    alert("Signup successfull");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Navbar */}
      <nav className="w-full bg-white px-4 py-3 shadow-sm flex items-center">
        <ArrowLeft
          className="cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h1 className="ml-3 text-xl font-bold text-[#00ADB5]">
          Pilot Signup
        </h1>
      </nav>

      {/* Form */}
      <div className="flex flex-col items-center mt-10 px-5">

        <div className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-md">

          <h2 className="text-2xl font-bold text-center mb-6">
            Create Pilot Account
          </h2>

          {/* Name */}
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            className="w-full mb-4 p-3 border rounded-xl outline-none"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full mb-4 p-3 border rounded-xl outline-none"
          />

          {/* Phone */}
          <div className="flex mb-4">
            <span className="px-3 py-3 border border-r-0 rounded-l-xl bg-gray-100">
              +91
            </span>
            <input
              type="number"
              name="phone"
              placeholder="Phone Number"
              value={form.phoneNumber}
              onChange={(e) =>
                setForm({ ...form, phoneNumber: e.target.value.slice(0, 10) })
              }
              className="w-full p-3 border rounded-r-xl outline-none"
            />
          </div>

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full mb-6 p-3 border rounded-xl outline-none"
          />

          {/* Signup Button */}
          <button
            onClick={handleSignup}
            className="w-full bg-[#00ADB5] text-white py-3 rounded-xl font-semibold hover:bg-[#0099A5]"
          >
            Sign Up
          </button>

          {/* Login Redirect */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/pilot-login")}
              className="text-[#00ADB5] font-semibold cursor-pointer"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
