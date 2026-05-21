const express = require("express");
const razorpay =require("../config/razorpay");
const crypto =require("crypto"); 




// create order
const createOrder = async (req, res) => {

   // sets options for razorpay
     const options ={
        amount:req.body.amount*100,
        currency:"INR",
        receipt:"receipt_1",
        payment_capture:1
       }

    try {

      const order = await razorpay.orders.create(options);

      res.json({

        order_id:order.id,
        currency:order.currency,
        amount:order.amount,
      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message,
      });
    }
};



//verify payment

const verifyPayment = async (req, res) => {

    try {

      const secret = razorpay.key_secret;

      // CREATE HMAC

      const generatedSignature =crypto.createHmac("sha256",secret)

          .update( JSON.stringify(req.body))

          .digest("hex");

      // GET HEADER SIGNATURE

      const receivedSignature = req.headers["x-razorpay-signature"];
       console.log('request is legit')

      // VERIFY
      if (generatedSignature !== receivedSignature)
        {
        return res.status(400).json({ success: false, message:"Invalid signature",});
        }

      // EVENT TYPE

      const event = req.body.event;

      // PAYMENT SUCCESS
      if (event === "payment.captured")
        {
        const payment =req.body.payload.payment.entity;

        console.log( "Payment Success");

        // SAVE ORDER

        await Order.create({

          razorpayPaymentId: payment.id,
          amount:payment.amount / 100,
          status: "Paid",
          email: payment.email,
          contact: payment.contact,
        });
      }

      res.json({
        success: true,
      });
    } 
    catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
};

module.exports = {
  createOrder,verifyPayment
};





























