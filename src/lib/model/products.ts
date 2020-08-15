
import * as sequelize from "sequelize";
import { DataTypes } from 'sequelize';

import {productsInstance, productsAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<productsInstance, productsAttribute>('products', {
    
    productname: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'productname'
    },
    producttype: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'producttype'
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'quantity'
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'price'
    },
    whid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'whid'
    }
  }, {
    tableName: 'products'
  });
};
