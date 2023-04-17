const express = require('express')
import * as bodyParser from 'body-parser'

const app = express()

const PORT = process.env.PORT

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



