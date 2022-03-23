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

// Get all actors
router.get('/', validateSession, getAllUsers);

// Get an actor by id
router.get('/:id', validateSession, getAnUserById);

// Create a new actor
router.post('/', createNewUser);

// Update an actor
router.patch('/:id', updateUser);

// Delete an actor
router.delete('/:id', deleteUser);

// Loggin
router.post('/login', loginUser);

module.exports = { usersRouter: router };