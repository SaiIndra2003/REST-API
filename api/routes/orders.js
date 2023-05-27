const express = require("express");
const router = express.Router();

router.get("/",(req,res,next)=>{
    res.status(200).json({
        message: "Orders chinna"
    });
});

router.post("/",(req,res,next)=>{
    const order={
        productId: req.body.productId,
        quantity: req.body.quantity
    }
    
    res.status(200).json({
        message: "New order created",
        order: order
    });
});

router.get("/:orderID",(req,res,next)=>{
    const id = req.params.orderID;
    res.status(200).json({
        message: "Orders get req",
        id: id
    });
});

router.post("/:orderID",(req,res,next)=>{
    const id = req.params.orderID;
    res.status(200).json({
        message: "Orders post req",
        id: id
    });
});

router.delete("/:orderID",(req,res,next)=>{
    const id = req.params.orderID;
    res.status(200).json({
        message: "Orders delete req",
        id: id
    });
});

module.exports = router;