export interface User {
    id: number;
    firstname: string;
    lastname: string;
    address: string;
    city: string;
    state: string;
    pin: string;
    email: string;
    password: string;
   
}

export interface UserLogin{
email:string;
password:string;
}

export interface LoginToken{
    token:string;
    expiresInSeconds:number;
}