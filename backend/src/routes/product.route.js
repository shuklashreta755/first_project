const express = require("express");
const router = express.Router();
const Product = require("../models/product.model.js");
const verifyJWT=require("../middlewares/auth.middleware.js");
const verifyRole=require("../middlewares/role.middleware.js");
const upload = require("../middlewares/upload.middleware.js");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller.js");


//public routes
router.get("/", getProducts);
router.get("/:id",getProduct);


// only admin route
//router.post("/",verifyJWT,verifyRole("Admin"), createProduct);


router.post(
  "/",
  verifyJWT,
  verifyRole("Admin"),
  upload.single("image"),
  createProduct
);




router.put("/:id",verifyJWT,verifyRole("Admin"), updateProduct);
router.delete("/:id",verifyJWT,verifyRole("Admin"),deleteProduct);

module.exports = router;
