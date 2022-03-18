const express = require('express');

// Init express
const app = express();

// Enable JSON 
app.use(express.json());

module.exports = { app };