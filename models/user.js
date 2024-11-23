'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Token_user, {
        foreignKey: 'id_user',
        as: 'data_token_user', 
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      User.hasMany(models.Results, {
        foreignKey: 'id_user',
        as: 'data_results_user', 
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  User.init({
    id_user: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(256),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',  
    timestamps: true
  });
  return User;
};