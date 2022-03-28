// Models
const { Actor } = require('../models/actor.model');
const { Movie } = require('../models/movie.model');

// Utils
const { catchAsync } = require('../util/catchAsync');
const { filterObj } = require('../util/filterObject');
const { AppError } = require('../util/appError');

exports.getAllActors = catchAsync(async (req, res, next) => {
    const actors = await Actor.findAll({
        where: { status: 'active' },
        include: [{ model: Movie }]
    });

    res.status(200).json({
        status: 'success',
        data: {
            actors: actors
        }
    });
});

exports.getAnActorById = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const actor = await Actor.findOne({
        where: {
            id: id,
            status: 'active'
        }
    });

    if (!actor) {
        return next(new AppError(404, 'actor not found'));
    }

    res.status(200).json({
        status: 'success',
        data: {
            actor: actor
        }
    });
});

exports.createNewActor = catchAsync(async (req, res, next) => {
    const { name, country, rating, age, profilePic } = req.body;

    // Validating empty fields
    if (
        !name ||
        !country ||
        !rating ||
        !age ||
        !profilePic ||
        name.length === 0 ||
        rating < 0 ||
        rating > 5 ||
        country.length === 0 ||
        profilePic.length === 0
    ) {
        return next(
            new AppError(
                400,
                'Insure to include all correctly information for actor request'
            )
        );
    }

    const newActor = await Actor.create({
        name: name,
        country: country,
        rating: rating,
        age: age,
        profilePic: profilePic
    });

    res.status(201).json({
        status: 'success',
        data: { newActor }
    });
});

exports.updateActor = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const data = filterObj(
        req.body,
        'name',
        'country',
        'age',
        'rating',
        'profilePic'
    );
    const actor = await Actor.findOne({
        where: {
            id: id,
            status: 'active'
        }
    });

    if (!actor) {
        res.status(404).json({
            status: 'Error',
            message: 'Cant update the actor, invalid ID'
        });
        return;
    }

    await actor.update({ ...data });

    res.status(204).json({ status: 'success' });
});

exports.deleteActor = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const actor = await Actor.findOne({
        where: {
            id: id,
            status: 'active'
        }
    });

    if (!actor) {
        res.status(400).json({
            status: 'error',
            message: 'Cannot found the actor with the ID given'
        });
        return;
    }

    // Soft delete
    const data = { status: 'deleted' };
    await actor.update({ ...data });

    res.status(204).json({
        status: 'success'
    });
});
