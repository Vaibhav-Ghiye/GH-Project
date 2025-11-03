import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";

const CustomerDetails = () => {
  const { name } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("active");

  // ✅ Static demo data
  const customerInfo = {
    name: decodeURIComponent(name),
    bankAccount: "9876543210",
    ifsc: "HDFC0001234",
  };

  const invoices = [
    { invoiceNumber: "INV-201", date: "2025-09-01", amount: 5000, status: "Pending" },
    { invoiceNumber: "INV-202", date: "2025-09-05", amount: 3000, status: "Paid" },
    { invoiceNumber: "INV-203", date: "2025-09-15", amount: 4500, status: "Pending" },
    { invoiceNumber: "INV-204", date: "2025-09-20", amount: 6000, status: "Paid" },
  ];

  const totalOrders = invoices.length;
  const totalPaid = invoices
    .filter((inv) => inv.status === "Paid")
    .reduce((sum, inv) => sum + inv.amount, 0);
  const totalPending = invoices
    .filter((inv) => inv.status === "Pending")
    .reduce((sum, inv) => sum + inv.amount, 0);

  const filteredInvoices =
    activeTab === "active"
      ? invoices.filter((inv) => inv.status === "Pending")
      : invoices.filter((inv) => inv.status === "Paid");

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-700 mb-4 hover:underline"
      >
        <ArrowLeft className="w-5 h-5 mr-1" /> Back
      </button>

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">
        {/* Customer Info */}
        <h1 className="text-2xl font-bold text-blue-800 mb-2">
          {customerInfo.name}
        </h1>
        <p className="text-gray-700 mb-4">
          Bank Account: <span className="font-semibold">{customerInfo.bankAccount}</span> | IFSC:{" "}
          <span className="font-semibold">{customerInfo.ifsc}</span>
        </p>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded text-center">
            <p className="text-gray-600">Total Orders</p>
            <p className="text-2xl font-bold text-blue-700">{totalOrders}</p>
          </div>
          <div className="bg-green-50 p-4 rounded text-center">
            <p className="text-gray-600">Total Paid</p>
            <p className="text-2xl font-bold text-green-700">₹{totalPaid}</p>
          </div>
          <div className="bg-red-50 p-4 rounded text-center">
            <p className="text-gray-600">Total Pending</p>
            <p className="text-2xl font-bold text-red-700">₹{totalPending}</p>
          </div>
        </div>

        {/* Active / Inactive Toggle */}
        <div className="flex justify-center mb-6">
          <button
            className={`px-6 py-2 rounded-l-lg border ${
              activeTab === "active"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("active")}
          >
            Active (Pending)
          </button>
          <button
            className={`px-6 py-2 rounded-r-lg border ${
              activeTab === "inactive"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("inactive")}
          >
            Inactive (Paid)
          </button>
        </div>

        {/* Invoices Table */}
        <table className="w-full border border-gray-200">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-2 px-4 text-left">Invoice</th>
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">Amount</th>
              <th className="py-2 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.length > 0 ? (
              filteredInvoices.map((inv) => (
                <tr
                  key={inv.invoiceNumber}
                  className="border-b hover:bg-blue-50 cursor-pointer"
                  onClick={() =>
                    navigate(
                      `/customers/${encodeURIComponent(
                        customerInfo.name
                      )}/bill/${inv.invoiceNumber}`
                    )
                  }
                >
                  <td className="py-2 px-4">{inv.invoiceNumber}</td>
                  <td className="py-2 px-4">{inv.date}</td>
                  <td className="py-2 px-4">₹{inv.amount}</td>
                  <td
                    className={`py-2 px-4 font-semibold ${
                      inv.status === "Pending" ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {inv.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-3 text-gray-500">
                  No {activeTab === "active" ? "pending" : "paid"} bills found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerDetails;
