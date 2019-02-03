import { Users } from "../models/Users";
import * as RolesDao from "../dao/Roles.dao"

//NEEDS TO BE TESTED

export async function buildUsers(userJson): Promise<Users> {
    //console.log(userJson);
    return{
        userId: userJson.userid,
        username: userJson.username,
        password: userJson.pword, // don't send back the passwords
        firstName: userJson.firstname,
        lastName: userJson.lastname,
        email: userJson.email,
        role: await RolesDao.getRoles(userJson.roleid)
    }
}