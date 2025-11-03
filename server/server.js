require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parses JSON request bodies

// Routes
const merchantRoutes = require('./routes/merchantRoutes');
const customerRoutes = require('./routes/customerRoutes');

app.use('/api/merchants', merchantRoutes);
app.use('/api/customers', customerRoutes);

// Basic root route
app.get('/', (req, res) => {
  res.send('Payment Tracking API is running');
});

// Connect to MongoDB (MONGO_URI in env or fallback to local)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/payment_tracking_db';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start server
// Add basic crash handlers to surface errors during startup/runtime
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception - the process will exit:', err && err.stack ? err.stack : err);
  // allow default behavior (exit) after logging
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection - reason:', reason);
});

// Bind to all interfaces to avoid interface-specific bind issues and log PID
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT} (pid=${process.pid})`);
});

// Heartbeat to help diagnose unexpected process exit (prints every 5s)
setInterval(() => {
  console.log(`heartbeat: pid=${process.pid} time=${new Date().toISOString()}`);
}, 5000);
