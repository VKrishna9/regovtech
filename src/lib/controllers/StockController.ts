import { Service } from "typedi";
import {
    Body, BodyParam, Get, HeaderParam, ContentType, JsonController, Param, Post as HttpPost, Req, Res, Header, OnUndefined
} from "routing-controllers";
import { StockRepository } from "../repositorys/StocksRepository";
import { logger, httpLogger, cors } from "../utils/LogUtils";
import { Stock, StockErrorMessage, StockResponse } from "../utils/stock";
import { TokenChecker, UserNotFoundError, LogInUser, Logout, CustomeError } from "../utils/TokenChecker";


@JsonController("/stock")
@Service()
export class stockController {

    constructor(private stockrepository: StockRepository) {

    }

    @HttpPost("/add")
    @ContentType("application/json")
    async addstock( @TokenChecker({ required: true }) user: LogInUser, @Body() stock: Stock) {
        logger.info("getAllCttCampaigns =>", stock);
        switch (user.error) {
            case 0:
                
                    return this.stockrepository.addstock(stock);
                
            case 401:
                throw new CustomeError(401, "User not found");
            case 599:
                throw new CustomeError(599, "Session Timed out");
        }
    }
    @HttpPost("/delete")
    @ContentType("application/json")
    async removestock( @TokenChecker({ required: true }) user: LogInUser, @Body() stock: Stock) {
        logger.info("getAllCttCampaigns =>", stock);
        switch (user.error) {
            case 0:
                
                    return this.stockrepository.deletestock(stock);
                
            case 401:
                throw new CustomeError(401, "User not found");
            case 599:
                throw new CustomeError(599, "Session Timed out");
        }
    }
   //
    }

