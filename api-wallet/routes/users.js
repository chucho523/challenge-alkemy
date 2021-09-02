const jwt = require('jsonwebtoken');
const express = require ('express');
const route = express.Router(); //routes
const joi = require('@hapi/joi'); //validator
const md5 = require('md5');//encrypt md5
const config = require("../configDB.js");


//routes------------------------
//register
route.post('/register',(req, res) => {
    req.getConnection((err, conn) =>{
        if(err) return res.send(err);
        conn.query(`use ${config.database}`);
        conn.query(`SELECT * FROM users WHERE email= '${req.body.email}'`, (err, rows) =>{
            if(err) return res.send(err);
            if(rows.length > 0){
                res.status(400).json({error: {path: 'email', message:'This email already exists'}});
            }else{
                const {error} = validateEmail(req.body.email, req.body.password, req.body.name);//validate email format
                if(error){
                    res.status(400).json({error: error.details[0]});
                    return;
                }
                //register user
                req.body.password = md5(req.body.password);//encrypt password
                conn.query('INSERT INTO users set ?',[req.body] ,(err, rows) => {
                    if(err) return res.send(err)
                    res.json({data: 'the user has been registered'}) 
                });               
            }
        });
    });
});

//LOGIN
route.post('/login', (req, res) => {
    req.getConnection((err, conn) =>{
        if(err) return res.send(err);
        conn.query(`use ${config.database}`);
        conn.query(`SELECT * FROM users WHERE email= '${req.body.email}'`, (err, rows) => {
            if(err) return res.send(err);
            if(rows.length > 0){
                //login success
                if(rows[0].password === md5(req.body.password)){
                    const userForToken = {
                        email: req.body.email,
                        id: rows[0].id
                    }
                    //create token                    
                    const token = jwt.sign(
                        userForToken,
                        "chucho523",
                        {
                            expiresIn: 60 * 60 * 24 * 7 //token expires in 7 days
                        }
                    );
                    res.json({...rows[0], token});
                }else{
                    res.status(400).json({error: {path: 'email', message:"The user entered does not exist or the password is not valid"}});
                    
                }
            }else{
                //login failed
                res.status(400).json({error: {path: 'email', message:"The user entered does not exist or the password is not valid"}});
            }
        })

    })
})



//validate email for users
const validateEmail = (email, pass, nam) =>{
    const schema = joi.object({
        correo: joi.string()
            .min(3)
            .max(30)
            .required()
            .email(),
        password: joi.string().min(3).max(16).required(),
        name: joi.string().min(3).max(20).required()
    });
    return (schema.validate({correo: email, password: pass, name: nam}));
}

module.exports = route;