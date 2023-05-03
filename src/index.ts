const express = require('express')
const cors    = require('cors')

import { connect, set, Types } from "mongoose";
import * as bodyParser from 'body-parser'
import BoardController from "./controller/BoardController";

const app = express()

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI||""
const MONGO_DEBUG = process.env.MONGO_DEBUG||""

connect(MONGO_URI, {  })
    .then(() => console.log("connected"))
    .catch((err) => console.log("error ", err));

set('debug', eval(MONGO_DEBUG));

app.use(bodyParser.json());

var allowedOrigins = ['http://localhost:3000','https://kanban.aslu2183.info'];
app.use(cors({
    origin: function(origin, callback){
        // allow requests with no origin 
        // (like mobile apps or curl requests)
        if(!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin) === -1){
            var msg = 'The CORS policy for this site does not ' +
                    'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api',(req,res) => {
    return res.status(200).json({
        status : true,
        message: "Successfully executed api",
        query  : req.query,
        body   : req.body
    })
})

app.post('/create-board',(req,res) => {
    return BoardController.create_board(req,res)
})

app.get('/list-board',(req,res) => {
    return BoardController.list_board(req,res)
})

app.post('/delete-board',(req,res) => {
    return BoardController.delete_board(req,res)
})

app.post('/create-panel',(req,res) => {
    return BoardController.create_panel(req,res)
})

app.post('/get-board-details',(req,res) => {
    return BoardController.get_board_details(req,res)
})

app.post('/delete-panel',(req,res) => {
    return BoardController.delete_panel(req,res)
})

app.post('/create-task',(req,res) => {
    return BoardController.create_task(req,res)
})

app.post('/delete-task',(req,res) => {
    return BoardController.delete_task(req,res)
})

app.post('/update-task',(req,res) => {
    return BoardController.update_task(req,res)
})

app.post('/reorder-task',(req,res) => {
    return BoardController.reorder_task(req,res)
})

app.get('/get-ip-address',(req,res) => {
    const ipv4 = req.socket.remoteAddress.split(":")
    return res.status(200).json({
        status : true,
        remoteIpAddress : req.socket.remoteAddress,
        x_forwared_for  : req.headers['x-forwarded-for'] ?? 'undefined',
        ipV4 : ipv4[ipv4.length - 1],
        test : req.headers['x-real-ip'] ?? 'not-definded',
        headers:req.headers
    })
})
  
app.listen(PORT, () => {
    console.log(`[server]: Server is running at port : ${PORT}`);
});



