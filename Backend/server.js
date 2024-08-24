import bip39 from "bip39"
import express from "express"
import cors from "cors"

const app = express();

app.use(cors());

const PORT = 3000;

app.get('/', (req, res) => {
    const mnemonic = bip39.generateMnemonic();
    res.json({seedphrase: mnemonic});
})


app.listen(PORT, () => {
    console.log(`Server Listening At: ${PORT}`);  
})