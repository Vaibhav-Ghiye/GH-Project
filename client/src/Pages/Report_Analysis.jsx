import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from "recharts";

const ReportAnalysis = () => {
  // 🔹 Dummy data for demo (replace with backend data later)
  const paymentsData = [
    { name: "Customer 1", Paid: 4000, Pending: 2400 },
    { name: "Customer 2", Paid: 3000, Pending: 1398 },
    { name: "Customer 3", Paid: 2000, Pending: 9800 },
    { name: "Customer 4", Paid: 2780, Pending: 3908 },
  ];

  const monthlyData = [
    { month: "Jan", amount: 4000 },
    { month: "Feb", amount: 3000 },
    { month: "Mar", amount: 5000 },
    { month: "Apr", amount: 2780 },
    { month: "May", amount: 4890 },
  ];

  const pieData = [
    { name: "Customers Pending", value: 6000 },
    { name: "Suppliers Pending", value: 4000 },
  ];

  const COLORS = ["#0088FE", "#FF8042"];

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-blue-50 p-8">
      <h1 className="text-4xl font-bold text-center mb-10 text-indigo-900">
        Report & Analysis Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Bar Chart */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Customer Payment Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={paymentsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Paid" fill="#4CAF50" />
              <Bar dataKey="Pending" fill="#F44336" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Monthly Payment Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#3f51b5" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white shadow-lg rounded-xl p-6 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Outstanding Balance Share</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ReportAnalysis;
