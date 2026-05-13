const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Libro = sequelize.define('Libro', {

    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },

    autor: {
        type: DataTypes.STRING,
        allowNull: false
    },

    precio: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },

    stock: {
        type: DataTypes.INTEGER,
        validate: {
            min: 1,
            max: 26
        }
    },

    fecha: {
        type: DataTypes.DATEONLY
    },

    categoria_id: {
        type: DataTypes.INTEGER
    }

}, {
    tableName: 'libros',
    timestamps: false
});

module.exports = Libro;