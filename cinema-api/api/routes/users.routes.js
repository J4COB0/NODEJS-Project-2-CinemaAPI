const express = require('express');

// Controllers
const {
    getAllUsers,
    getAnUserById,
    createNewUser,
    updateUser,
    deleteUser
} = require('../controllers/users.controller');

const router = express.Router(); 

// Get all actors
router.get('/', getAllUsers);

// Get an actor by id
router.get('/:id', getAnUserById);

// Create a new actor
router.post('/', createNewUser);

// Update an actor
router.patch('/:id', updateUser);

// Delete an actor
router.delete('/:id', deleteUser);

module.exports = { usersRouter: router };