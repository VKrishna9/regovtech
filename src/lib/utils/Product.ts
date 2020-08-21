export class Product {

    constructor(
        private id: number,
        private productname: string,
        private producttype: number,
        private quantity: number,
        private price: number,
        private category: string,
        private wareHouseId: number

    ) {


    }

    getId() {
        return (this.id );
    }
    getProductname() {
        return (this.productname );
    }
    getProducttype() {
        return (this.producttype);
    }
    getQuantity(){
        return (this.quantity);
    }
    getPrice(){
        return (this.price);
    }
    getCategory(){
        return (this.category);
    }
    getWareHouseId(){
        return (this.wareHouseId);
    }
    
    isValid() {
        if (this.productname.length < 0 && this.producttype < 0 ) {
            return false;
        }
        return true;
    }
}

export class ProductErrorMessage {


    constructor(private Status: boolean, private Message: string) {

    }
}

export class ProductResponse {
    productName: string;
    message: string;
    constructor(_productName: string, _message: string) {
       this.productName = _productName;
      this.message = _message;
    }
    getProductName() {
        return (this.productName );
    }
    getMessage() {
        return (this.message );
    }
   
}
