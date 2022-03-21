const express = require('express');

// Controllers
const {
    getAllMovies,
    getAMovieById,
    createNewMovie, 
    updateMovie,
    deleteMovie
} = require('../controllers/movies.controller');

const router = express.Router();

// Get all actors
router.get('/', getAllMovies);

// Get an actor by id
router.get('/:id', getAMovieById);

// Create a new actor
router.post('/', createNewMovie);

// Update an actor
router.patch('/:id', updateMovie);

// Delete an actor
router.delete('/:id', deleteMovie);

module.exports = { moviesRouter: router };