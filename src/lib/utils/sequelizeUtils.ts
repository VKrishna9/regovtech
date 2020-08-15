import * as ProcessEnv from "../config/config";
import { logger, httpLogger, cors } from "../utils/LogUtils";
import { Sequelize } from "sequelize";
import * as dbTables from "../model/db.tables";
const Sequelize = require("sequelize");
import { connect, synapseDBconnect } from "../utils/dbUtils";
import { reset } from "continuation-local-storage";

// export const sequelize = new Sequelize(ProcessEnv.ProcessEnvSynapseDB._database, ProcessEnv.ProcessEnvSynapseDB._username, ProcessEnv.ProcessEnvSynapseDB._password, {
//     host: ProcessEnv.ProcessEnvSynapseDB._host,
//     dialect: ProcessEnv.ProcessEnvSynapseDB._dialect,
//     port: ProcessEnv.ProcessEnvSynapseDB._db_port,
//     dialectOptions: {
//         connectionTimeout: 9999,
//         requestTimeout:0
//    },
//     pool: {
//         max: 5,
//         min: 0,
//         idle: 10000,
//         acquire: 30000
//     },
// });

// export const sequelizegateway = new Sequelize(ProcessEnv.ProcessEnvGatewayDB._database, ProcessEnv.ProcessEnvGatewayDB._username, ProcessEnv.ProcessEnvGatewayDB._password, {
//     host: ProcessEnv.ProcessEnvGatewayDB._host,
//     dialect: ProcessEnv.ProcessEnvGatewayDB._dialect,
//     port: ProcessEnv.ProcessEnvGatewayDB._db_port,
//     dialectOptions: {
//         connectionTimeout: 9999,
//         requestTimeout:0
//    },
//     pool: {
//         max: 5,
//         min: 0,
//         idle: 10000,
//         acquire: 30000
//     },
// });

export const tables = dbTables.getModels(connect);
let userArray: any = [];
let smscArray: any = [];


export class UserData {
    async loadUserData() {
        // select Id,UserName from Synapse.dbo.Users ;
        // select SmscId,SystemId from Synapse.dbo.SmscSmpp
        userArray = [];
        const userData = synapseDBconnect.query("select Id,UserName from Users")
            .then((result: any) => {
                userArray.push(result);
            });
        smscArray = [];
        const smscData = synapseDBconnect.query("select SmscId,SystemId from SmscSmpp")
            .then((result: any) => {
                logger.info("loadUserData: success ==>", result);
                smscArray.push(result);
            }).catch((error: any) => {
                logger.error("loadUserData: Failed ==>", error);
                  return '{Status: "Failed"}';
              });

    }
}