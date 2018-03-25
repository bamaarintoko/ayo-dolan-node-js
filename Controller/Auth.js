const express = require('express');
let multer = require('multer');
// import md5 from 'crypto-js/md5';
const md5 = require('crypto-js/md5')
let upload = multer();
const app = express();
const login = require('../Model/Login');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false})); // support encoded bodies
app.use(bodyParser.json()); // support json encoded bodies

app.post('/login', upload.fields([]), (req, res) => {
    let user_name = req.body.username
    let password = req.body.password
    const params = {user_name, password}
    if (req.body.username < 1 || req.body.password.length < 1) {
        let val = [];
        val.push({status: false, message: "email and password required", results: []})
        res.json(val[0])
    } else {
        login.login(params).then((response) => {
            let val = [];
            if (response.length < 1) {
                val.push({status: false, message: "email or password wrong", results: []})
            } else {
                val.push({status: true, message: "login success", results: response})
            }
            res.json(val[0])
        })
    }
})

module.exports = app