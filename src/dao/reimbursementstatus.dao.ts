import { ReimbursementStatus } from "../models/ReimbursementStatus";
import { ConnectionPool } from "../util/ConnectionPool";

export async function getReimbursementStatus (statusid:number): Promise<ReimbursementStatus> {
    const client = await ConnectionPool.connect();
    try {
        const result = await client.query(
          'SELECT * FROM project0.reimbursementstatus WHERE statusid = $1',
          [statusid]
        );
        const sqlReimbursemenStatus = result.rows[0]; // there should only be 1 record
        if(sqlReimbursemenStatus){
            return {
                statusId: sqlReimbursemenStatus.statusid,
                status: sqlReimbursemenStatus.status
            }
        }else{
            return undefined;
        }  
    } finally{
        client.release();
    }
}