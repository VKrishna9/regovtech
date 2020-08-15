
import * as sequelize from "sequelize";
import { DataTypes } from 'sequelize';

import {warehousesInstance, warehousesAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<warehousesInstance, warehousesAttribute>('warehouses', {
    
    warehousename: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'warehousename'
    },
    warehousetype: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'warehousetype'
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'location'
      }
   
  }, {
    tableName: 'warehouses'
  });
};
