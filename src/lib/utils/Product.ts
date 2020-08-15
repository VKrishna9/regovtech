export class Product {

    constructor(
        private id: number,
        private Productname: string,
        private Producttype: number,
        private quantity: number,
        private price: number,
        private category: string

    ) {


    }

    getId() {
        return (this.id );
    }
    getProductname() {
        return (this.Productname );
    }
    getProducttype() {
        return (this.Producttype);
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
    
    isValid() {
        if (this.Productname.length < 0 && this.Producttype < 0 ) {
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
    ProductName: string;
    
    constructor(_ProductName: string) {
       this.ProductName = _ProductName;
      
    }
    getProductName() {
        return (this.ProductName );
    }
   
}
