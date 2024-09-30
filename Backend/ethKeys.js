import client from "./dbConfig.js";

export const getEthKeyPairs = async () => {
    try {
      const res = await client.query('SELECT * FROM ethWallet');
      return res.rows;
    } catch (err) {
      console.error('Query error', err.stack);
    }
  };
