export class Stock {

    constructor(
        private productname: string,
        private quantity: number,
        private price: number,
        private warehouse: string

    ) {


    }


    getProductname() {
        return (this.productname );
    }
    getQuantity(){
        return (this.quantity);
    }
    getPrice(){
        return (this.price);
    }
    getWarehouse(){
        return (this.warehouse);
    }
    
    
}

export class StockErrorMessage {


    constructor(private Status: boolean, private Message: string) {

    }
}

export class StockResponse {
    ProductName: string;
    message: string;
    
    constructor(_ProductName: string, _message: string) {
       this.ProductName = _ProductName;
       this.message = _message;
    }
    getProductName() {
        return (this.ProductName );
    }
    getMessage() {
        return (this.message );
    }
}
