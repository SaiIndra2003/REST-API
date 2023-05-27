require('dotenv').config();
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const productsRoute = require("./api/routes/product");
const ordersRoute = require("./api/routes/orders");

const uri = process.env.MONGODB;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {console.log('Connected to MongoDB Atlas');})
  .catch((error) => {console.error('Failed to connect to MongoDB Atlas', error);});


const app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use((req,res,next)=>{ //We would set the header of response (Server) here so that cors error is handled
    res.set("Access-Control-Allow-Origin","*");//in * you can give url's to which only our server connects (cors error) (Giving access of this server to specified urls * indicates all url's)
    res.set("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization"); // Allows the access to the specified types of headers
    if(req.method === 'OPTIONS'){ // Options req is send by browser whenever put/patch/delete/post method is done
        res.set("Access-Control-Allow-Methods","PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next(); 
    //If not mentioned the server will end it here and the handler will not able to catch the remainming we mentioned
});

app.use("/products",productsRoute);
app.use("/orders",ordersRoute)



app.use((req,res,next)=>{
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});
app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});

module.exports = app;
