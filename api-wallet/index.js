const express = require('express');
const app = express();
const mysql = require('mysql');//mysql module
const myconn = require('express-myconnection');//connnection
const configDB = require('./configDB');//database configuration
const cors = require('cors');

//PORT CONFIGURATION
const PORT = process.env.PORT || 3050;


//middlewares
app.use(express.json());
app.use(cors());
app.use(myconn(mysql, configDB, 'single'))




//routes
app.get('/', (req, res) => {
    res.send('Welcome to my API')
})


app.listen(PORT, () =>console.log('server running on port ',PORT))