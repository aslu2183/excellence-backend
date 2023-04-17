const express = require('express')
import { connect, set, Types } from "mongoose";
import * as bodyParser from 'body-parser'
import User from './schema/User'

const app = express()

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI||""
const MONGO_DEBUG = process.env.MONGO_DEBUG||""

connect(MONGO_URI, {  })
    .then(() => console.log("connected"))
    .catch((err) => console.log("error ", err));

set('debug', eval(MONGO_DEBUG));

app.use(bodyParser.json());

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
  
app.listen(PORT, () => {
    console.log(`[server]: Server is running at port : ${PORT}`);
});



