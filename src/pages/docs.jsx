import React from "react";
import { ArrowLeft, HelpCircle, UploadCloud } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DocumentCenter() {
  const navigate = useNavigate();

  const steps = [
    { id: 1, label: "Learn\nUpload" },
    { id: 2, label: "Questions" },
    { id: 3, label: "Why OnWay" },
    { id: 4, label: "Earnings" },
    { id: 5, label: "Timings" },
  ];

  const docs = [
    "Driving License",
    "Photo & Name",
    "Vehicle Number",
    "Aadhaar / PAN Card",
    "Permissions (Optional)",
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-10">

      {/* NAVBAR */}
      <nav className="w-full bg-white shadow-sm px-5 py-3 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-xl font-semibold text-gray-800">Document Center</h1>

        <button className="flex items-center gap-1 text-[#00ADB5] font-medium">
          <HelpCircle size={20} />
          Help
        </button>
      </nav>

      {/* HEADING + ICON */}
      <section className="px-5 mt-6 text-center">
        <div className="flex flex-col items-center gap-3">
          <UploadCloud size={60} className="text-[#00ADB5]" />
          <h2 className="text-2xl font-bold text-gray-800">
            Upload documents to start earning
          </h2>
          <p className="text-gray-600 text-sm mt-1 max-w-sm">
            Your documents help us verify your identity and approve you as an OnWay Pilot.
          </p>
        </div>
      </section>

      {/* 5 HORIZONTAL CIRCLES */}
      <section className="mt-8 flex justify-center overflow-x-auto px-3">
        <div className="flex gap-6">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center min-w-[60px]"
            >
              <div className="h-14 w-14 rounded-full bg-[#00ADB5]/10 border border-[#00ADB5] flex items-center justify-center">
                {/* later replace with your SVG */}
                <span className="text-[#00ADB5] font-semibold">{s.id}</span>
              </div>
              <p className="text-xs text-center text-gray-700 mt-2 whitespace-pre-line">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* DOCUMENT UPLOAD LIST */}
      <section className="mt-10 px-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Upload Required Documents
        </h3>

        <div className="space-y-4">
          {docs.map((doc, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-xl shadow-sm border flex justify-between items-center"
            >
              <div>
                <p className="font-medium text-gray-700">{doc}</p>
                <p className="text-xs text-gray-500 mt-1">Tap to upload</p>
              </div>

              <button className="px-4 py-1.5 text-sm bg-[#00ADB5] text-white rounded-lg hover:bg-[#0099A5] transition">
                Upload
              </button>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
