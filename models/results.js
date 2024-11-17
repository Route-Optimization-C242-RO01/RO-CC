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
      Results.hasMany(models.Detail_results, {
        foreignKey: 'id_results',
        as: 'dataResults', 
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      Results.belongsTo(models.Destination, {
        foreignKey: 'id_destination',
        as: 'dataDestinationResults',
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
    id_destination: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Results',
    tableName: 'Results',
    timestamps: true
  });
  return Results;
};