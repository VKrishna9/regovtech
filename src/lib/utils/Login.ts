export class Login {

    constructor(
        private username: string,
        private password: string,
        private firstname: string,
        private lastname: string,
        private status: number,
        private phonenumber: number
    ) {


    }

    getUsername() {
        return (this.username );
    }
    getPassword() {
        return (this.password);
    }
    getFirstName(){
        return (this.firstname);
    }
    getLastName(){
        return (this.lastname);
    }
    getStatus(){
        return (this.status);
    }
    getPhoneNumber(){
        return (this.phonenumber);
    }
    isValid() {
        if (this.username.length < 0 && this.password.length < 0 ) {
            return false;
        }
        return true;
    }
}

export class LoginErrorMessage {


    constructor(private Status: boolean, private Message: string) {

    }
}

 export class LoginResponse {
    userName: string;
    token: string;
    date: Date;

    constructor(_userName: string,  _token: string, _date: Date) {
       this.userName = _userName;
       this.token = _token;
       this.date = _date;
    }
    getUsername() {
        return (this.userName );
    }
    
    getToken() {
        return (this.token);
    }
    getDate() {
        return (this.date);
    }
}

// export interface LoginResponses {
//     UserName: string;
//     UserId: number;
//     token: string;

//     // constructor(_userName: string, _userId: number, _token: string) {
//     //    this.userName = _userName;
//     //    this.userId = _userId;
//     //    this.token = _token;
//     }
