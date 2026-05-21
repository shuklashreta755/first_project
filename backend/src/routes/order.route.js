const express = require("express");
const Order = require("../models/order.model.js");
const router = express.Router();

const {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/order.controller.js");
const verifyJWT = require("../middlewares/auth.middleware.js");

router.get('/', getOrders);
router.get("/:id", getOrder);

router.post("/",verifyJWT, createOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);


module.exports = router;
