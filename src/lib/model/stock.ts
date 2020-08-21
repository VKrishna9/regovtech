
import * as sequelize from "sequelize";
import { DataTypes } from 'sequelize';

import {stockInstance, stockAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<stockInstance, stockAttribute>('stock', {
    
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'quantity'
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'price'
    },
    createdby: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'createdby'
    },
    createddate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'createddate'
    },
    productid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'createdby'
      },
    warehouseid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'warehouseid'
      }
  }, {
    tableName: 'stock'
  });
};
