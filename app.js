'use strict';
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.promise = require('bluebird');
const cors = require('cors');
const app = express();

const config = require('./config/database');

// Connect To Database
mongoose.connect(config.database,
    {useNewUrlParser: true});

// On Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database at: '+ config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
    console.log('Database error: '+ err);
});

// Port Number
const port = 3001;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// CORS Middleware
app.use(cors());

const health = require('./routes/health');
app.use('/health', health);

const books = require('./routes/books');
app.use('/', books);

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

// Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start Server
app.listen(port, () => {
    console.log('Server started on port '+port);
});

module.exports = app;
