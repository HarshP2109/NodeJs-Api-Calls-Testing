const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.config');
const userRoutes = require('./routes/user.routes');

dotenv.config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/worko', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;