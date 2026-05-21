const express=require("express");
const router=express.Router();
const verifyJWT=require("../middlewares/role.middleware.js");

const{createOrder,verifyPayment} =require("../controllers/payment.controller.js")




router.post("/createOrder",createOrder);
router.post("/verifyPayment",verifyJWT,verifyPayment);



module.exports=router;


