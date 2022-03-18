const { DataTypes } = require('sequelize');

// Util
const { sequelize } = require('../util/database');

const Movie = sequelize.define('movie', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    duration: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    raiting: {
        type: DataTypes.INTEGER,
        defaultValue: 5,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    genre: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    status: {
        type: DataTypes.STRING(10),
        defaultValue: 'active',
        allowNull: false
    }
});

module.exports = { Movie };
