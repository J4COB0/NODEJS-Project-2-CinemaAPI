const bcrypt = require('bcryptjs');

// Models
const { User } = require('../models/user.model');
const { Review } = require('../models/review.model');

// Utils
const { catchAsync } = require('../util/catchAsync');
const { filterObj } = require('../util/filterObject');

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
    const { username, email, password } = req.body;

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
        password: hashedPassword
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

    const user = User.findOne({
        where: {
            id: id,
            status: 'active'
        }
    });

    if (!user) {
        res.status(204).json({
            status: 'Error',
            message: 'Cannot found the user with the ID given'
        });
        return;
    }

    // Soft delete
    const data = { status: 'deleted' };
    await user.update({ ...data });

    res.status(204).json({
        status: 'Success'
    });
});
