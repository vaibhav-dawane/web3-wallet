import bip39 from "bip39"
import express from "express"
import cors from "cors"
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import fs from 'fs';
import solanaWeb3 from '@solana/web3.js'

import bs58 from 'bs58'
import { log } from "console";

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser()); // To parse cookies

const PORT = 3000;

app.get('/', (req, res) => {
    const mnemonic = bip39.generateMnemonic();
    res.json({seedphrase: mnemonic});
})

app.post('/solkeys', (req, res) => {
    const data = req.body.data;
    fs.writeFileSync('./seed/seed.txt', '');
    fs.writeFileSync('./seed/seed.txt', data); 
    res.status(200).json({ message: 'Data received successfully!' });
})

const data = fs.readFileSync("./seed/seed.txt");
const seed = data.toString();
// console.log(seed);

// seed phrase is converted to seed, seed is a binary representation that can be used to derive keys
const seedBuffer = bip39.mnemonicToSeedSync(seed).slice(0, 32);
// console.log(seedBuffer);

const keypair = solanaWeb3.Keypair.fromSeed(seedBuffer);
// console.log("Key Pair is: ", keypair);

// Get the public key as a string
const publicKey = keypair.publicKey.toString();
// console.log("Public Key is: ", publicKey);

const privateKey = bs58.encode(keypair.secretKey);
// console.log("Private key: ", privateKey);

const SolanaKeyPair = {publicKey, privateKey};

app.get('/solana-keypair', (req, res) => {
    res.json({ SolanaKeyPair: SolanaKeyPair });
})

app.get('/get-data', (req, res) => {
    res.json({ data: data });
});

app.listen(PORT, () => {
    console.log(`Server Listening At: ${PORT}`);  
})