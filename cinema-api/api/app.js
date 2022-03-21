const express = require('express');

// Controllers
const { globalErrorHandle } = require('./controllers/error.controller');

// Routes
const { actorsRouter } = require('./routes/actors.routes');
const { moviesRouter } = require('./routes/movies.routes');
const { usersRouter } = require('./routes/users.routes');

// Utils
const { AppError } = require('./utils/appError');

// Init express
const app = express();

// Enable JSON 
app.use(express.json());

// Endpoints
app.use('/api/v1/actors', actorsRouter);
app.use('/api/v1/movies', moviesRouter);
app.use('/api/v1/users', usersRouter);

app.use('*', (req, res, next) => {
    next(new AppError(404, `${req.originalUrl} not found in this server.`));
});

// Error handler
app.use(globalErrorHandle);

module.exports = { app };