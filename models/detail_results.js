'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Detail_results extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Detail_results.init({
    id_detail_results: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    id_results: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.DECIMAL(10,8),
      allowNull: false,
    },
    latitude: {
      type: DataTypes.DECIMAL(10,8),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Detail_results',
    tableName: 'Detail_results',
    timestamps: true
  });
  return Detail_results;
};