// Models
const { Actor } = require('../models/actor.model');
const { ActorInMovie } = require('../models/actorInMovie.model');
const { Movie } = require('../models/movie.model');
const { Review } = require('../models/review.model');
const { User } = require('../models/user.model');

const initModels = () => {
    // Models relations
    User.hasMany(Review);
    Review.belongsTo(User);

    Movie.hasMany(Review);
    Review.belongsTo(Movie);

    Movie.hasMany(ActorInMovie);
    ActorInMovie.belongsTo(Movie);

    Actor.hasMany(ActorInMovie);
    ActorInMovie.belongsTo(Actor);
};

module.exports = { initModels };
