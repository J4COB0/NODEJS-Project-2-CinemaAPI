const { DataTypes } = require('sequelize');

// Util
const { sequelize } = require('../util/database');

const Actor = sequelize.define('actor', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    country: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        defaultValue: 5,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    profilePic: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    status: {
        type: DataTypes.STRING(10),
        defaultValue: 'active',
        allowNull: false
    }
});

module.exports = { Actor };
