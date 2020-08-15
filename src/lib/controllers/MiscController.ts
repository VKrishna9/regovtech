
import { Service } from "typedi";
import {
    Body, BodyParam, Get, HeaderParam, ContentType, JsonController, Param, Post as HttpPost, Req, Res, OnUndefined
} from "routing-controllers";

import { LiveMonitRepository } from "../repositorys/LiveMonitRepository";
import { BlockMessage, BlockErrorMessage, UnBlockErrorMessage, UnBlockMessage, BlockedData, BlockedDataErrorMessage, QueryUserSenderData } from "../utils/BlockMessage";
import { logger, httpLogger, cors } from "../utils/LogUtils";
import { LoginRepository } from "../repositorys/LoginRepository";
import { LoadUserSenderData } from "../utils/LoadUserSenderData";
import { MemDb } from "../utils/MemDb";
import { TokenChecker, UserNotFoundError, LogInUser, CustomeError } from "../utils/TokenChecker";
import {  EmailAlerts } from "../utils/EmailUtils"


@JsonController("/misc")
@Service()
export class MiscelleneousController {



    @HttpPost("/time")
    @ContentType("application/json")
    
    async currentForwardTime(@TokenChecker({ required: true }) user: LogInUser) {
        logger.info("currentForwardTime: =>");
        switch (user.error){
            case 0:
            const dateTime = require("node-datetime");
            const dt = dateTime.create();
            const fdt = dateTime.create();
            fdt.offsetInDays(3);
            // const currentdate = dt.format("w n d Y H:M:S");
            const currentdate = dt.format("m-d-Y H:M:S");
            const d = fdt.format("m-d-Y H:M:S");
            logger.info("currentForwardTime: =>", currentdate, d);
            return { currentdate: currentdate, nextdate: d };
            case 401:
            throw  new CustomeError(401,"User not found");
            case 599:
            throw  new CustomeError(599,"Session Timed out");
        
    }
}


// @HttpPost("/usersendertest")
// @ContentType("application/json")

// async SenderTest() {
//     logger.info("SenderTest ===>");
//     const loadusd = new LoadUserSenderData();
//     loadusd.loadUserSenderData();
// }
// @HttpPost("/email")
//  @ContentType("application/json")
// async emailController(){
//     logger.info("email request");
//   const emailalerts: EmailAlerts = new EmailAlerts();
//  return  emailalerts.emailAlerts(5);
// }

}