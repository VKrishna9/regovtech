import { Service } from "typedi";
import {
    Body, BodyParam, Get, HeaderParam, ContentType, JsonController, Param, Post as HttpPost, Req, Res, Header, OnUndefined
} from "routing-controllers";
import { WareHouseRepository } from "../repositorys/WareHouseRepository";
import { logger, httpLogger, cors } from "../utils/LogUtils";
import { WareHouse, WareHouseErrorMessage } from "../utils/WareHouse";
import { TokenChecker, UserNotFoundError, LogInUser, Logout, CustomeError } from "../utils/TokenChecker";


@JsonController("/warehouse")
@Service()
export class WareHouseController {

    constructor(private wareHouserepository: WareHouseRepository) {

    }

    @HttpPost("/add")
    @ContentType("application/json")
    //  @OnUndefined(UserNotFoundError)
    async getAllCttCampaigns( @TokenChecker({ required: true }) user: LogInUser, @Body() wareHouse: WareHouse) {
        logger.info("getAllCttCampaigns =>", wareHouse);
        switch (user.error) {
            case 0:
                
                    return this.wareHouserepository.addWareHouse(wareHouse);
                
            case 401:
                throw new CustomeError(401, "User not found");
            case 599:
                throw new CustomeError(599, "Session Timed out");
        }
    }
   

}

