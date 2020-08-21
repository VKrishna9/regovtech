import { Service } from "typedi";
import {
    Body, BodyParam, Get, HeaderParam, ContentType, JsonController, Param, Post as HttpPost, Req, Res, Header, OnUndefined
} from "routing-controllers";
import { LoginRepository } from "../repositorys/LoginRepository";
import { logger, httpLogger, cors } from "../utils/LogUtils";
import { Login, LoginErrorMessage, LoginResponse } from "../utils/Login";
import { TokenChecker, UserNotFoundError, LogInUser, Logout, CustomeError } from "../utils/TokenChecker";


@JsonController("/auth")
@Service()
export class AuthenticationController {

    constructor(private loginrepository: LoginRepository) {

    }

    
    @HttpPost("/registeruser")
    @ContentType("application/json")
    async registerUser( @Body() login: Login) {
        logger.info("validateUser =>", login);
        return await this.loginrepository.registerUser(login);
    }


    @HttpPost("/validateuser")
    @ContentType("application/json")
    async validateUser( @Body() login: Login) {
        logger.info("validateUser =>", login);
        
        return await this.loginrepository.checkUserlogin(login);
    }

    @HttpPost("/logout")
    @ContentType("application/json")
    @OnUndefined(UserNotFoundError)
    async logout(@TokenChecker({ required: true }) user: LogInUser) {
        
       
            throw  new CustomeError(200,"User log out successful");
            
         //  return new LogInUser("",200);
    }

}

