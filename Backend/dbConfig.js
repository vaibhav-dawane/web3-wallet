import pkg from 'pg';  // Import the entire 'pg' package
const { Client } = pkg;

import dotenv from 'dotenv';
dotenv.config();

// defining parameters to connect with postgres
const client = new Client({
    // user: process.env.USER,
    // host: process.env.HOST,
    // database: process.env.DATABASE,
    // password: process.env.PASSWORD,
    // port: process.env.PORT,
    connectionString: process.env.CONNECTION_STRING,
    ssl: {
      rejectUnauthorized: false, 
    },
})

client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Connection error', err.stack));

export default client;