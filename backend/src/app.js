require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;
const mongo_uri = process.env.MONGO_URI;

// Middleware
app.use(express.json());

// MongoDB connection
mongoose.connect(mongo_uri)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', studentRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});