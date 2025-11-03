import React, { useState } from "react";
import { useNavigate } from "react-router";
import { User, Search, Plus } from "lucide-react"; 

const Customers = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [customers, setCustomers] = useState([
    "Rahul Sharma",
    "Priya Patil",
    "Amit Verma",
    "Neha Gupta",
    "Rohan Deshmukh",
    "Sneha Kulkarni",
    "Arjun Mehta",
    "Pooja Joshi",
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newCustomer, setNewCustomer] = useState("");

  const filteredCustomers = customers.filter((name) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddCustomer = () => {
    if (newCustomer.trim()) {
      setCustomers([...customers, newCustomer.trim()]);
      setNewCustomer("");
      setShowModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-900">
        Customer Management
      </h1>

      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-xl p-6 relative">
        
        {/* Search Input */}
        <div className="flex items-center border rounded-lg px-3 py-2 mb-4 bg-gray-50">
          <Search className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search Customer..."
            className="flex-1 outline-none bg-transparent"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Customer List */}
        {filteredCustomers.length > 0 ? (
          <ul className="space-y-3">
            {filteredCustomers.map((name, index) => (
              <li
                key={index}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg shadow-sm hover:shadow-md hover:bg-blue-50 cursor-pointer transition-all"
                onClick={() =>
                  navigate(`/customers/${encodeURIComponent(name)}`)
                }
              >
                <User className="w-6 h-6 text-blue-600" />
                <span className="font-medium text-gray-800">{name}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No customer found</p>
        )}

        {/* Floating Add New Customer Button */}
        <button
          onClick={() => setShowModal(true)}
          className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 hover:scale-110 transition-all"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {/* Modal for Adding Customer */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80">
            <h2 className="text-xl font-semibold mb-4 text-blue-900">
              Add New Customer
            </h2>
            <input
              type="text"
              placeholder="Enter customer name"
              className="w-full p-2 border rounded mb-4"
              value={newCustomer}
              onChange={(e) => setNewCustomer(e.target.value)}
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCustomer}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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

export default Customers;
