import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, PlusCircle, Trash2 } from "lucide-react";

const CustomerDetails = () => {
  const { name } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("active");
  const [invoices, setInvoices] = useState([
    { invoiceNumber: "INV-201", date: "2025-09-01", amount: 5000, status: "Pending" },
    { invoiceNumber: "INV-202", date: "2025-09-05", amount: 3000, status: "Paid" },
    { invoiceNumber: "INV-203", date: "2025-09-15", amount: 4500, status: "Pending" },
    { invoiceNumber: "INV-204", date: "2025-09-20", amount: 6000, status: "Paid" },
  ]);

  const customerInfo = {
    name: decodeURIComponent(name),
    bankAccount: "9876543210",
    ifsc: "HDFC0001234",
  };

  // Summary
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

  // Add new invoice
  const handleAddInvoice = () => {
    const newInvoiceNumber = `INV-${200 + invoices.length + 1}`;
    const newInvoice = {
      invoiceNumber: newInvoiceNumber,
      date: new Date().toISOString().split("T")[0],
      amount: Math.floor(Math.random() * 5000) + 1000,
      status: "Pending",
    };
    setInvoices([...invoices, newInvoice]);
  };

  // Delete invoice
  const handleDeleteInvoice = (invoiceNumber) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      setInvoices(invoices.filter((inv) => inv.invoiceNumber !== invoiceNumber));
    }
  };

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

        {/* Toggle & Add Button */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex">
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

          {/* Add New Invoice Button */}
          <button
            onClick={handleAddInvoice}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <PlusCircle className="w-5 h-5 mr-2" /> Add Invoice
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
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.length > 0 ? (
              filteredInvoices.map((inv) => (
                <tr
                  key={inv.invoiceNumber}
                  className="border-b hover:bg-blue-50 cursor-pointer"
                >
                  <td
                    className="py-2 px-4"
                    onClick={() =>
                      navigate(
                        `/customers/${encodeURIComponent(
                          customerInfo.name
                        )}/bill/${inv.invoiceNumber}`
                      )
                    }
                  >
                    {inv.invoiceNumber}
                  </td>
                  <td className="py-2 px-4">{inv.date}</td>
                  <td className="py-2 px-4">₹{inv.amount}</td>
                  <td
                    className={`py-2 px-4 font-semibold ${
                      inv.status === "Pending" ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {inv.status}
                  </td>
                  <td className="py-2 px-4 text-center">
                    <button
                      onClick={() => handleDeleteInvoice(inv.invoiceNumber)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-5 h-5 inline" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-3 text-gray-500">
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
