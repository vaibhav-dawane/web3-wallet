import client from "./dbConfig.js";

export const getSolKeyPairs = async () => {
    try {
      const res = await client.query('SELECT * FROM solWallet');
      
    //   console.log(res.rows);  // res.rows contains the rows of the result set
      return res.rows;
    } catch (err) {
      console.error('Query error', err.stack);
    }
  };
