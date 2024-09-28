import bip39 from "bip39"
import express from "express"
import cors from "cors"
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import fs from 'fs';
import solanaWeb3 from '@solana/web3.js'
import client from "./dbConfig.js";

import bs58 from 'bs58'
import { getSolKeyPairs } from "./solKeys.js";

client.query('CREATE TABLE IF NOT EXISTS solWallet(id SERIAL PRIMARY KEY, publicKey VARCHAR(250), privateKey VARCHAR(250));', (err, res) => {
    if (err) {
      console.error('Query error', err.stack);
    } else {
      console.log('Table Created');
    }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

const PORT = 3000;

// to sent seed phrase to frontend
app.get('/', (req, res) => {
    const mnemonic = bip39.generateMnemonic();
    res.json({seedphrase: mnemonic});
})


// to get the seed phrase from frontend and store it in file
app.post('/seed', (req, res) => {
    const data = req.body.data;
    fs.writeFileSync('./seed/seed.txt', '');
    fs.writeFileSync('./seed/seed.txt', data);
    res.status(200).json({ message: 'Data received successfully!'});
})

// send keys pairs to frontend
app.get('/solana-keypair', (req, res) => {
    // Read the current seed from the file
    let data;
    try {
        data = fs.readFileSync("./seed/seed.txt").toString();
        if (!data) throw new Error("Seed file is empty or missing");
    } catch (error) {
        return res.status(500).json({ message: "Failed to read seed file", error: error.message });
    }

    // Convert the seed phrase to a seed buffer
    const seedBuffer = bip39.mnemonicToSeedSync(data).slice(0, 32);

    // Generate keypair
    const keypair = solanaWeb3.Keypair.fromSeed(seedBuffer);
    const publicKey = keypair.publicKey.toString();
    const privateKey = bs58.encode(keypair.secretKey);

    res.json({ SolanaKeyPair: { publicKey, privateKey } });
});

// to get the solana keys from frontend and store them into database
app.post('/saveSolKeys', async(req, res) => {
    const data = req.body.data;
    console.log("Keys Save Data is: ", data);  
    try {
        const insertQuery = `INSERT INTO solWallet (publicKey, privateKey) VALUES ($1, $2);`
        const values = [data.publicKey, data.privateKey];

        await client.query(insertQuery, values);
        res.status(200).json({ message: "Keys saved successfully" });  
    } catch (error) {
        console.error("Error saving keys:", error.stack);
        res.status(500).json({ message: "Error saving keys" });
    }
})

app.get('/getSolWalletKeys', async (req, res) => {
    const solKeyPairs = await getSolKeyPairs();
    res.json({solKeyPairs})
})

app.listen(PORT, () => {
    console.log(`Server Listening At: ${PORT}`);  
})