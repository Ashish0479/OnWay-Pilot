import { useState } from 'react'
import Home from './pages/Home'

import Dashboard from './pages/Dashboard.jsx';
import PilotSignup from './pages/Signup.jsx';
import Vehicle from './pages/Vehicle.jsx';
import DocumentCenter from './pages/docs.jsx';
import PhoneLogin from './pages/OTPLogin.jsx';
import VerifyOTP from './pages/OTPvarify.jsx';
import PilotProtectedRoute from './pages/protected.jsx';
import EmailPasswordLoginPage from './pages/login.jsx';
import './index.css'; 

import { Routes, Route } from "react-router-dom";




export default function App() {
  if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
}


  return (
    <>
    <Routes>
          
        <Route path="/" element={<Home />} />
         <Route path="/signup" element={<PilotSignup />} />

      
         <Route
  path="/dashboard"
  element={
    <PilotProtectedRoute>
      <Dashboard />
    </PilotProtectedRoute>
  }
/>
         <Route path="/vehicle" element={<Vehicle />} />
         <Route path="/document-center" element={<DocumentCenter />} />
         <Route path="/pilot-login" element={<PhoneLogin />} />
         <Route path="/pilot-verify-otp" element={<VerifyOTP />} />
         <Route path="/login" element={<EmailPasswordLoginPage />} />
        

      </Routes>
    
    </>
  );
}



