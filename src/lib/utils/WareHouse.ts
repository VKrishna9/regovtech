export class WareHouse {

    constructor(
        private id: number,
        private warehousename: string,
        private warehousetype: number,
        private location: string
    ) {


    }

    getId() {
        return (this.id );
    }
    getwWrehousename() {
        return (this.warehousename );
    }
    getWarehousetype() {
        return (this.warehousetype);
    }
    getLocation(){
        return (this.location);
    }
    
    isValid() {
        if (this.warehousename.length < 0 && this.warehousetype < 0 ) {
            return false;
        }
        return true;
    }
}

export class WareHouseErrorMessage {


    constructor(private Status: boolean, private Message: string) {

    }
}

export class WareHouseResponse {
    wareHouseName: string;
    
    constructor(_wareHouseName: string) {
       this.wareHouseName = _wareHouseName;
      
    }
    getWareHouseName() {
        return (this.wareHouseName );
    }
   
}
