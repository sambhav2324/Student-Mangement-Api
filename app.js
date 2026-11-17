const express = require('express');
const logger = require('./middleware/logger');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Custom Logger Middleware
app.use(logger);

// Modular Routes
app.use('/students', studentRoutes);

// Root Route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Student Management REST API' });
});

// 404 Error Handler for undefined routes
app.use((req, res, next) => {
    res.status(404).json({ error: 'Route not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
