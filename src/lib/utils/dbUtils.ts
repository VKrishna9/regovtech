import { Sequelize } from "sequelize-typescript";
import * as ProcessEnv from "../config/config";

    export const DBconnect =  new Sequelize({
        host:  ProcessEnv.ProcessEnvDatabase._host,
        port: ProcessEnv.ProcessEnvDatabase._db_port,
        dialect:  ProcessEnv.ProcessEnvDatabase._dialect,
        database:  ProcessEnv.ProcessEnvDatabase._database,
        username:  ProcessEnv.ProcessEnvDatabase._username,
        password:  ProcessEnv.ProcessEnvDatabase._password,
        dialectOptions: {
            connectionTimeout: 9999,
            requestTimeout:0
       },
        pool: {
        max:  5,
        min:  0,
        idle:  10000,
        acquire: 20000
        },
       // modelPaths: [__dirname + "../models/db"]
        });