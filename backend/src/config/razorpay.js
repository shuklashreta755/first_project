const Razorpay = require("razorpay");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const razorpay = new Razorpay({
 key_id:process.env.RAZORPAY_API_KEY,
  key_secret:process.env.RAZORPAY_KEY_SECRET,
 
});
 //console.log(process.env.RAZORPAY_KEY_ID);


module.exports=razorpay;