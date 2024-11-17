'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Destination extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Destination.hasMany(models.Detail_destination, {
        foreignKey: 'id_destination',
        as: 'dataDestination', 
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      Destination.hasMany(models.Results, {
        foreignKey: 'id_destination',
        as: 'dataResultsDestination', 
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      Destination.belongsTo(models.User, {
        foreignKey: 'id_user',
        as: 'dataUserDestination',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  Destination.init({
    id_destination: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    id_user: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Destination',
    tableName: 'Destinations',
    timestamps: true
  });
  return Destination;
};