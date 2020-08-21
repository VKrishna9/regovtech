import { Service } from "typedi";
import * as dbTables from "../model/db.tables";
import { DBconnect } from "../utils/dbUtils";
const tables = dbTables.getModels(DBconnect);
import { logger, httpLogger, cors } from "../utils/LogUtils";
import { Stock, StockErrorMessage,StockResponse } from "../utils/Stock";
import { stockInstance, warehousesInstance, productsInstance } from "../model/db";
import { WareHouse } from "../utils/WareHouse";
import { Product } from "../utils/Product";
let dateTime = require('node-datetime');
let dt = dateTime.create();
const edate = dt.format('Y-m-d H:M:S');

@Service()
export class StockRepository {


  async addstock<T>(stock: Stock) {
    const p = await this.readProduct(stock.getProductname())
                .then((records: any) => {
                    
                    return records.id;
                }).catch((error:any) => {
                    return 0;
                });
    const w = await this.readWareHouse(stock.getWarehouse())
            .then((records:any) => {                    
            return records.id;
    }).catch((error:any) => {
        return 0;
    });
     const resp = await tables.stock.upsert({
        productid: p,
        quantity: stock.getQuantity(),
        price: stock.getPrice(),
        warehouseid: await w,
        createdby: 1,
        createddate: edate

          })   .then((result: any) => {
                
                logger.info("stock Register: response =>", result)
                
                        const resp: StockResponse = new StockResponse(stock.getProductname(),"Success");
                       
                        logger.info("stock Register: success: ==>", resp);
                        // return ({ username: user[0].UserName, userid: user[0].UserId, token: "token" });
                        return resp;
                             

            }).catch((err: any) => {
                logger.error("stock Register: failed:==>", err);
                const resp: StockErrorMessage = new StockErrorMessage(false, err);
                return (resp);
            });
        logger.info("Login request End.");
        return (resp);
  }

  async deletestock<T>(stock: Stock) {
    const p = await this.readProduct(stock.getProductname())
                .then((records:any) => {
                    
                    return records.productid;
                }).catch((error:any) => {
                    return 0;
                });
    const w = await this.readWareHouse(stock.getWarehouse())
            .then((records:any) => {                    
            return records.id;
    }).catch((error:any) => {
        return 0;
    });
    const resp = await tables.stock.upsert({
        productid: await p,
        quantity: stock.getQuantity(),
        price: stock.getPrice(),
        warehouseid: await w,
        createdby: 1,
        createddate: edate

         })   .then((result: any) => {
               
               logger.info("stock Register: response =>", result)
               
                       const resp: StockResponse = new StockResponse(stock.getProductname(),"Success");
                      
                       logger.info("stock Register: success: ==>", resp);
                       // return ({ username: user[0].UserName, userid: user[0].UserId, token: "token" });
                       return resp;
                            

           }).catch((err: any) => {
               logger.error("stock Register: failed:==>", err);
               const resp: StockErrorMessage = new StockErrorMessage(false, err);
               return (resp);
           });
       logger.info("Login request End.");
       return (resp);
}

async readWareHouse(wareHouse: string) {
    logger.info("getProducts: =>", wareHouse)
    const resp = await tables.warehouse.findAll(
      {
        attributes: [
          'warehousename'
          , 'id'
        ],
        where:
          { warehousename: wareHouse },
        raw: true
      })
      .then((rows: any) => {
        logger.info("getWareHouse: Succeds ==>", rows);
         return (rows[0].toJSON());
      }).catch((error:any) => {
        const data = JSON.parse(error);
        logger.error("getWareHouse: Failed: error ==>", error);
        return data;
      });
    console.log("resp =>", resp);
    return Promise.all(resp);
  }
  async readProduct(product: string) {
    logger.info("getProducts: =>", product)
    const resp = await tables.product.findAll(
      {
        attributes: [
          'productname'
          , 'id'
          
        ],
        where:
          { productname: product },
        raw: true
      })
      .then((rows: any) => {
        logger.info("getProducts: Succeds ==>", rows);
        // rows.forEach(row => {
        //   let dt = datetime.create(row.insertTime);
        //   row.insertTime = dt.format("Y-m-d H:M:S");

        // });
        return (rows[0].toJSON());
      }).catch((error:any) => {
        const data = JSON.parse(error);
        logger.error("getProducts: Failed: error ==>", error);
        return data;
      });
    console.log("resp =>", resp);
    return Promise.all(resp);
  } //commit
}

