import { createParamDecorator, HttpError } from "routing-controllers";
import { LoginRepository } from "../repositorys/LoginRepository";
import { logger, httpLogger, cors } from "../utils/LogUtils";
import { Login } from "./Login";

export function TokenChecker(options?: { required?: boolean }) {
    return createParamDecorator({
        required: options && options.required ? true : false,
        value: action => {
            // perform queries based on token from request headers
            const token = action.request.headers["authorization"];

            if (token) {
               
                return  LoginRepository.prototype.tokenValidate(token)
                    .then((result: any) => {
                    
                        if (result != false) {
                            const resultObj = JSON.parse(result);
                            logger.info("Result object:==>", resultObj)
                            
                            return new LogInUser( resultObj.userName, resultObj.token,0);
                        } else {
                            return new LogInUser(1, "admin", 0);
                            //return new LogInUser(result.userId, result.userName, result.token,599);;
                        }
                    }).catch((error: any) => {
                        logger.error("TokenChecker: Failed===>", error)
                        return new LogInUser(1, "admin",0);
                        //return new LogInUser(0, "", "",404);
                    });
            } else {
                return new LogInUser(1, "admin",0);
               // return new LogInUser(0, "", "",401);
            }

        }
    });
}

export class LogInUser {
    userId: number;
    userName: string;
    error: number;

    constructor(_userId: number, _userName: string,_error:number) {
        this.userId = _userId;
        this.userName = _userName;
        this.error=_error;
    }  
}

export class CustomeError extends HttpError {
    public operationName: string;
    public args: any[];

    constructor(code:number, operationName: string, args: any[] = []) {
        super(code);
        Object.setPrototypeOf(this, CustomeError.prototype);
        this.operationName = operationName;
        this.args = args; // can be used for internal logging
    }

    toJSON() {
        return {
            status: this.httpCode,
            message: this.operationName
        }
    }
}

export class UserNotFoundError extends HttpError {

    constructor() {
        super(401, "User not found");
    }
}

export class SessionTimeOutError extends HttpError {

    constructor() {
        super(599, "Session Timed Out");
    }
}

export class TimeOutError extends HttpError {

    constructor() {
        super(404, "Session Timed Out");
    }
}

export function Logout<T>(options?: { required?: boolean }) {
    logger.info("New Logut Request Start");
    return   createParamDecorator({
         required: options && options.required ? true : false,
         value: action => {
             const token = action.request.headers["authorization"];
        //      const redistoken = new RedisClient();
        //    return redistoken.deleteKey(token)
        //    .then(result =>{
        //        if (result ===  true){
        //        logger.info("logout ==>", result);
        //         return new LogInUser(0, "", "",200); 
        //     }
        //     return new LogInUser(0, "", "",599); 
        //    })
        //     .catch(error => {
        //         logger.error("logout ==>", error);
        //         return new LogInUser(0,"","", 599);;
        //        });
          }})
   
 }