const express = require('express');
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const dbConnection = require('./helpers/dbConnections');
const routes = require('./routes');

dotenv.config();

const app = express();

// Database connections
dbConnection();
mongoose.connection.on('connected', () => {
    console.log("DB connected successfully");
})

// API routes
app.use('/', routes);

// Server initiation
app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`);
}).on("error", (error: any) => {
    throw new Error(error.message);
})