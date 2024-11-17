'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Token_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Token_user.belongsTo(models.User, {
        foreignKey: 'id_user',
        as: 'data_user_token',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  Token_user.init({
    id_token: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    id_user: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    expires_at: {  
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: () => new Date(new Date().getTime() + (7 * 24 * 60 * 60 * 1000))
    },
  }, {
    sequelize,
    modelName: 'Token_user',
    tableName: 'Token_users',
    timestamps: true
  });
  return Token_user;
};