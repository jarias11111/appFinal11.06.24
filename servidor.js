const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const reciclableRoutes = require('./rutas/rutasModulosReciclable');
const transactionRoutes = require('./rutas/rutasModulosTransaction');
const userRoutes = require('./rutas/rutasModulosUsuarios');

const PORT = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/reciclables', reciclableRoutes);
app.use('/transactions', transactionRoutes);
app.use('/user', userRoutes);

// Connect to MongoDB
mongoose.connect(process.env.IDENTIFICADORDERECURSOSUNIFORME)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
