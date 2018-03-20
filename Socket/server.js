const express = require('express')();
const bodyParser = require('body-parser');
// const modul = require('../Model/Module');
const user = require('../Model/Login');
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 3010;



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    res.io = io;
    next();
});

let stuff = require('../Controller/index');

app.use('/back', stuff);

app.get('/', (req, res) => {
    res.json(['Magic happen here :)']);
});
let room = "";
const sockets = {};
const isOnline = {};
const meOnline = {};
// io.in(room).emit('message_', 'what is going on, party people?');

io.on('connection', (client) => {
    //console.log("--->",client.id)
    client.on('subscribeToTimer', (interval) => {
        console.log('client is subscribing to timer with interval ', interval);
        setInterval(() => {
            console.log(new Date())
            client.emit('timer', new Date());
        }, interval);
    });
    client.on('room', function(room_) {
        // console.log(room_)
        room = room_
        client.join(room_);
    });
    client.on('init', (userId) => {
        sockets[userId.senderId] = client;
        client.on('message', (message) => {
            if (sockets[userId.receiverId]) {
                sockets[userId.receiverId].emit('message', message);
                console.log("sockets--->",sockets[userId.receiverId])
            }
            /* handler for creating message */
        });
    });
    client.on('online', (id) => {
        // meOnline[id.myId] = client;
        // id.friendId.map((v,k)=>{
            isOnline[id.myId] = client;
            // isOnline[id.myId].emit('online_user','a')
            // console.log(id.myId+"--->",isOnline)
        // })
        // isOnline[id.myId] = client
        // console.log("lllllllllllllll",isOnline)
        // console.log('user-->',id,' is online')
        client.on('online_user',(id_)=> {
            // if (isOnline[id_.friendId]) {
            //     isOnline[id_.friendId].emit('online_user','a')
            // }
            //     console.log(id_.friendId)
            id_.friendId.map((v,k)=>{
                console.log(v)
                if (isOnline[v]) {
                    isOnline[v].emit('online_user',id.myId)
                }
            })
        })
        //
        //     // console.log("asu",id_.friendId)
        //     // console.log("-->",isOnline)
        //     if (isOnline['1903']) {
        //         isOnline['1903'].emit('online_user','a')
        //     }
        //     id.friendId.map((v,k)=>{
        //         // isOnline[v].emit('online_user',v)
        //         // isOnline[v] = client;
        //         // console.log(typeof v)
        //     })
        //     // isOnline.map((v,k)=>
        //     // {
        //     //     console.log("-->",v)
        //     // })
        //     //     isOnline['1903'].emit('online_user','a')
        //         // console.log("-------->",isOnline)
        //         // sockets[userId.receiverId].emit('message', message);
        // })
    });

    client.on('tes', (interval) => {
        console.log('client is subscribing to timer with interval ', interval);
        setInterval(() => {
            client.emit('timer', interval++);
        }, interval);
    });
})

server.listen(port, ()=>{
    console.log('server running on http://localhost:'+port)
})
// app.listen(port, ()=> {
//     console.log('Server running on http://localhost:8889')
// })

;