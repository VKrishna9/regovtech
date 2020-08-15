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
    
    constructor(_ProductName: string) {
       this.ProductName = _ProductName;
      
    }
    getProductName() {
        return (this.ProductName );
    }
   
}
