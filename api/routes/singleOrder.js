const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/check_auth");
const orderController = require("../controllers/order");

router.get("/:orderID", checkAuth, orderController.get_single_order);

router.patch("/:orderID", checkAuth, orderController.update_order);

router.delete("/:orderID", checkAuth, orderController.delete_order);

module.exports = router;
