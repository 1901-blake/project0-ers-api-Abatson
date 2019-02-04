import { ReimbursementType } from "../models/ReimbursementType";
import { ConnectionPool } from "../util/ConnectionPool";

export async function getReimbursementType (typeid:number): Promise<ReimbursementType> {
    const client = await ConnectionPool.connect();
    try {
        const result = await client.query(
          'SELECT * FROM project0.reimbursementtype WHERE typeid = $1',
          [typeid]
        );
        const sqlReimbursementType = result.rows[0]; // there should only be 1 record
        if(sqlReimbursementType){
            return {
                typeId: sqlReimbursementType.typeid,
                type: sqlReimbursementType.typename
            }
        }else{
            return undefined;
        }  
    } finally{
        client.release();
    }
}