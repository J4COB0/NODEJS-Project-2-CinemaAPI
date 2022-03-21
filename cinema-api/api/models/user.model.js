const { DataTypes } = require('sequelize');

// Utils
const { sequelize } = require('../util/database');

const User = sequelize.define('user', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    status: {
        type: DataTypes.STRING(10),
        defaultValue: 'active',
        allowNull: false
    },
    role: {
        type: DataTypes.STRING(10),
        defaultValue: 'guest',
        allowNull: false
    }
});

module.exports = { User };
