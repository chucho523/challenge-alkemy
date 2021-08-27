const express = require('express');
const routeTransaction = express.Router();//routes
const joi = require('@hapi/joi'); //validator
const config = require("../configDB.js");
const jwt = require('jsonwebtoken');
const userExtractor = require('../middlewares/userExtractor');//import userExtractor for token

//routes------------
//add transaction
routeTransaction.post('/', userExtractor, (req, res) =>{
    
    const {id_user} = req; //recover id_user

    if(!req.body.amount || !req.body.concept || !req.body.type || !req.body.category || !req.body.date){
        return res.status(400).json({error: 'a parameter is missing'});
    }
    req.getConnection((err, conn) => {
        if(err) return res.send(err);
        conn.query(`use ${config.database}`);
        const {amount, concept, type, category, date} = req.body;
        const newBody = {amount, concept, type, category, date, id_user};
        //add transaction
        conn.query('INSERT INTO transaction set ?',[newBody] ,(err, rows) => {
            const {error} = validateAmount(req.body.amount);//validate amount format
            if(error){
                return res.status(400).json({error: "enter a valid amount"})
            }
            if(err) return res.send(err)
            res.json({data: 'the transaction has been added'});
        });
    })
});

const validateAmount = (amount) =>{
    const schema = joi.object({
        monto: joi.number()
            .required()
    });
    return (schema.validate({monto: amount}));
}

module.exports = routeTransaction;