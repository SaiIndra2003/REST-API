const express = require("express");
const router = express.Router();

const Product = require("../models/product");

router.get("/:productID", async (req, res, next) => {
  const id = req.params.productID;
  Product.findById(id)
    .select("name price _id productImage")
    .exec()
    .then((doc) => {
      console.log("From Data base... ", doc);
      if (doc) {
        res.status(201).json({
          product: doc,
          request: {
            type: "GET",
            description: "GET_ALL_PRODUCTS",
            url: "http://localhost:3000/products",
          },
        });
      } else {
        res.status(404).json({ message: "No valid entry with provided id" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:productID", (req, res, next) => {
  const id = req.params.productID;
  const product = req.body;
  Product.findByIdAndUpdate(id, { $set: product })
    .exec()
    .then((result) => {
      res.status(201).json({
        message: "Products updated succesfully",
        request: {
          type: "GET",
          description: "GET-PRODUCT",
          url: "http://localhost:3000/products/" + id,
        },
      });
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.delete("/:productID", (req, res, next) => {
  const id = req.params.productID;
  Product.findByIdAndDelete(id)
    .exec()
    .then((result) => {
      res.status(201).json({
        message: "Product deleted succesfully",
        request: {
          type: "POST",
          url: "http://localhost:3000/products/",
          description: "ADD_NEW_PRODUCT",
          body: { name: "String", price: "Number" },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
