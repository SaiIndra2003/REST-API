const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/check_auth");
const productController = require("../controllers/product");

router.get("/:productID", checkAuth, productController.get_single_product);

router.patch("/:productID", checkAuth, productController.update_single_product);

router.delete("/:productID", checkAuth, productController.delete_product);

module.exports = router;
