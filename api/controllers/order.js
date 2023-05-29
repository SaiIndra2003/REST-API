const mongoose = require("mongoose");

const Order = require("../models/order");
const Product = require("../models/product");

exports.get_all_orders = async (req, res, next) => {
  Order.find()
    .select("product quantity _id")
    .populate("product", "name") //Used for properties which are refered to other collection which returns the products corr to id
    .exec()
    .then((docs) => {
      res.status(201).json({
        count: docs.length,
        orders: docs.map((doc) => {
          return {
            _id: doc._id,
            product: doc.product,
            quantity: doc.quantity,
            request: {
              type: "GET",
              url: "http://localhost:3000/orders/" + doc._id,
            },
          };
        }),
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.add_new_order = async (req, res, next) => {
  Product.findById(req.body.productId)
    .then((product) => {
      if (!product) {
        return res.status(404).json({
          message: "Product not Found",
        });
      }
      const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId,
      });
      return order.save();
    })
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Order stored",
        CreatedOrder: {
          _id: result._id,
          product: result.product,
          quantity: result.quantity,
        },
        request: {
          type: "GET",
          url: "http://localhost:3000/orders/" + result._id,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Invalid Product",
        error: err,
      });
    });
};

exports.get_single_order = async (req, res, next) => {
  const id = req.params.orderID;
  Order.findById(id)
    .select("_id product quantity")
    .populate("product", "_id name price")
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
};

exports.update_order = async (req, res, next) => {
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
};

exports.delete_order = async (req, res, next) => {
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
};
