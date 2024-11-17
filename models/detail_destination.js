'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Detail_destination extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Detail_destination.init({
    id_detail_destination: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    id_destination: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    province: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    postal_code: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    kg: {
      type: DataTypes.INTEGER(5),
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Detail_destination',
    tableName: 'Detail_destinations',
    timestamps: true
  });
  return Detail_destination;
};