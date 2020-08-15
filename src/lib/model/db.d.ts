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
  createdby: number;
  createddate: Date;
  category: string;
}
export interface productsInstance extends Sequelize.Instance<productsAttribute>, productsAttribute { }
export interface productsModel extends Sequelize.Model<productsInstance, productsAttribute> { }

// table: warehouses
export interface warehousesAttribute {
  warehousename:string;
  warehousetype:number;
  location: string;
  createdby: number;
  createddate: Date;
  
}
export interface warehousesInstance extends Sequelize.Instance<warehousesAttribute>, warehousesAttribute { }
export interface warehousesModel extends Sequelize.Model<warehousesInstance, warehousesAttribute> { }

// table: stock
export interface stockAttribute {
  productname:string;
  productid:number;
  quantity:number;
  price: number;
  warehouse: string;
  warehouseid: number;
  createdby: number;
  createddate: Date;
  
}
export interface stockInstance extends Sequelize.Instance<stockAttribute>, stockAttribute { }
export interface stockModel extends Sequelize.Model<stockInstance, stockAttribute> { }
