// Models
const { Movie } = require('../models/movie.model');
const { ActorInMovie } = require('../models/actorInMovie.model');

// Utils
const { catchAsync } = require('../util/catchAsync');
const { filterObj } = require('../util/filterObject');
const { AppError } = require('../util/appError');

exports.getAllMovies = catchAsync(async (req, res, next) => {
    const movies = await Movie.findAll({
        where: { status: 'active' }
    });

    res.status(200).json({
        status: 'success',
        data: {
            movies: movies
        }
    });
});

exports.getAMovieById = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const movie = await Movie.findOne({
        where: {
            id: id,
            status: 'active'
        }
    });

    if (!movie) {
        return next(new AppError(404, 'movie not found'));
    }

    res.status(200).json({
        status: 'success',
        data: {
            movie: movie
        }
    });
});

exports.createNewMovie = catchAsync(async (req, res, next) => {
    const { title, description, duration, image, genre, rating, actorsId } = req.body;

    // Validating empty fields
    if (
        !title ||
        !description ||
        !duration ||
        !rating ||
        !image ||
        !genre ||
        !actorsId ||
        title.length === 0 ||
        description.length === 0 ||
        rating < 0 ||
        rating > 5 ||
        image.length === 0 ||
        genre.length === 0
    ) {
        return next(
            new AppError(
                400,
                'Insure to include all correctly information for movie request'
            )
        );
    }

    const newMovie = await Movie.create({
        title: title,
        description: description,
        image: image,
        genre: genre,
        duration: duration,
        rating: rating,
        genre: genre
    });

    const actorInMoviePromises = actorsId.map(async actorId => {
       const newActorInMovie = await ActorInMovie.create({
            actorId: actorId,
            movieId: newMovie.id
        });
        return newActorInMovie;
        //return await ActorInMovie.create({ actorId, movieId: newMovie.id });
    });

    await Promise.all(actorInMoviePromises);

    res.status(201).json({
        status: 'success',
        data: { newMovie }
    });
});

exports.updateMovie = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const data = filterObj(req.body, 'title', 'description', 'image', 'genre', 'duration');
    const movie = await Movie.findOne({
        where: {
            id: id,
            status: 'active'
        }
    });

    if (!movie) {
        res.status(404).json({
            status: 'Error',
            message: 'Cant update the movie, invalid ID'
        });
        return;
    }

    await movie.update({ ...data });

    res.status(204).json({ status: 'success' });
});

exports.deleteMovie = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const movie = await Movie.findOne({
        where: {
            id: id,
            status: 'active'
        }
    });

    if (!movie) {
        res.status(400).json({
            status: 'error',
            message: 'Cannot found the movie with the ID given'
        });
        return;
    }

    // Soft delete
    const data = { status: 'deleted' };
    await movie.update({ ...data });

    res.status(204).json({
        status: 'success'
    });
});
