import { Roles } from "../models/Roles";
import { ConnectionPool } from "../util/ConnectionPool";

//NEEDS TO BE TESTED
export async function getRoles (roleid:number): Promise<Roles> {
    const client = await ConnectionPool.connect();
    try {
        const result = await client.query(
          'SELECT * FROM project0.roles WHERE roleid = $1',
          [roleid]
        );
        const sqlRole = result.rows[0]; // there should only be 1 record
        if(sqlRole){
            return {
                roleId: sqlRole.roleid,
                role: sqlRole.rolename
            }
        }else{
            return undefined;
        }  
    } finally{
        client.release();
    }
}