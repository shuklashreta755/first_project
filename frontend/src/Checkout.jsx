import React, { useState, forwardRef, useImperativeHandle } from "react";
import axios from "axios";

const api = axios.create({
  //baseURL: "http://localhost:3000/api",
   baseURL: "https://first-project-a1ov.onrender.com"
});

const Checkout = forwardRef((props, ref) => {
 // const [amount, setAmount] = useState(500);

  // load razorpay

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");

      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => resolve(true);

      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  };

  // payment function

  const handlePayment = async ({
    amount,
    productId,
    quantity,
    createOrderApi,
  }) => {
    const isScriptLoaded = await loadRazorpayScript();

    if (!isScriptLoaded) 
    {
      alert("Razorpay SDK failed to load");
      return;
    }

    try {
      // create razorpay order

      const orderResponse = await api.post("/payment/createOrder", {
        amount,
      });

      const { order_id, currency } = orderResponse.data;

      // RAZORPAY OPTIONS

      const options = {
        key: import.meta.env.VITE_RAZORPAY_API_KEY,
       // amount: amount * 100,
        currency,
        name: "My Shop",
        description: "Product Payment",
        order_id,

        handler: async function (response) {
          // CREATE ACTUAL ORDER AFTER PAYMENT SUCCESS

          await createOrderApi({
            productId,
            quantity,
            paymentId: response.razorpay_payment_id,
          });

          alert("Payment Successful");
        },

        prefill: {
          name: "John Doe",

          email: "john@example.com",

          contact: "9999999999",
        },

        theme: {
          color: "#4f46e5",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.log(error);

      alert("Payment Failed");
    }
  };

  // expose function to parent

  useImperativeHandle(ref, () => ({
    handlePayment,
  }));

  return null;
});

export default Checkout;
