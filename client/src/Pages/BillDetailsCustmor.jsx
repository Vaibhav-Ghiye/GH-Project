import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Edit, Plus } from "lucide-react";

const BillDetailsCustomer = () => {
  const { name, invoice } = useParams();
  const navigate = useNavigate();

  // ✅ Customer Purchase History
  const [purchaseHistory, setPurchaseHistory] = useState([
    { id: 1, date: "2025-09-01", description: "Hydraulic Pump", amount: 5000 },
    { id: 2, date: "2025-09-03", description: "Pipe Fitting", amount: 2000 },
  ]);

  // ✅ Payments Made by Customer
  const [paidHistory, setPaidHistory] = useState([
    { id: 1, date: "2025-09-10", description: "Advance Payment", amount: 3000 },
    { id: 2, date: "2025-09-15", description: "Second Payment", amount: 2000 },
  ]);

  const [editData, setEditData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [tableType, setTableType] = useState("");

  // ✅ Calculate totals dynamically
  const totalPurchase = purchaseHistory.reduce((sum, r) => sum + r.amount, 0);
  const totalPaid = paidHistory.reduce((sum, r) => sum + r.amount, 0);
  const totalPending = totalPurchase - totalPaid;

  // ✅ Add or Edit Entry
  const handleSave = (newEntry) => {
    if (tableType === "purchase") {
      if (editData) {
        setPurchaseHistory((prev) =>
          prev.map((item) => (item.id === editData.id ? newEntry : item))
        );
      } else {
        setPurchaseHistory((prev) => [
          ...prev,
          { ...newEntry, id: Date.now() },
        ]);
      }
    } else if (tableType === "paid") {
      if (editData) {
        setPaidHistory((prev) =>
          prev.map((item) => (item.id === editData.id ? newEntry : item))
        );
      } else {
        setPaidHistory((prev) => [...prev, { ...newEntry, id: Date.now() }]);
      }
    }
    setShowForm(false);
    setEditData(null);
  };

  // ✅ Form for Add/Edit
  const FormModal = () => {
    const [form, setForm] = useState(
      editData || { date: "", description: "", amount: "" }
    );

    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-xl shadow-xl w-96">
          <h3 className="text-lg font-semibold mb-4 text-blue-700">
            {editData ? "Edit Entry" : "Add New Entry"}
          </h3>
          <input
            type="date"
            className="border p-2 w-full rounded mb-3"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            className="border p-2 w-full rounded mb-3"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <input
            type="number"
            placeholder="Amount"
            className="border p-2 w-full rounded mb-4"
            value={form.amount}
            onChange={(e) =>
              setForm({ ...form, amount: Number(e.target.value) })
            }
          />
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={() => handleSave(form)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ✅ Reusable Table Renderer
  const renderTable = (title, data, type) => {
    const total = data.reduce((sum, row) => sum + row.amount, 0);
    return (
      <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-blue-800">{title}</h2>
          <button
            onClick={() => {
              setTableType(type);
              setEditData(null);
              setShowForm(true);
            }}
            className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 text-sm">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="py-2 px-4 text-left">Date</th>
                <th className="py-2 px-4 text-left">Description</th>
                <th className="py-2 px-4 text-left">Amount</th>
                <th className="py-2 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((row) => (
                  <tr key={row.id} className="border-b hover:bg-blue-50">
                    <td className="py-2 px-4">{row.date}</td>
                    <td className="py-2 px-4">{row.description}</td>
                    <td className="py-2 px-4 font-semibold">
                      ₹{row.amount.toLocaleString()}
                    </td>
                    <td className="text-center">
                      <button
                        onClick={() => {
                          setTableType(type);
                          setEditData(row);
                          setShowForm(true);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit className="w-4 h-4 inline" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="py-3 text-center text-gray-500 italic"
                  >
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr className="bg-gray-100 font-semibold">
                <td colSpan="3" className="py-2 px-4 text-right">
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
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-700 mb-4 hover:underline"
      >
        <ArrowLeft className="w-5 h-5 mr-1" /> Back
      </button>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
          <h1 className="text-2xl font-bold text-blue-800 mb-2">
            Invoice: {invoice}
          </h1>
          <p className="text-gray-700">
            Customer: <span className="font-semibold">{name}</span>
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
        {renderTable("Purchase History", purchaseHistory, "purchase")}
        {renderTable("Paid Amounts", paidHistory, "paid")}
        {renderTable("Pending Amounts", [
          {
            id: 1,
            date: new Date().toISOString().split("T")[0],
            description: "Remaining Balance",
            amount: totalPending,
          },
        ])}
      </div>

      {showForm && <FormModal />}
    </div>
  );
};

export default BillDetailsCustomer;
