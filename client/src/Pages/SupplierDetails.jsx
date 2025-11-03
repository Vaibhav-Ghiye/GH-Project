import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";

const SupplierDetails = () => {
  const { name } = useParams(); // ✅ Get supplier name from URL
  const navigate = useNavigate();

  // Supplier Info (static example)
  const [supplierInfo, setSupplierInfo] = useState({
    bankAccount: "123456789012",
    ifsc: "SBIN0001234",
    totalOrders: 12,
    totalPaid: 56000,
    totalPending: 22000,
  });

  // Example bills
  const [pendingBills, setPendingBills] = useState([
    { invoice: "INV-101", date: "2025-09-01", amount: 5000 },
    { invoice: "INV-102", date: "2025-09-12", amount: 7000 },
    { invoice: "INV-103", date: "2025-09-20", amount: 10000 },
  ]);

  const [paidBills, setPaidBills] = useState([
    { invoice: "INV-090", date: "2025-08-01", amount: 15000 },
    { invoice: "INV-091", date: "2025-08-15", amount: 12000 },
    { invoice: "INV-092", date: "2025-08-22", amount: 29000 },
  ]);

  const [activeTab, setActiveTab] = useState("active");

  useEffect(() => {
    // fetch supplier details here if needed
  }, [name]);

  // ✅ Navigate to Bill Details Page
  const handleBillClick = (invoice) => {
    navigate(`/suppliers/${encodeURIComponent(name)}/bills/${invoice}`);
  };

  const displayedBills = activeTab === "active" ? pendingBills : paidBills;

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-50 to-green-100 p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-green-700 mb-4 hover:underline"
      >
        <ArrowLeft className="w-5 h-5 mr-1" /> Back to Suppliers
      </button>

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
        {/* Supplier Name */}
        <h1 className="text-3xl font-bold text-green-800 mb-4">{name}</h1>

        {/* Bank Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-gray-600">Bank Account</p>
            <p className="text-lg font-semibold text-green-800">
              {supplierInfo.bankAccount}
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-gray-600">IFSC Code</p>
            <p className="text-lg font-semibold text-green-800">
              {supplierInfo.ifsc}
            </p>
          </div>
        </div>

        {/* Summary Table */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-gray-50 rounded-lg text-center">
            <p className="text-gray-500">Total Orders</p>
            <p className="text-2xl font-bold text-green-700">
              {supplierInfo.totalOrders}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg text-center">
            <p className="text-gray-500">Total Paid</p>
            <p className="text-2xl font-bold text-green-700">
              ₹{supplierInfo.totalPaid.toLocaleString()}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg text-center">
            <p className="text-gray-500">Total Pending</p>
            <p className="text-2xl font-bold text-red-600">
              ₹{supplierInfo.totalPending.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Toggle Tabs */}
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setActiveTab("active")}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === "active"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Active (Pending Bills)
          </button>
          <button
            onClick={() => setActiveTab("inactive")}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === "inactive"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Inactive (Paid Bills)
          </button>
        </div>

        {/* Bills Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="py-2 px-4 text-left">Invoice</th>
                <th className="py-2 px-4 text-left">Date</th>
                <th className="py-2 px-4 text-left">Amount</th>
              </tr>
            </thead>
            <tbody>
              {displayedBills.map((bill, idx) => (
                <tr
                  key={idx}
                  className="border-b hover:bg-green-50 transition-colors cursor-pointer"
                  onClick={() => handleBillClick(bill.invoice)}
                >
                  <td className="py-2 px-4">{bill.invoice}</td>
                  <td className="py-2 px-4">{bill.date}</td>
                  <td className="py-2 px-4 font-semibold">
                    ₹{bill.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
              {displayedBills.length === 0 && (
                <tr>
                  <td colSpan="3" className="py-4 text-center text-gray-500">
                    No bills found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SupplierDetails;
