require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const mongo_uri = process.env.MONGO_URI;

const allowedOrigins = [
    'http://localhost:3000',
    'https://candidate-seat-allocation.netlify.app',
    'https://candidate-seat-allocation.onrender.com'
];

// Middleware
app.use(express.json());
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, curl, etc.)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

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