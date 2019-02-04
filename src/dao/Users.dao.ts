import { Users } from "../models/Users";
import { ConnectionPool } from "../util/ConnectionPool";
import { buildUsers } from "../util/buildUsers";


export async function findAll(): Promise<Users[]> {
    const client = await ConnectionPool.connect();
    try {
      const result = await client.query(
        'SELECT * FROM project0.users'
      );
      //wtf? test pls
      if(result){
        return Promise.all(result.rows.map(async (sqlUser) => {
          return await buildUsers(sqlUser);
        }));
      }else{
        return undefined;
      }
    } finally {
      client.release(); // release connection
    }
  }
  
  export async function findById(userid: number): Promise<Users> {
    const client = await ConnectionPool.connect();
    try {
      const result = await client.query(
        'SELECT * FROM project0.users WHERE userid = $1',
        [userid]
      );
      const sqlUser = result.rows[0]; // there should only be 1 record
      if (sqlUser) {
        return await buildUsers(sqlUser);
      } else {
        return undefined;
      }
    } finally {
      client.release(); // release connection
    }
  }
  
  
  export async function update(req){
    const client = await ConnectionPool.connect();
    try {
        // get user to update
        let userToUpdate = await findById(req.body.userId);
        // update any new fields
        if(userToUpdate){
          userToUpdate.username = req.body.username || userToUpdate.username;
          userToUpdate.password = req.body.password || userToUpdate.password;
          userToUpdate.firstName = req.body.firstName || userToUpdate.firstName;
          userToUpdate.lastName = req.body.lastName || userToUpdate.lastName;
          userToUpdate.email = req.body.email || userToUpdate.email;
          userToUpdate.role = req.body.role || userToUpdate.role;
        }else{
          return -1;
        }
        if(typeof userToUpdate.role.roleId !== 'number'){
          return -1;
        }
        // update all fields, any not specified by request will stay the same
        const result = await client.query(
          'UPDATE project0.users set username = $1, pword = $2, firstname = $3, lastname = $4, email = $5, roleid = $6 WHERE userid = $7',
          [userToUpdate.username, userToUpdate.password, userToUpdate.firstName, userToUpdate.lastName, userToUpdate.email, userToUpdate.role.roleId, userToUpdate.userId]
        )
        return req.body.userId;
    } finally {
      client.release(); // release connection
    }
  }


  export async function findByUsername(username: string): Promise<Users> {
    const client = await ConnectionPool.connect();
    try {
      const result = await client.query(
        'SELECT * FROM project0.users WHERE username = $1',
        [username]
      );
      const sqlUser = result.rows[0]; // there should only be 1 record
      if (sqlUser) {
        return await buildUsers(sqlUser);
      } else {
        return undefined;
      }
    } finally {
      client.release(); // release connection
    }
  }