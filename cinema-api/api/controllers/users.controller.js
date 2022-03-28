const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

// Models
const { User } = require('../models/user.model');
const { Review } = require('../models/review.model');

// Utils
const { catchAsync } = require('../util/catchAsync');
const { filterObj } = require('../util/filterObject');
const { AppError } = require('../util/appError');

exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.findAll({
        where: { status: 'active' },
        attributes: {
            exclude: ['password']
        },
        include: [{ model: Review }]
    });

    res.status(200).json({
        status: 'success',
        data: {
            users: users
        }
    });
});

exports.getAnUserById = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const user = await User.findOne({
        where: {
            id: id,
            status: 'active'
        },
        attributes: {
            exclude: ['password']
        }
    });

    if (!user) {
        return next(new AppError(404, 'user not found'));
    }

    res.status(200).json({
        status: 'Success',
        data: {
            user: user
        }
    });
});

exports.createNewUser = catchAsync(async (req, res, next) => {
    const { username, email, password, role } = req.body;

    // Validating empty fields
    if (
        !username ||
        !email ||
        !password ||
        username.length === 0 ||
        email.length === 0 ||
        password.length === 0
    ) {
        return next(
            new AppError(
                400,
                'Insure to include all information for this request'
            )
        );
    }

    // Encrypting password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        username: username,
        email: email,
        password: hashedPassword, 
        role
    });
    newUser.password = undefined;

    res.status(201).json({
        status: 'success',
        data: {
            data: newUser
        }
    });
});

exports.updateUser = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const data = filterObj(req.body, 'username', 'email');
    const user = await User.findOne({
        where: {
            id: id,
            status: 'active'
        }
    });

    if (!user) {
        res.status(404).json({
            status: 'Error',
            message: 'Can update user, invalid ID'
        });
        return;
    }

    await user.update({ ...data });

    res.status(204).json({
        status: 'success'
    });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const user = await User.findOne({
        where: {
            id: id,
            status: 'active'
        }
    });

    if (!user) {
        res.status(400).json({
            status: 'Error',
            message: 'Cannot found the user with the ID given'
        });
        return;
    }

    console.log(user);

    // Soft delete
    //const data = { status: 'deleted' };
    await user.update({ status: 'deleted' });

    res.status(204).json({
        status: 'Success'
    });
});


exports.loginUser = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
  
    // Find user given an email and has status active
    const user = await User.findOne({
      where: { email: email, status: 'active' }
    });
  
    // Compare entered password vs hashed password
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(new AppError(400, 'Credentials are invalid'));
    }
  
    // Create JWT
    const token = await jwt.sign(
      { id: user.id }, // Token payload
      process.env.JWT_SIGNATURE, // Secret key
      {
        expiresIn: process.env.JWT_EXPIRES_IN
      }
    );
  
    res.status(200).json({
      status: 'success',
      data: { token }
    });
  });