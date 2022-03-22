// Models
const { Movie } = require('../models/movie.model');

// Utils
const { catchAsync } = require('../util/catchAsync');
const { filterObj } = require('../util/filterObject');

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
    const { title, description, duration, image, genre } = req.body;

    // Validating empty fields
    if (
        !title ||
        !description ||
        !image ||
        !genre ||
        !duration ||
        title.length === 0 ||
        description.length === 0 ||
        image.length === 0 ||
        genre.length === 0
    ) {
        return next(
            new AppError(
                400,
                'Insure to include all information for movie request'
            )
        );
    }

    const newMovie = await Movie.create({
        title: title,
        description: description,
        image: image,
        genre: genre,
        duration: duration,
        genre: genre
    });

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

    const movie = Movie.findOne({
        where: {
            id: id,
            status: 'active'
        }
    });

    if (!movie) {
        res.status(204).json({
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
