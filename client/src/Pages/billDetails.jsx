import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";

const BillDetails = () => {
  const { name, invoice } = useParams(); // From URL
  const navigate = useNavigate();

  // ✅ Dummy Purchase History Data (In real app, fetch from backend using invoice)
  const [purchaseHistory] = useState([
    { id: 1, date: "2025-08-02", description: "Hydraulic Pump", amount: 5000 },
    { id: 2, date: "2025-08-05", description: "Pipe Fitting", amount: 2000 },
  ]);

  // ✅ Dummy Paid Amounts
  const [paidHistory] = useState([
    { id: 1, date: "2025-08-10", description: "First Payment", amount: 4000 },
  ]);

  // ✅ Pending Amount = Purchase Total - Paid Total
  const totalPurchase = purchaseHistory.reduce((sum, r) => sum + r.amount, 0);
  const totalPaid = paidHistory.reduce((sum, r) => sum + r.amount, 0);
  const totalPending = totalPurchase - totalPaid;

  // ✅ Reusable Table Component
  const renderTable = (title, data) => {
    const total = data.reduce((sum, row) => sum + row.amount, 0);
    return (
      <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
        <h2 className="text-lg font-semibold mb-3 text-green-800">{title}</h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 text-sm">
            <thead>
              <tr className="bg-green-600 text-white">
                <th className="py-2 px-4 text-left">Date</th>
                <th className="py-2 px-4 text-left">Description</th>
                <th className="py-2 px-4 text-left">Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((row) => (
                  <tr key={row.id} className="border-b hover:bg-green-50">
                    <td className="py-2 px-4">{row.date}</td>
                    <td className="py-2 px-4">{row.description}</td>
                    <td className="py-2 px-4 font-semibold">
                      ₹{row.amount.toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="py-3 text-center text-gray-500 italic"
                  >
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr className="bg-gray-100 font-semibold">
                <td colSpan="2" className="py-2 px-4 text-right">
                  Total
                </td>
                <td className="py-2 px-4">₹{total.toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-50 to-green-100 p-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-green-700 mb-4 hover:underline"
      >
        <ArrowLeft className="w-5 h-5 mr-1" /> Back
      </button>

      <div className="max-w-4xl mx-auto">
        {/* Invoice Header */}
        <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
          <h1 className="text-2xl font-bold text-green-800 mb-2">
            Invoice: {invoice}
          </h1>
          <p className="text-gray-700">
            Supplier: <span className="font-semibold">{name}</span>
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-white rounded-lg shadow text-center">
            <p className="text-gray-500">Total Purchase</p>
            <p className="text-xl font-bold text-blue-600">
              ₹{totalPurchase.toLocaleString()}
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow text-center">
            <p className="text-gray-500">Total Paid</p>
            <p className="text-xl font-bold text-green-600">
              ₹{totalPaid.toLocaleString()}
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow text-center">
            <p className="text-gray-500">Total Pending</p>
            <p className="text-xl font-bold text-red-600">
              ₹{totalPending.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Tables */}
        {renderTable("Purchase History", purchaseHistory)}
        {renderTable("Paid Amounts", paidHistory)}
        {renderTable("Pending Amounts", [
          {
            id: 1,
            date: new Date().toISOString().split("T")[0],
            description: "Remaining Amount",
            amount: totalPending,
          },
        ])}
      </div>
    </div>
  );
};

export default BillDetails;
