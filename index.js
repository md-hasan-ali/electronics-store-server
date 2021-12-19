const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
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
        const orderCollection = database.collection("orders");

        // Get Api 
        app.get('/products', async (req, res) => {
            const result = await productCollection.find({}).toArray();
            res.send(result);
        });
        // Get Single Products
        app.get('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await productCollection.find(query).toArray();
            res.send(result);
        })
        // Post Order 
        app.post('/orders', async (req, res) => {
            const query = req.body;
            const result = await orderCollection.insertOne(query);
            res.send(result);
        })
        // Get All Orders 
        app.get('/manageOrders', async (req, res) => {
            const result = await orderCollection.find({}).toArray();
            res.send(result)
        })
        // Delete single Order 
        app.delete('/singleOrder/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await orderCollection.deleteOne(query);
            res.send(result);
        })
        // Status Update Now 
        app.put('/updateStatus/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const update = 'Approved';
            const result = await orderCollection.updateOne(filter, {
                $set: { status: update }
            })
            res.json(result)
        })

        // Add a New Product 
        app.post('/addNewProduct', async (req, res) => {
            const query = req.body;
            const result = await productCollection.insertOne(query);
            res.send(result);
        })
        // Delete a Single Product
        app.delete('/deleteSingleProduct/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await productCollection.deleteOne(query);
            res.send(result);
        })
        // Get My Orders 
        app.get('/orders', async (req, res) => {
            const email = req.query.email;
            const query = { email: email }
            const result = await orderCollection.find({}).toArray();
            console.log(result);
            res.send(result)
        })
        // Delete single data of my order
        app.delete('/orders', async (req, res) => {
            const id = req.query.id;
            console.log(id)
            const query = { _id: ObjectId(id) }
            const result = await orderCollection.deleteOne(query)
            console.log(result)
            res.send(result)
        })

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
