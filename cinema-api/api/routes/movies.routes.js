const express = require('express');

// Controllers
const {
    getAllMovies,
    getAMovieById,
    createNewMovie,
    updateMovie,
    deleteMovie
} = require('../controllers/movies.controller');

// Middlewares
const {
    validateSession,
    protectAdmin
} = require('../middlewares/auth.middleware');

// Utils
const { upload } = require('../util/multer');

const router = express.Router();

// Validation
router.use(validateSession);

// Get all actors
router.get('/', getAllMovies);

// Get an actor by id
router.get('/:id', getAMovieById);

// Functions that only an admin can do
router.use(protectAdmin);

// Create a new actor
router.post('/', upload.single('img'), createNewMovie);

// Update an actor
router.patch('/:id', updateMovie);

// Delete an actor
router.delete('/:id', deleteMovie);

module.exports = { moviesRouter: router };
