const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { promisify } = require('util');

// Models
const { User } = require('../models/user.model');

// Utils
const { AppError } = require('../util/appError');
const { catchAsync } = require('../util/catchAsync');

dotenv.config({ path: './config.env' });

exports.validateSession = catchAsync(async (req, res, next) => {
    // Extract token from headers
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new AppError(401, 'Invalid session'));
    }

    // Verify that token is still valid
    const decodedToken = await promisify(jwt.verify)(
        token,
        process.env.JWT_SIGNATURE
    );

    // Validate that the id the token contains belongs to a valid user
    const user = await User.findOne({
        where: { id: decodedToken.id, status: 'active' },
        attributes: {
            exclude: ['password']
        }
    });

    if (!user) {
        return next(new AppError(401, 'Invalid session'));
    }

    req.currentUser = user;
    next();
});

exports.protectAdmin = catchAsync(async (req, res, next) => {
    const { currentUser } = req;
    if (currentUser.role != 'admin') {
        return next(new AppError(403, 'Access denied'));
    }

    next();
});
