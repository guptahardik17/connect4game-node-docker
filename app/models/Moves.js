'use strict';

module.exports = (sequelize, DataTypes) => {

  const Moves = sequelize.define('Moves', {
    usertoken: DataTypes.STRING,
    column: DataTypes.INTEGER,
    row: DataTypes.INTEGER,
    turn: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    tableName: 'moves',
    modelName: 'Moves',
    timestamps: true,
  });

  return Moves;
};
