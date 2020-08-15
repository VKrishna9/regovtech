import { Service } from "typedi";
import {
    Body, BodyParam, Get, HeaderParam, ContentType, JsonController, Param, Post as HttpPost, Req, Res, Header, OnUndefined
} from "routing-controllers";
import { ProductRepository } from "../repositorys/ProductsRepository";
import { logger, httpLogger, cors } from "../utils/LogUtils";
import { Product, ProductErrorMessage } from "../utils/Product";
import { TokenChecker, UserNotFoundError, LogInUser, Logout, CustomeError } from "../utils/TokenChecker";


@JsonController("/product")
@Service()
export class ProductController {

    constructor(private Productrepository: ProductRepository) {

    }

    @HttpPost("/add")
    @ContentType("application/json")
    async addProduct( @TokenChecker({ required: true }) user: LogInUser, @Body() Product: Product) {
        logger.info("getAllCttCampaigns =>", Product);
        switch (user.error) {
            case 0:
                
                    return this.Productrepository.addProduct(Product);
                
            case 401:
                throw new CustomeError(401, "User not found");
            case 599:
                throw new CustomeError(599, "Session Timed out");
        }
    }
    @HttpPost("/delete")
    @ContentType("application/json")
    async removeProduct( @TokenChecker({ required: true }) user: LogInUser, @Body() Product: Product) {
        logger.info("getAllCttCampaigns =>", Product);
        switch (user.error) {
            case 0:
                
                    return this.Productrepository.deleteProduct(Product);
                
            case 401:
                throw new CustomeError(401, "User not found");
            case 599:
                throw new CustomeError(599, "Session Timed out");
        }
    }
   
    @HttpPost("/all")
    @ContentType("application/json")
    async getProducts( @TokenChecker({ required: true }) user: LogInUser, @Body() Product: Product) {
        logger.info("getAllCttCampaigns =>", Product);
        switch (user.error) {
            case 0:
                
                    return this.Productrepository.getProducts(Product);
                
            case 401:
                throw new CustomeError(401, "User not found");
            case 599:
                throw new CustomeError(599, "Session Timed out");
        }
    }

}

