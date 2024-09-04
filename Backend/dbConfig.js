import pkg from 'pg';  // Import the entire 'pg' package
const { Client } = pkg;

// defining parameters to connect with postgres
const client = new Client({
    user:  process.env.POSTGRES_USER || 'postgres',
    host: process.env.POSTGRES_HOST || 'postgres',
    database: process.env.POSTGRES_DB || 'newdb',
    password: process.env.POSTGRES_PASSWORD || 'vaibhav',
    port: process.env.POSTGRES_PORT || 5432
})

// docker run -p 5432:5432 -d --name pg-db -e POSTGRES_PASSWORD=vaibhav --network mern-nw postgres

client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Connection error', err.stack));

export default client;