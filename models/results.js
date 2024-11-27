'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Results extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Results.belongsTo(models.User, {
        foreignKey: 'id_user',
        as: 'data_user_results',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      Results.hasMany(models.Route, {
        foreignKey: 'id_results',
        as: 'data_route_results', 
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  Results.init({
    id_results: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    id_user: {
      type: DataTypes.UUID,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    number_of_vehicles: {
      type: DataTypes.INTEGER(3),
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    total_distance:{
      type: DataTypes.FLOAT(10,2),
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Results',
    tableName: 'Results',
    timestamps: true
  });
  return Results;
};