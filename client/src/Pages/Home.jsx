// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router";
import { Users, Truck, BarChart2, LogOut } from "lucide-react";
import Navbar from "./Navbar";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">

      <Navbar/>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col justify-center items-center text-center px-6 py-12 bg-gradient-to-r from-blue-50 via-white to-blue-50">
        <h2 className="text-3xl md:text-5xl font-extrabold text-blue-900 leading-snug">
          Welcome 👋 <br /> Manage Your Business with Ease
        </h2>
        <p className="mt-4 text-lg md:text-xl max-w-2xl text-gray-600">
          Track Customers, Suppliers, and Payments in one simple dashboard. 
          Easy to use, designed for business owners.
        </p>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 w-full max-w-5xl">
          
          {/* Customer Management */}
          <div
            onClick={() => navigate("/customers")}
            className="cursor-pointer bg-white rounded-2xl shadow-md p-8 border hover:shadow-xl hover:scale-105 transition group"
          >
            <div className="flex justify-center mb-4">
              <Users className="w-12 h-12 text-blue-700 group-hover:text-blue-900" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-blue-900">
              Customer Management
            </h3>
            <p className="text-gray-600">
              View and manage customer records, purchases, payments, and dues.
            </p>
          </div>

          {/* Supplier Management */}
          <div
            onClick={() => navigate("/suppliers")}
            className="cursor-pointer bg-white rounded-2xl shadow-md p-8 border hover:shadow-xl hover:scale-105 transition group"
          >
            <div className="flex justify-center mb-4">
              <Truck className="w-12 h-12 text-green-700 group-hover:text-green-900" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-green-900">
              Supplier Management
            </h3>
            <p className="text-gray-600">
              Record supplier bills, payments, and outstanding balances.
            </p>
          </div>

          {/* Reports */}
          <div
            onClick={() => navigate("/reports")}
            className="cursor-pointer bg-white rounded-2xl shadow-md p-8 border hover:shadow-xl hover:scale-105 transition group"
          >
            <div className="flex justify-center mb-4">
              <BarChart2 className="w-12 h-12 text-purple-700 group-hover:text-purple-900" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-purple-900">
              Reports & Analytics
            </h3>
            <p className="text-gray-600">
              Generate financial summaries, track payments, and analyze growth.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-800 text-white text-center py-4 text-sm md:text-base">
        <p>© 2025 Jay GAJANAN Hydraulic Firm. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
