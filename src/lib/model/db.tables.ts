// tslint:disable
import * as path from 'path';
import * as sequelizer from 'sequelize';
import * as def from './db';

export interface ITables {
  users:def.usersModel;
  warehouse:def.warehousesModel;
  product:def.productsModel;
  
}

export const getModels = function(seq:sequelizer.Sequelize):ITables {
  const tables:ITables = {
    users: seq.import(path.join(__dirname, './users')),
    warehouse: seq.import(path.join(__dirname, './warehouse')),
    product: seq.import(path.join(__dirname, './products')),
    
  };
  return tables;
}; 
 