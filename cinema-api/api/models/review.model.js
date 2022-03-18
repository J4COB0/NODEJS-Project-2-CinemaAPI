const { DataTypes } = require('sequelize');

// Util
const { sequelize } = require('../util/database');

const Review = sequelize.define('review', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    comment: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        defaultValue: 5,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING(10),
        defaultValue: 'active',
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    movieId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = { Review };
