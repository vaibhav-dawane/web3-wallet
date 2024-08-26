import pg from "pg";

const {Pool} = pg;

const pool = new Pool({
    host: 'pg',
    port: 5432,
    user: 'vpd007',
    password: 'vaibhav007',
    database: 'db123'
});

export default pool
