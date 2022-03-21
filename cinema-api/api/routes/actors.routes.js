const express = require('express');

// Controllers
const {
    getAllActors,
    getAnActorById,
    createNewActor,
    updateActor,
    deleteActor
} = require('../controllers/actors.controller');

const router = express.Router();

// Get all actors
router.get('/', getAllActors);

// Get an actor by id
router.get('/:id', getAnActorById);

// Create a new actor
router.post('/', createNewActor);

// Update an actor
router.patch('/:id', updateActor);

// Delete an actor
router.delete('/:id', deleteActor);

module.exports = { usersRouter: router };