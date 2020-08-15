import { Service } from "typedi";
import * as dbTables from "../model/db.tables";
import { DBconnect } from "../utils/dbUtils";
const tables = dbTables.getModels(DBconnect);
import { logger, httpLogger, cors } from "../utils/LogUtils";
import { Product, ProductErrorMessage,ProductResponse } from "../utils/Product";
import { productsInstance } from "../model/db";
let dateTime = require('node-datetime');
let dt = dateTime.create();
const edate = dt.format('Y-m-d H:M:S');

@Service()
export class ProductRepository {


  async addProduct<T>(Product: Product) {

     const resp = await tables.product.create({
         productname: Product.getProductname(),
         producttype: Product.getProducttype(),
         quantity: Product.getQuantity(),
         createdby: 1,
         createddate: edate,
         category: Product.getCategory()

          })   .then((result: any[]) => {
                
                logger.info("Product Register: response =>", result)
                
                        const resp: ProductResponse = new ProductResponse(Product.getProductname());
                       
                        logger.info("Product Register: success: ==>", resp);
                        // return ({ username: user[0].UserName, userid: user[0].UserId, token: "token" });
                        return resp;
                             

            }).catch((err: any) => {
                logger.error("Product Register: failed:==>", err);
                const resp: ProductErrorMessage = new ProductErrorMessage(false, err);
                return (resp);
            });
        logger.info("Login request End.");
        return (resp);
  }

  async deleteProduct<T>(Product: Product) {

    const resp = await tables.product.destroy({
        where: {
           productname: Product.getProductname()
        }
     })   .then((result: any[]) => {
               
               logger.info("Product Delete: response =>", result)
               
                       const resp: ProductResponse = new ProductResponse(Product.getProductname());
                      
                       logger.info("Product Delete: success: ==>", resp);
                       // return ({ username: user[0].UserName, userid: user[0].UserId, token: "token" });
                       return resp;
                            

           }).catch((err: any) => {
               logger.error("Productr Delete: failed:==>", err);
               const resp: ProductErrorMessage = new ProductErrorMessage(false, err);
               return (resp);
           });
       logger.info("Login request End.");
       return (resp);
 }

 async getProducts(product: Product) {
    logger.info("getProducts: =>", product)
    const resp = await tables.product.findAll(
      {
        attributes: [
          'productname'
          , 'producttype'
          , 'quantity'
          , 'categoty'
        ],
        where:
          { productname: product.getProductname(), status: 1 },
        raw: true
      })
      .then((rows: productsInstance[]) => {
        logger.info("getProducts: Succeds ==>", rows);
        // rows.forEach(row => {
        //   let dt = datetime.create(row.insertTime);
        //   row.insertTime = dt.format("Y-m-d H:M:S");

        // });
        return (rows);
      }).catch(error => {
        const data = JSON.parse(error);
        logger.error("getProducts: Failed: error ==>", error);
        return data;
      });
    console.log("resp =>", resp);
    return resp;
  }

  
}

