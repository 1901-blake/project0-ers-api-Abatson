import { Role } from "./role";




export class user{
    userId:number;
    username:string;
    password:string;
    firstName:string;
    lastName:string;
    email:string;
    role:Role;

     constructor(userId:number, username:string, password:string, firstName:string, lastName:string, email:string, role:Role){ 
        this.userId = userId, // primary key
        this.username = username, // not null, unique
        this.password = password, // not null
        this.firstName = firstName, // not null
        this.lastName = lastName, // not null
        this.email =  email, // not null
        this.role = role // not null
    }
    
}
