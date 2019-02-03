import { Pool } from 'pg';

export const ConnectionPool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_DB_URL || 'localhost',
  database: process.env.PG_DB_NAME,
  password: process.env.PG_PASS,
  port: 5432,
  max: 20 // max number of connections
});
