import client from "./dbConfig.js";

// client.query('CREATE TABLE solWallet(id SERIAL PRIMARY KEY, publicKey VARCHAR(250), privateKey VARCHAR(250));', (err, res) => {
//     if (err) {
//       console.error('Query error', err.stack);
//     } else {
//       console.log('Table Created');
//     }
// });

client.query('DROP TABLE solWallet;', (err, res) => {
  if (err) {
    console.error('Query error', err.stack);
  } else {
    console.log('Table DROPPED');
  }
});