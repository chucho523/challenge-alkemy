const express = require ('express');
const route = express.Router(); //routes
const joi = require('@hapi/joi'); //validator
const md5 = require('md5');//encrypt md5
const config = require("../configDB.js");

let errorReg = {
    errorMsg: "",
    errorStatus: ""
}

//routes------------------------
//register
route.post('/register',(req, res) => {
    req.getConnection((err, conn) =>{
        if(err) return res.send(err);
        conn.query(`use ${config.database}`);
        conn.query(`SELECT * FROM users WHERE email= '${req.body.email}'`, (err, rows) =>{
            if(err) return res.send(err);
            if(rows.length > 0){
                errorReg = {
                    errorMsg: "The user already exists",
                    errorStatus: "400"
                }
                res.json(errorReg);
            }else{
                const {error} = validateEmail(req.body.email, req.body.password);//validate email format
                if(error){
                    errorReg = {
                        errorMsg: "Enter a email address, and valid password",
                        errorStatus: "400"
                    }
                    res.json(errorReg);
                    return;
                }
                //register user
                req.body.password = md5(req.body.password);//encrypt password
                conn.query('INSERT INTO users set ?',[req.body] ,(err, rows) => {
                    if(err) return res.send(err)
                    res.send('the user has been registered') 
                });               
            }
        });
    });
});


//validate email for users
const validateEmail = (email, pass) =>{
    const schema = joi.object({
        correo: joi.string()
            .min(3)
            .max(30)
            .required()
            .email(),
        password: joi.string().min(3).max(16).required()
    });
    return (schema.validate({correo: email, password: pass}));
}

module.exports = route;