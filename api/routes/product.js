const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const singleProductRoute = require("./singleProduct");
const checkAuth = require("../middleware/check_auth");
const productController = require("../controllers/product");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    const extname = path.extname(file.originalname);
    cb(null, uniqueSuffix + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Invalid mime type"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 500, //bytes 1024*1024 = 1MB
  },
  fileFilter: fileFilter,
});

router.get("/", checkAuth, productController.get_all_products);

router.post(
  "/",
  checkAuth,
  upload.single("productImage"),
  productController.add_new_product
);

router.use("/", singleProductRoute);

module.exports = router;
