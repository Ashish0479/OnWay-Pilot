import { useState } from 'react'
import Home from './pages/Home'

import Dashboard from './pages/Dashboard.jsx';
import Vehicle from './pages/Vehicle.jsx';
import DocumentCenter from './pages/docs.jsx';
import PhoneLogin from './pages/OTPLogin.jsx';
import VerifyOTP from './pages/OTPvarify.jsx';
import './index.css'; 

import { Routes, Route } from "react-router-dom";




export default function App() {

  return (
    <>
    <Routes>
          
        <Route path="/" element={<Home />} />

      
         <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/vehicle" element={<Vehicle />} />
         <Route path="/document-center" element={<DocumentCenter />} />
         <Route path="/pilot-login" element={<PhoneLogin />} />
         <Route path="/pilot-verify-otp" element={<VerifyOTP />} />

      </Routes>
    
    </>
  );
}



