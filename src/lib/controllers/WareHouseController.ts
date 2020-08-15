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
    async addWareHouse( @TokenChecker({ required: true }) user: LogInUser, @Body() wareHouse: WareHouse) {
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
    @HttpPost("/delete")
    @ContentType("application/json")
    async removeWareHouse( @TokenChecker({ required: true }) user: LogInUser, @Body() wareHouse: WareHouse) {
        logger.info("getAllCttCampaigns =>", wareHouse);
        switch (user.error) {
            case 0:
                
                    return this.wareHouserepository.deleteWarehouse(wareHouse);
                
            case 401:
                throw new CustomeError(401, "User not found");
            case 599:
                throw new CustomeError(599, "Session Timed out");
        }
    }
    @HttpPost("/details")
    @ContentType("application/json")
    async getWareHouse( @TokenChecker({ required: true }) user: LogInUser, @Body() wareHouse: WareHouse) {
        logger.info("getAllCttCampaigns =>", wareHouse);
        switch (user.error) {
            case 0:
                
                    return this.wareHouserepository.getWareHouse(wareHouse);
                
            case 401:
                throw new CustomeError(401, "User not found");
            case 599:
                throw new CustomeError(599, "Session Timed out");
        }
    }

    @HttpPost("/all")
    @ContentType("application/json")
    async getWareHouses( @TokenChecker({ required: true }) user: LogInUser, @Body() wareHouse: WareHouse) {
        logger.info("getAllCttCampaigns =>", wareHouse);
        switch (user.error) {
            case 0:
                
                    return this.wareHouserepository.getWareHouses(wareHouse);
                
            case 401:
                throw new CustomeError(401, "User not found");
            case 599:
                throw new CustomeError(599, "Session Timed out");
        }
    }

}

