import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Factory, Search, Plus } from "lucide-react"; // ✅ icons

const Suppliers = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [suppliers, setSuppliers] = useState([
    "Global Hydraulics Pvt. Ltd.",
    "Maha Tools & Equipments",
    "HydroTech India",
    "Precision Hydraulics",
    "Pune Engineering Works",
    "Nashik Hydraulics",
    "Shakti Enterprises",
    "Fluid Power Systems",
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newSupplier, setNewSupplier] = useState("");

  const filteredSuppliers = suppliers.filter((name) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddSupplier = () => {
    if (newSupplier.trim()) {
      setSuppliers([...suppliers, newSupplier.trim()]);
      setNewSupplier("");
      setShowModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-green-200 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-green-900">
        Supplier Management
      </h1>

      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-xl p-6 relative">
        {/* Search Input */}
        <div className="flex items-center border rounded-lg px-3 py-2 mb-4 bg-gray-50">
          <Search className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search Supplier..."
            className="flex-1 outline-none bg-transparent"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Supplier List */}
        {filteredSuppliers.length > 0 ? (
          <ul className="space-y-3">
            {filteredSuppliers.map((name, index) => (
              <li
                key={index}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg shadow-sm hover:shadow-md hover:bg-green-50 cursor-pointer transition-all"
                onClick={() =>
                  navigate(`/suppliers/${encodeURIComponent(name)}`)
                }
              >
                <Factory className="w-6 h-6 text-green-600" />
                <span className="font-medium text-gray-800">{name}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No supplier found</p>
        )}

        {/* Floating Add New Supplier Button */}
        <button
          onClick={() => setShowModal(true)}
          className="fixed bottom-8 right-8 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 hover:scale-110 transition-all"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {/* Modal for Adding Supplier */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80">
            <h2 className="text-xl font-semibold mb-4 text-green-900">
              Add New Supplier
            </h2>
            <input
              type="text"
              placeholder="Enter supplier name"
              className="w-full p-2 border rounded mb-4"
              value={newSupplier}
              onChange={(e) => setNewSupplier(e.target.value)}
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSupplier}
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

export default Suppliers;
