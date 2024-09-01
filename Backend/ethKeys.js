import client from "./dbConfig.js";

export const getEthKeyPairs = async () => {
    try {
      const res = await client.query('SELECT * FROM ethWallet');
      console.log(res.rows);  // res.rows contains the rows of the result set
      return res.rows;
    } catch (err) {
      console.error('Query error', err.stack);
    } finally {
      await client.end(); // Close the connection after the query
    }
  };
  
// const keyPairs = await getKeyPairs();
// keyPairs.forEach(pair => {
//   console.log(`Public Key: ${pair.public_key}, Private Key: ${pair.private_key}`);
// });
