import { Service } from "typedi";
import * as ProcessEnv from "../config/config";
import { Login, LoginResponse } from "../utils/Login";
import { DBconnect } from "../utils/dbUtils";
import { logger, httpLogger, cors } from "../utils/LogUtils";
import * as CryptoJS from "crypto-js";
import { ProcessEnvAuth } from "../config/config";
import { createParamDecorator, HttpError } from "routing-controllers";
import { MiscelleneousController } from "../controllers/MiscController";
const dateTime = require("node-datetime");
import * as dbTables from "../model/db.tables";
const tables = dbTables.getModels(DBconnect);
// const jwt  = require ("express-jwt");

import * as JWT from "jsonwebtoken";

@Service()
export class LoginRepository {

    constructor(private Login: Login) {

    }

    async registerUser<T>(login: Login) {
        
        const resp = await tables.users.create({
         username: login.getUsername(),
         password: this.encrypt(login.getPassword(), ProcessEnvAuth.__internalEncKey)

          })   .then((user: any[]) => {
                
                logger.info("checkUserlogin: response =>", user)
                
                   
                        //  logger.info("Passwords ==>", passwordEncrypt, user[0].UserPassword);
                        const token = JWT.sign({ id: login.getUsername() }, ProcessEnvAuth.__secret, {
                            expiresIn: 86400 // expires in 24 hours
                        });
                        
                        const dt = dateTime.create();
                        const logindatetime = dt.format("m-d-Y H:M:S");
                        const resp: LoginResponse = new LoginResponse(login.getUsername(),  token, logindatetime);
                       
                        logger.info("checkUserlogin: success: ==>", resp);
                        // return ({ username: user[0].UserName, userid: user[0].UserId, token: "token" });
                        return resp;
                             

            }).catch((err: any) => {
                logger.error("checkUserlogin: failed:==>", err);
                return (false);
            });
        logger.info("Login request End.");
        return (resp);
    }


    async checkUserlogin<T>(login: Login) {
        const resp = await tables.users.findAll({
            attributes: [
              'username'
              , 'password'
              , 'status'
            
            ],
            where: {
              username: login.getUsername(),
              password: this.encrypt(login.getPassword(), ProcessEnvAuth.__internalEncKey),
              status: 1
            }, raw: true
          })
            .then((user: any[]) => {
                const passwordEncrypt = this.encrypt(login.getPassword(), ProcessEnvAuth.__internalEncKey);
                logger.info("checkUserlogin: response =>", user)
                if (user.length > 0) {
                    if (user[0].UserPassword === passwordEncrypt) {
                        //  logger.info("Passwords ==>", passwordEncrypt, user[0].UserPassword);
                        const token = JWT.sign({ id: user[0].UserId, username: user[0].UserName }, ProcessEnvAuth.__secret, {
                            expiresIn: 86400 // expires in 24 hours
                        });
                        
                        const dt = dateTime.create();
                        const logindatetime = dt.format("m-d-Y H:M:S");
                        const resp: LoginResponse = new LoginResponse(user[0].UserName, token, logindatetime);
                       
                        logger.info("checkUserlogin: success: ==>", resp);
                        // return ({ username: user[0].UserName, userid: user[0].UserId, token: "token" });
                        return resp;
                    } else {
                        logger.info("checkUserlogin: failed.");
                        return (false);
                    }
                } else {
                    logger.info("checkUserlogin: failed. ");
                    return (false);
                }

            }).catch((err: any) => {
                logger.error("checkUserlogin: failed:==>", err);
                return (false);
            });
        logger.info("Login request End.");
        return (resp);
    }



    encrypt(plainText: any, key: any) {
        const C = CryptoJS;
        plainText = C.enc.Utf8.parse(plainText);
        const oKey = C.enc.Utf8.parse(key);
        key = C.enc.Utf8.parse("0000000000000000");
        key.words = oKey.words.slice(0, key.words.length);
        const aes = C.algo.AES.createEncryptor(key, {
            mode: C.mode.CBC,
            padding: C.pad.Pkcs7,
            iv: key
        });
        const aesProcessor = aes.process(plainText);
        const enctypted = aes.finalize();
        return C.enc.Base64.stringify(enctypted);
    }

    decrypt(encryptedText: any, key: any) {
        const C = CryptoJS;
        encryptedText = C.enc.Base64.parse(encryptedText);
        const oKey = C.enc.Utf8.parse(key);
        key = C.enc.Utf8.parse("0000000000000000");
        key.words = oKey.words.slice(0, key.words.length);
        const aes = C.algo.AES.createDecryptor(key, {
            mode: C.mode.CBC,
            padding: C.pad.Pkcs7,
            iv: key
        });
        const aesProcessor = aes.process(encryptedText);
        const decrypted = aes.finalize(); // );
        return C.enc.Utf8.stringify(decrypted);
    }

    async tokenValidate(token: any) {

    //     // const decoded: any = JWT.decode(token);
    //     //         logger.info("decoded ==>:", decoded);
    //     //         if (decoded != null){
    //     const redistoken = new RedisClient();
    //     logger.info("tokenValidate: Token format: ==>", token)
    //     return await redistoken.getExpiryKey(token)
    //         .then(result => {
    //             //  logger.info("tokenValidate: ==>", result);
    //             return result;
    //         })
    //         .catch(error => {
    //             //  logger.error("tokenValidate: ==>", error);
    //             return error;
    //         });
    //     // }else {
    //     //     return null
    //     // }
    // }



}
}