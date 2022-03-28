const express = require('express');

// Controllers
const {
    getAllActors,
    getAnActorById,
    createNewActor,
    updateActor,
    deleteActor
} = require('../controllers/actors.controller');

// Middleware
const { validateSession, protectAdmin } = require('../middlewares/auth.middleware');

const router = express.Router();

// Validation
router.use(validateSession);

// Get all actors
router.get('/', getAllActors);

// Get an actor by id
router.get('/:id', getAnActorById);

// Functions that only an admin can do
router.use(protectAdmin);

// Create a new actor
router.post('/', createNewActor);

// Update an actor
router.patch('/:id', updateActor);

// Delete an actor
router.delete('/:id', deleteActor);

module.exports = { actorsRouter: router };