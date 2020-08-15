
import * as sequelize from "sequelize";
import { DataTypes } from 'sequelize';

import {usersInstance, usersAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<usersInstance, usersAttribute>('users', {
    
    username: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'username'
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'password'
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'firstname'
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'lastname'
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'status'
    },
    phonenumber: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      field: 'phonenumber'
    }
  }, {
    tableName: 'users'
  });
};
