const express = require("express");
const router = express.Router();

const singleOrderRoute = require("./singleOrder");
const checkAuth = require("../middleware/check_auth");
const orderController = require("../controllers/order");

router.get("/", checkAuth, orderController.get_all_orders);

router.post("/", checkAuth, orderController.add_new_order);

router.use("/", singleOrderRoute);

module.exports = router;
