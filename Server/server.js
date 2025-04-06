// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'uploads')));


// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));

// Connect to MongoDB and Start Server
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {})
    .then(() => {
        console.log('MongoDB connected');
        app.listen(PORT, () => console.log(` Server running on http://localhost:${PORT}`));
    })
    .catch((err) => {
        console.error(' Failed to connect to MongoDB', err);
    });
