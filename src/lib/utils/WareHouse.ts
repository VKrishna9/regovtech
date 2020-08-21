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
    message: string;
    
    constructor(_wareHouseName: string, _message:string) {
       this.wareHouseName = _wareHouseName;
       this.message = _message
      
    }
    getWareHouseName() {
        return (this.wareHouseName );
    }
    getMessage() {
        return (this.message );
    }
}
