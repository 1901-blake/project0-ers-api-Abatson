import { Reimbursement } from "../models/Reimbursements";
import { ConnectionPool } from "../util/ConnectionPool";
import { buildReimbursement } from "../util/buildReimbursement";

//Test status and Type daos
//test buildReimbursements
//worry about timestamp vs date

export async function findByStatusId(statusid: number): Promise<Reimbursement[]> {
    const client = await ConnectionPool.connect();
    try {
      const result = await client.query(
        'SELECT * FROM project0.reimbursements WHERE statusid = $1 ORDER BY datesubmitted ASC',
        [statusid]
      );
      if(result){
        return Promise.all(result.rows.map(async (sqlReimbursement) => {
          return await buildReimbursement(sqlReimbursement);
        }));
      } else {
        return undefined;
      }
    } finally {
      client.release(); // release connection
    }
  }


  export async function findByUserId(userid: number): Promise<Reimbursement[]> {
    const client = await ConnectionPool.connect();
    try {
      const result = await client.query(
        'SELECT * FROM project0.reimbursements WHERE author = $1 ORDER BY datesubmitted ASC',
        [userid]
      );
      if(result){
        return Promise.all(result.rows.map(async (sqlReimbursement) => {
          return await buildReimbursement(sqlReimbursement);
        }));
      } else {
        return undefined;
      }
    } finally {
      client.release(); // release connection
    }
  }


  export async function submit(req) {
    const client = await ConnectionPool.connect();
    const author = req.body.author; //get userid from session
    const amount = req.body.amount;
    const description = req.body.description;
    const statusid = req.body.status.statusId;
    const typeid = req.body.type.typeId;
    // type check numbers, string inputs are parameterized
    if(typeof amount !== 'number' || typeof statusid !== 'number' || typeof typeid !== 'number' ){
        return undefined;
      }
    try {
        // make sure all values are real
        if(amount && description && statusid && typeid){
            const result = await client.query (
             'INSERT INTO project0.reimbursements (author, amount, description, statusid, typeid) VALUES($1, $2, $3, $4, $5) RETURNING reimbursementid',
             [author, amount, description, statusid, typeid]
            );
            // make sure you get a result
            if(result){
                return result.rows[0].reimbursementid;
            } else {
                return undefined;
            }
        }else {
            return undefined;
        }
    } finally {
      client.release(); // release connection
    }
  }

export async function update(req){
    const client = await ConnectionPool.connect();
    const dateresolved = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const resolver = req.body.resolver;
    const statusid = req.body.status.statusId;
    const typeid = req.body.type.typeId;
    const reimbursementid = req.body.reimbursementId;
    if(typeof reimbursementid !== 'number' || typeof statusid !== 'number' || typeof typeid !== 'number' ){
        return undefined;
      }
    try{
        if(reimbursementid && statusid && typeid){
            const result = await client.query(
                'UPDATE project0.reimbursements set dateresolved = $1, resolver = $2, statusid = $3, typeid = $4 WHERE reimbursementid = $5 RETURNING reimbursementid',
                [dateresolved, resolver, statusid, typeid, reimbursementid]
            )
            if(result){ 
                return result.rows[0].reimbursementid;
            } else {
                 return undefined;
            }
        } else {
            return undefined;
        }
    } finally{
        client.release();//release connection
    }
}


  export async function findByRId(reimbursementid: number): Promise<Reimbursement> {
    const client = await ConnectionPool.connect();
    try {
      const result = await client.query(
        'SELECT * FROM project0.reimbursements WHERE reimbursementid = $1',
        [reimbursementid]
      );
      const sqlReimbursement = result.rows[0]; // there should only be 1 record
      if (sqlReimbursement) {
        return await buildReimbursement(sqlReimbursement);
      } else {
        return undefined;
      }
    } finally {
      client.release(); // release connection
    }
  }
