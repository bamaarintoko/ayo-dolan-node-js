const express = require('express');
let multer = require('multer');
// import md5 from 'crypto-js/md5';
const md5 = require('crypto-js/md5')
let upload = multer();
const app = express();
const message = require('../Model/ModelMessage');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false})); // support encoded bodies
app.use(bodyParser.json()); // support json encoded bodies

app.post('/get_message', upload.fields([]), (req, res) => {
    let user_id   = req.body.user_id
    message.get_messages(user_id).then((response)=>{
        if (response.length > 0){
            res.json({status:true, result:response, message : "contact available"})
        } else {
            res.json({status:false, result:response, message : "contact not available"})
        }
        // res.json(response)
    })

    // console.log(user_id)
})

module.exports = app