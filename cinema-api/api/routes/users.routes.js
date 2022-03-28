const express = require('express');

// Controllers
const {
    getAllUsers,
    getAnUserById,
    createNewUser,
    updateUser,
    deleteUser,
    loginUser
} = require('../controllers/users.controller');

// Middleware
const { validateSession } = require('../middlewares/auth.middleware');

const router = express.Router();

// Loggin
router.post('/login', loginUser);

// Create a new actor
router.post('/', createNewUser);

// Validate sessions
router.use(validateSession);

// Get all actors
router.get('/', getAllUsers);

// Get an actor by id
router.get('/:id', getAnUserById);

// Update an actor
router.patch('/:id', updateUser);

// Delete an actor
router.delete('/:id', deleteUser);

module.exports = { usersRouter: router };
