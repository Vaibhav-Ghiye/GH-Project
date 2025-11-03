import React from "react";
import { useNavigate } from "react-router";

import { UserGroupIcon, TruckIcon, ChartBarIcon } from "@heroicons/react/24/outline";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-white to-blue-200">
      {/* Sticky Navbar */}
      <header className="sticky top-0 flex justify-between items-center bg-blue-900 p-4 text-white shadow-lg z-50">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Jay GAJANAN Hydraulic Firm
        </h1>
        <button
          onClick={() => navigate("/")}
          className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-xl shadow font-medium transition"
        >
          Logout
        </button>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col justify-center items-center text-center px-6 py-16 space-y-6">
        <h2 className="text-5xl font-black text-blue-900 drop-shadow mb-3">
          Welcome!
        </h2>
        <p className="text-xl text-gray-700 max-w-2xl">
          Effortlessly manage customers, suppliers, payments, and reports — all in one place.
        </p>
        
        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 w-full md:w-3/4">
          {/* Customers */}
          <div
            onClick={() => navigate("/customers")}
            className="cursor-pointer bg-white text-blue-900 rounded-3xl shadow-xl p-8 hover:bg-blue-50 hover:scale-105 transition-all border border-gray-100 flex flex-col items-center"
          >
            <UserGroupIcon className="h-10 w-10 mb-2 text-blue-700" />
            <h3 className="text-2xl font-bold mb-2">Customers</h3>
            <p className="text-base text-gray-600 mb-2">
              See and manage all your customers — records, purchases, payments, and balances.
            </p>
            <span className="font-medium text-blue-600 mt-2">See Customers &rarr;</span>
          </div>
          {/* Suppliers */}
          <div
            onClick={() => navigate("/suppliers")}
            className="cursor-pointer bg-white text-blue-900 rounded-3xl shadow-xl p-8 hover:bg-blue-50 hover:scale-105 transition-all border border-gray-100 flex flex-col items-center"
          >
            <TruckIcon className="h-10 w-10 mb-2 text-blue-700" />
            <h3 className="text-2xl font-bold mb-2">Suppliers</h3>
            <p className="text-base text-gray-600 mb-2">
              Track supplier invoices, payments, and pending amounts in one view.
            </p>
            <span className="font-medium text-blue-600 mt-2">See Suppliers &rarr;</span>
          </div>
          {/* Reports */}
          <div
            onClick={() => navigate("/reports")}
            className="cursor-pointer bg-white text-blue-900 rounded-3xl shadow-xl p-8 hover:bg-blue-50 hover:scale-105 transition-all border border-gray-100 flex flex-col items-center"
          >
            <ChartBarIcon className="h-10 w-10 mb-2 text-blue-700" />
            <h3 className="text-2xl font-bold mb-2">Reports</h3>
            <p className="text-base text-gray-600 mb-2">
              Instantly generate your financial reports and track performance metrics.
            </p>
            <span className="font-medium text-blue-600 mt-2">View Reports &rarr;</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-900 text-white text-center py-6">
        <p>© 2025 Jay GAJAN Hydraulic Firm. All Rights Reserved.</p>
        <p className="text-sm mt-2">
          Need help?{" "}
          <a href="mailto:help@jaygajan.com" className="underline">
            Contact support
          </a>
        </p>
      </footer>
    </div>
  );
}
