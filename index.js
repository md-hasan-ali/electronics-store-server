const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config()
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// middleware 
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ayr4p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// run function create 
async function run() {
    try {
        await client.connect();
        const database = client.db("Eletronics-Store")
        const productCollection = database.collection("Products");


        // Get Api 
        app.get('/products', async (req, res) => {
            const result = await productCollection.find({}).toArray();
            res.send(result);
        });

    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Electronics Server is Running');
})
app.listen(port, () => {
    console.log('listening the port', port);
})
