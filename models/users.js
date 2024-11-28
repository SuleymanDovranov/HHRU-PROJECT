'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate({ Clients }) {
      this.hasMany(Clients, {
        foreignKey: 'userId',
        as: 'clients',
      });
    }
  }
  Users.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      firstName: {
        type: DataTypes.STRING,
        unique: true,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      gender: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      tableName: 'users',
      modelName: 'Users',
    }
  );
  return Users;
};
