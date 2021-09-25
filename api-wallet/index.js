const express = require('express');
require('dotenv').config();
const app = express();
const users = require('./routes/users');//route users
const transactions = require('./routes/transactions');//route transactions
const mysql = require('mysql');//mysql module
const configDB = require('./configDB');//database configuration
const myconn = require('express-myconnection');//connnection
const cors = require('cors');
const handleErrors = require('./middlewares/handleErrors');


//PORT CONFIGURATION
const PORT = process.env.PORT || 3050;


//middlewares
app.use(express.json());
app.use(cors());
app.use(myconn(mysql, configDB, 'single'));
app.use('/api/users', users);
app.use('/api/transactions', transactions);
app.use(handleErrors);


//routes
app.get('/', (req, res) => {
    res.send('Welcome to my API')
})


app.listen(PORT, () =>console.log('server running on port ',PORT))