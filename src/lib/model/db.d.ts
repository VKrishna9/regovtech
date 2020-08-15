import * as Sequelize from "sequelize";


// table: users
export interface usersAttribute {
  username:string;
  password:string;
  status?:number;
  firstname?:string;
  phonenumber?:number;
  lastname?:string;
}
export interface usersInstance extends Sequelize.Instance<usersAttribute>, usersAttribute { }
export interface usersModel extends Sequelize.Model<usersInstance, usersAttribute> { }


// table: products
export interface productsAttribute {
  productname:string;
  producttype:number;
  quantity?:number;
  price?:number;
  whid?:number;
}
export interface productsInstance extends Sequelize.Instance<productsAttribute>, productsAttribute { }
export interface productsModel extends Sequelize.Model<productsInstance, productsAttribute> { }

// table: warehouses
export interface warehousesAttribute {
  warehousename:string;
  warehousetype:number;
  location: string;
  
}
export interface warehousesInstance extends Sequelize.Instance<warehousesAttribute>, warehousesAttribute { }
export interface warehousesModel extends Sequelize.Model<warehousesInstance, warehousesAttribute> { }
