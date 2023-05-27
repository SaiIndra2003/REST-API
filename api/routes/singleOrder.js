const express = require("express");
const router = express.Router();

const Order = require("../models/order");

router.get("/:orderID", (req, res, next) => {
  const id = req.params.orderID;
  Order.findById(id)
    .select("_id product quantity")
    .exec()
    .then((doc) => {
      if (!doc) {
        return res.status(404).json({
          message: "Order not found...",
        });
      }
      return res.status(200).json({
        order: doc,
        request: {
          type: "GET",
          description: "GET_ALL_ORDERS",
          url: "http://localhost:3000/users",
        },
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.patch("/:orderID", (req, res, next) => {
  const id = req.params.orderID;
  Order.findByIdAndUpdate(id, { $set: req.body })
    .then((result) => {
      res.status(201).json({
        message: "Updated succesfully..",
        request: {
          type: "GET",
          description: "GET_ORDER",
          url: "http://localhost:3000/users/" + id,
        },
      });
    })
    .catch((err) => {
      res.send(500).json({
        error: err,
      });
    });
});

router.delete("/:orderID", (req, res, next) => {
  const id = req.params.orderID;
  Order.findByIdAndDelete(id)
    .exec()
    .then((result) => {
      res.status(201).json({
        message: "Deleted sucessfully",
        request: {
          type: "POST",
          description: "ADD_NEW_ORDER",
          url: "http://localhost:3000/users",
          body: {
            productId: "ID",
            quantity: "Number",
          },
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
