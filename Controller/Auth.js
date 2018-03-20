const express = require('express');
let multer = require('multer');
// import md5 from 'crypto-js/md5';
const md5 = require('crypto-js/md5')
let upload = multer();
const app = express();
const login = require('../Model/Login');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies
app.use(bodyParser.json()); // support json encoded bodies

app.post('/login', upload.fields([]), (req, res)=>{
    let user_name       = req.body.username
    let password        = md5(md5(req.body.password).toString()).toString()
    const params        = {user_name,password}

    if (user_name==="" || password===""){
    res.json("kosong")

    } else {
        res.json(params)
        login.login(params).then((response)=>{
            let val = [];
            if (response.length <1){
                val.push({status:false,text:"email or password wrong",data_user:[]})
            } else {
                val.push({status:true,text:"login success",data_user:response})
            }
            res.json(val[0])
        })
    }


})

module.exports = app