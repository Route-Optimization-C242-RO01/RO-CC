'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Route extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Route.belongsTo(models.Results, {
        foreignKey: 'id_results',
        as: 'data_results_route',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      Route.hasMany(models.Detail_route, {
        foreignKey: 'id_route',
        as: 'data_detailRoute_route', 
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  Route.init({
    id_route: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    id_results: {
      type: DataTypes.UUID,
      allowNull: false
    },
    vehicle_sequence:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0, 
    }
  }, {
    sequelize,
    tableName: 'Routes',
    modelName: 'Route',
    timestamps: true
  });
  return Route;
};