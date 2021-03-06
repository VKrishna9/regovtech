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
import { Sequelize } from "sequelize-typescript";
@Service()
export class WareHouseRepository {


  async addWareHouse<T>(wareHouse: WareHouse) {
    
     const resp = await tables.warehouse.create({
         warehousename: wareHouse.getwWrehousename(),
         warehousetype: wareHouse.getWarehousetype(),
         location: wareHouse.getLocation(),
         createdby: 1,
         createddate: edate

          })   .then((result: any) => {
                
                logger.info("WareHouse: response =>", result)
                
                        const resp: WareHouseResponse = new WareHouseResponse(wareHouse.getwWrehousename(), "Success");
                       
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
           warehousename: wareHouse.getwWrehousename()
        }
     })   .then((result: any) => {
               
               logger.info("WareHouse Delete: response =>", result)
               
                       const resp: WareHouseResponse = new WareHouseResponse(wareHouse.getwWrehousename(),"Succes");
                      
                       logger.info("WareHouse Delete: success: ==>", resp);
                       // return ({ username: user[0].UserName, userid: user[0].UserId, token: "token" });
                       return resp;
                            

           }).catch((err: any) => {
               logger.error("WareHouse Delete: failed:==>", err);
               const resp: WareHouseErrorMessage = new WareHouseErrorMessage(false, err.name);
               return (resp);
           });
       logger.info("Login request End.");
       return (resp);
 }

 async getWareHouses(wareHouse: WareHouse) {
    const Op = Sequelize.Op;
    logger.info("getProducts: =>", wareHouse)
    const resp = await tables.warehouse.findAll(
      {
        attributes: [
          'warehousename'
          , 'location'
        ],
        where:
          { warehousename: {
            [Op.like]: '%'+wareHouse.getwWrehousename()+'%'
          }, 
          location: {
            [Op.like]: '%'+wareHouse.getLocation()+'%'
          } },
        raw: true
      })
      .then((rows: warehousesInstance[]) => {
        logger.info("getWareHouse: Succeds ==>", rows);
         return (rows);
      }).catch((error:any) => {
        const data = JSON.parse(error);
        logger.error("getWareHouse: Failed: error ==>", error);
        return new WareHouseErrorMessage(false,data.name);
      });
    console.log("resp =>", resp);
    return resp;
  }

  async getWareHouse(wareHouse: WareHouse) {
    logger.info("getProducts: =>", wareHouse)
    const resp =DBconnect.query("SELECT  *  FROM  WAREHOUSE B LEFT JOIN PRODUCTS A on  A.WHID = B.ID  WHERE B.WAREHOUSENAME = ? ", {
                  replacements: [wareHouse.getwWrehousename()],
        type: DBconnect.QueryTypes.SELECT,
        raw: true
      })
      .then((rows: warehousesInstance) => {
        logger.info("getWareHouse: Succeds ==>", rows);
        return (rows);
      }).catch((error:any) => {
        const data = JSON.parse(error);
        logger.error("getWareHouse: Failed: error ==>", error);
        return new WareHouseErrorMessage(false,data.name);
      });
    console.log("resp =>", resp);
    return resp;
  }
  
  
 //commit
}

