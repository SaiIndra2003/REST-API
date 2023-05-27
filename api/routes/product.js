const express = require("express");
const router = express.Router();

router.get("/",(req,res,next)=>{
    res.status(200).json({
        message: "The get"
    });
});

router.post("/",(req,res,next)=>{
    const product={
        name: req.body.name,
        price: req.body.price
    };
    res.status(200).json({
        message: "New product created",
        createdProduct: product
    });
});

router.get("/:productID",(req,res,next)=>{
    const id = req.params.productID;   
});

router.patch("/:productID",(req,res,next)=>{
    const id = req.params.productID;   
});

router.delete("/:productID",(req,res,next)=>{
    const id = req.params.productID;   
});

module.exports = router;