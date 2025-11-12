import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Plus, Pencil } from "lucide-react";

const BillDetails = () => {
  const { name, invoice } = useParams();
  const navigate = useNavigate();

  // ✅ Purchase & Payment Data
  const [purchaseHistory, setPurchaseHistory] = useState([
    { id: 1, date: "2025-08-02", description: "Hydraulic Pump", amount: 5000 },
    { id: 2, date: "2025-08-05", description: "Pipe Fitting", amount: 2000 },
  ]);

  const [paidHistory, setPaidHistory] = useState([
    { id: 1, date: "2025-08-10", description: "First Payment", amount: 4000 },
  ]);

  // ✅ Modal States
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // "purchase" | "paid"
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [entry, setEntry] = useState({ date: "", description: "", amount: "" });

  // ✅ Totals
  const totalPurchase = purchaseHistory.reduce((sum, r) => sum + r.amount, 0);
  const totalPaid = paidHistory.reduce((sum, r) => sum + r.amount, 0);
  const totalPending = totalPurchase - totalPaid;

  // ✅ Open Modal (Add/Edit)
  const openModal = (type, record = null) => {
    setModalType(type);
    setIsEdit(!!record);
    setEditId(record ? record.id : null);
    setEntry(
      record || { date: new Date().toISOString().split("T")[0], description: "", amount: "" }
    );
    setShowModal(true);
  };

  // ✅ Save Changes
  const handleSave = () => {
    const { date, description, amount } = entry;
    if (!date || !description || !amount) return alert("Please fill all fields");

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) return alert("Invalid amount");

    const newRecord = { id: Date.now(), date, description, amount: amountNum };

    if (modalType === "purchase") {
      if (isEdit) {
        setPurchaseHistory((prev) =>
          prev.map((r) => (r.id === editId ? { ...r, ...newRecord, id: editId } : r))
        );
      } else {
        setPurchaseHistory((prev) => [...prev, newRecord]);
      }
    } else if (modalType === "paid") {
      if (isEdit) {
        setPaidHistory((prev) =>
          prev.map((r) => (r.id === editId ? { ...r, ...newRecord, id: editId } : r))
        );
      } else {
        setPaidHistory((prev) => [...prev, newRecord]);
      }
    }

    setShowModal(false);
  };

  // ✅ Reusable Table
  const renderTable = (title, data, type) => {
    const total = data.reduce((sum, r) => sum + r.amount, 0);
    return (
      <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-green-800">{title}</h2>
          <button
            onClick={() => openModal(type)}
            className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 text-sm">
            <thead>
              <tr className="bg-green-600 text-white">
                <th className="py-2 px-4 text-left">Date</th>
                <th className="py-2 px-4 text-left">Description</th>
                <th className="py-2 px-4 text-left">Amount</th>
                <th className="py-2 px-4 text-center">Action</th>
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
                    <td className="py-2 px-4 text-center">
                      <button
                        onClick={() => openModal(type, row)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Pencil className="w-4 h-4 inline" /> Edit
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
                <td colSpan="2" className="py-2 px-4 text-right">
                  Total
                </td>
                <td className="py-2 px-4">₹{total.toLocaleString()}</td>
                <td></td>
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
        {/* Header */}
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
        {renderTable("Purchase History", purchaseHistory, "purchase")}
        {renderTable("Paid Amounts", paidHistory, "paid")}
        {renderTable("Pending Amounts", [
          {
            id: 1,
            date: new Date().toISOString().split("T")[0],
            description: "Remaining Amount",
            amount: totalPending,
          },
        ])}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80">
            <h2 className="text-xl font-semibold mb-4 text-green-900">
              {isEdit ? "Edit Entry" : "Add New Entry"}
            </h2>
            <input
              type="date"
              className="w-full p-2 border rounded mb-3"
              value={entry.date}
              onChange={(e) => setEntry({ ...entry, date: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description"
              className="w-full p-2 border rounded mb-3"
              value={entry.description}
              onChange={(e) => setEntry({ ...entry, description: e.target.value })}
            />
            <input
              type="number"
              placeholder="Amount"
              className="w-full p-2 border rounded mb-4"
              value={entry.amount}
              onChange={(e) => setEntry({ ...entry, amount: e.target.value })}
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillDetails;
