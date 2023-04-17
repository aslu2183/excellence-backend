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

app.post('/api/create-board',(req,res) => {
    return BoardController.create_board(req,res)
})
  
app.listen(PORT, () => {
    console.log(`[server]: Server is running at port : ${PORT}`);
});



