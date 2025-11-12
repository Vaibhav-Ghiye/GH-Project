import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, PlusCircle, Trash2, Edit3, Save } from "lucide-react";

const SupplierDetails = () => {
  const { name } = useParams();
  const navigate = useNavigate();

  // Supplier Info
  const [supplierInfo, setSupplierInfo] = useState({
    phone: "9876543210",
    bankAccount: "123456789012",
    ifsc: "SBIN0001234",
    totalOrders: 12,
    totalPaid: 56000,
    totalPending: 22000,
  });

  const [isEditing, setIsEditing] = useState(false);

  // Bills
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
    // API call could go here
  }, [name]);

  const displayedBills = activeTab === "active" ? pendingBills : paidBills;

  // 🧾 Add new invoice
  const handleAddBill = () => {
    const newInvoice = {
      invoice: `INV-${Math.floor(Math.random() * 900 + 100)}`,
      date: new Date().toISOString().split("T")[0],
      amount: Math.floor(Math.random() * 10000) + 2000,
    };

    if (activeTab === "active") {
      setPendingBills([...pendingBills, newInvoice]);
      setSupplierInfo((prev) => ({
        ...prev,
        totalOrders: prev.totalOrders + 1,
        totalPending: prev.totalPending + newInvoice.amount,
      }));
    } else {
      setPaidBills([...paidBills, newInvoice]);
      setSupplierInfo((prev) => ({
        ...prev,
        totalOrders: prev.totalOrders + 1,
        totalPaid: prev.totalPaid + newInvoice.amount,
      }));
    }
  };

  // ❌ Delete invoice
  const handleDeleteBill = (invoice) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      if (activeTab === "active") {
        const deleted = pendingBills.find((b) => b.invoice === invoice);
        setPendingBills(pendingBills.filter((b) => b.invoice !== invoice));
        setSupplierInfo((prev) => ({
          ...prev,
          totalOrders: prev.totalOrders - 1,
          totalPending: prev.totalPending - (deleted?.amount || 0),
        }));
      } else {
        const deleted = paidBills.find((b) => b.invoice === invoice);
        setPaidBills(paidBills.filter((b) => b.invoice !== invoice));
        setSupplierInfo((prev) => ({
          ...prev,
          totalOrders: prev.totalOrders - 1,
          totalPaid: prev.totalPaid - (deleted?.amount || 0),
        }));
      }
    }
  };

  // ✏️ Edit supplier info
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setSupplierInfo({ ...supplierInfo, [name]: value });
  };

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
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-green-800">{name}</h1>
          <button
            onClick={handleEditToggle}
            className="flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700"
          >
            {isEditing ? (
              <>
                <Save className="w-5 h-5" /> Save
              </>
            ) : (
              <>
                <Edit3 className="w-5 h-5" /> Edit Info
              </>
            )}
          </button>
        </div>

        {/* Editable Supplier Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-gray-600">Phone Number</p>
            {isEditing ? (
              <input
                name="phone"
                value={supplierInfo.phone}
                onChange={handleInfoChange}
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
            ) : (
              <p className="text-lg font-semibold text-green-800">
                {supplierInfo.phone}
              </p>
            )}
          </div>

          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-gray-600">Bank Account</p>
            {isEditing ? (
              <input
                name="bankAccount"
                value={supplierInfo.bankAccount}
                onChange={handleInfoChange}
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
            ) : (
              <p className="text-lg font-semibold text-green-800">
                {supplierInfo.bankAccount}
              </p>
            )}
          </div>

          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-gray-600">IFSC Code</p>
            {isEditing ? (
              <input
                name="ifsc"
                value={supplierInfo.ifsc}
                onChange={handleInfoChange}
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
            ) : (
              <p className="text-lg font-semibold text-green-800">
                {supplierInfo.ifsc}
              </p>
            )}
          </div>
        </div>

        {/* Summary Cards */}
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

        {/* Tabs + Add Bill Button */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-4">
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

          {/* Add New Bill Button */}
          <button
            onClick={handleAddBill}
            className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            <PlusCircle className="w-5 h-5 mr-2" /> Add Bill
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
                <th className="py-2 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedBills.map((bill, idx) => (
                <tr
                  key={idx}
                  className="border-b hover:bg-green-50 transition-colors"
                >
                  <td
                    className="py-2 px-4 cursor-pointer"
                    onClick={() =>
                      navigate(
                        `/suppliers/${encodeURIComponent(name)}/bills/${bill.invoice}`
                      )
                    }
                  >
                    {bill.invoice}
                  </td>
                  <td className="py-2 px-4">{bill.date}</td>
                  <td className="py-2 px-4 font-semibold">
                    ₹{bill.amount.toLocaleString()}
                  </td>
                  <td className="py-2 px-4 text-center">
                    <button
                      onClick={() => handleDeleteBill(bill.invoice)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-5 h-5 inline" />
                    </button>
                  </td>
                </tr>
              ))}
              {displayedBills.length === 0 && (
                <tr>
                  <td colSpan="4" className="py-4 text-center text-gray-500">
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
