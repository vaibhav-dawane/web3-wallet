import pkg from 'pg';  // Import the entire 'pg' package
const { Client } = pkg;

// defining parameters to connect with postgres
const client = new Client({
    user: 'vaibhav',
    host: 'localhost',
    database: 'vaibhav',
    password: 'vaibhav',
    port: 5432,
})

client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Connection error', err.stack));

export default client;