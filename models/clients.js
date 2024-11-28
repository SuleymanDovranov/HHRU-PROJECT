'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clients extends Model {
    static associate({ Users }) {
      this.belongsTo(Users, {
        foreignKey: 'userId',
        as: 'user',
      });
    }
  }
  Clients.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      tableName: 'clients',
      modelName: 'Clients',
    }
  );
  return Clients;
};
