const express = require('express');
require('dotenv').config()
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// middleware 
app.use(cors());
app.use(express.json());








app.get('/', (req, res) => {
    res.send('Electronics Server is Running');
})
app.listen(port, () => {
    console.log('listening the port', port);
})
