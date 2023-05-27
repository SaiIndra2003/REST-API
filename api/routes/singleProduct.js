const express = require("express");
const router = express.Router();

const Product = require("../models/product");

router.get("/:productID", async (req, res, next) => {
  const id = req.params.productID;
  Product.findById(id)
    .exec()
    .then((doc) => {
      console.log("From Data base... ", doc);
      if (doc) {
        res.status(200).json(doc);
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
      res.status(200).json(result);
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
      res.status(200).json({
        message: "Deleted succesfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});



module.exports = router;
