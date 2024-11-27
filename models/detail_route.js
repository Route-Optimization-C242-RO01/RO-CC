'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Detail_route extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Detail_route.belongsTo(models.Route, {
        foreignKey: 'id_route',
        as: 'data_route_detail',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  Detail_route.init({
    id_detail_route: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    id_route: {
      type: DataTypes.UUID,
      allowNull: false
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    province: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    postal_code: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    kg: {
      type: DataTypes.DECIMAL(10,5),
      allowNull: true
    },
    longitude: {
      type: DataTypes.DECIMAL(9,6),
      allowNull: false
    },
    latitude: {
      type: DataTypes.DECIMAL(9,6),
      allowNull: false
    },
    demand:{
      type: DataTypes.INTEGER(3),
      allowNull: false
    },
    sequence:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0, 
    }
  }, {
    sequelize,
    modelName: 'Detail_route',
    tableName: 'Detail_routes',
    timestamps: true
  });
  return Detail_route;
};