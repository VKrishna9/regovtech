import { Service } from "typedi";
import * as dbTables from "../model/db.tables";
import { DBconnect } from "../utils/dbUtils";
const tables = dbTables.getModels(DBconnect);
import { logger, httpLogger, cors } from "../utils/LogUtils";
import { WareHouse, WareHouseErrorMessage,WareHouseResponse } from "../utils/WareHouse";
import { warehousesInstance, productsInstance } from "../model/db";
import { Product } from "../utils/Product";
let dateTime = require('node-datetime');
let dt = dateTime.create();
const edate = dt.format('Y-m-d H:M:S');

@Service()
export class WareHouseRepository {


  async addWareHouse<T>(wareHouse: WareHouse) {
    
     const resp = await tables.warehouse.create({
         warehousename: wareHouse.getwWrehousename(),
         warehousetype: wareHouse.getWarehousetype(),
         location: wareHouse.getLocation(),
         createdby: 1,
         createddate: edate

          })   .then((result: any[]) => {
                
                logger.info("WareHouse: response =>", result)
                
                        const resp: WareHouseResponse = new WareHouseResponse(wareHouse.getwWrehousename());
                       
                        logger.info("WareHouse: success: ==>", resp);
                        // return ({ username: user[0].UserName, userid: user[0].UserId, token: "token" });
                        return resp;
                             

            }).catch((err: any) => {
                logger.error("WareHouse Register: failed:==>", err);
                const resp: WareHouseErrorMessage = new WareHouseErrorMessage(false, err);
                return (resp);
            });
        logger.info("Login request End.");
        return (resp);
  }

  async deleteWarehouse<T>(wareHouse: WareHouse) {

    const resp = await tables.warehouse.destroy({
        where: {
           productname: wareHouse.getwWrehousename()
        }
     })   .then((result: any[]) => {
               
               logger.info("WareHouse Delete: response =>", result)
               
                       const resp: WareHouseResponse = new WareHouseResponse(wareHouse.getwWrehousename());
                      
                       logger.info("WareHouse Delete: success: ==>", resp);
                       // return ({ username: user[0].UserName, userid: user[0].UserId, token: "token" });
                       return resp;
                            

           }).catch((err: any) => {
               logger.error("WareHouse Delete: failed:==>", err);
               const resp: WareHouseErrorMessage = new WareHouseErrorMessage(false, err);
               return (resp);
           });
       logger.info("Login request End.");
       return (resp);
 }

 async getWareHouses(wareHouse: WareHouse) {
    logger.info("getProducts: =>", wareHouse)
    const resp = await tables.warehouse.findAll(
      {
        attributes: [
          'warehousename'
          , 'locality'
        ],
        where:
          { warehousename: wareHouse.getwWrehousename(), status: 1, location: wareHouse.getLocation() },
        raw: true
      })
      .then((rows: warehousesInstance[]) => {
        logger.info("getWareHouse: Succeds ==>", rows);
         return (rows);
      }).catch(error => {
        const data = JSON.parse(error);
        logger.error("getWareHouse: Failed: error ==>", error);
        return data;
      });
    console.log("resp =>", resp);
    return resp;
  }

  async getWareHouse(wareHouse: WareHouse) {
    logger.info("getProducts: =>", wareHouse)
    const resp =DBconnect.query("SELECT  *  FROM PRODUCTS A, WAREHOUSE B  where A.WHID = B.ID AND B.WAREHOUSENAME = ?", {
                  replacements: [wareHouse.getwWrehousename()],
        type: DBconnect.QueryTypes.SELECT,
        raw: true
      })
      .then((rows: warehousesInstance[]) => {
        logger.info("getWareHouse: Succeds ==>", rows);
        return (rows);
      }).catch(error => {
        const data = JSON.parse(error);
        logger.error("getWareHouse: Failed: error ==>", error);
        return data;
      });
    console.log("resp =>", resp);
    return resp;
  }
  
  
 
}

