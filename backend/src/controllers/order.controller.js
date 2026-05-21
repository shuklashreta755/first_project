const Order = require("../models/order.model.js");
const Product = require("../models/product.model.js");
const asyncHandler=require("../utils/asyncHandler.js");
const mongoose=require("mongoose");
const User=require("../models/user.model.js");

// get all Orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get product by id
const getOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Product.findById(id);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// // add order
// const createOrder = async (req, res) => {
//   try {
//     const order = await Order.create(req.body);
//     res.status(200).json(order);
//   } 
//   catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


const createOrder=asyncHandler(async(req,res) => {
   
  const {productId} =req.body;

  const product=await Product.findById(productId);

  if(!product) {
    return res.status(404).json({message: "Product not found"});
  }
  

  const order=await Order.create({
    userId:req.user._id,
    productId,
    quantity:1,
    totalPrice:10,

    
  })

  //  lookup

  //  const orders=await Order.aggregate([
  //    {
  //   $match: {
  //       id: new mongoose.Types.ObjectId(order._id),

  //   },
  // },

  //  //product lookup
  //   {
  //     $lookup: {
  //       from :"products",
  //       localField:"productId",
  //       foreignField:"_id",
  //       as:"productDetails"
  //     },
  //   },


  //   //userLOokup
  //     {
  //     $lookup: {
  //       from:"user",
  //       localField:"userId",
  //       foreignField:"_id",
  //       as: "userDetails",
  //     },
  //   },

  //   // convert array into object

  //   {
  //     $unwind:"$productDetails",
  //   },

  //   {
  //     $unwind:"$userDetails",
  //   },

  //  ])


   res.status(201).json({
    success:true,
    data:order,
   });

});










// update product
const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndUpdate(id, req.body);

    if (!order) {
      res.status(200).json({ message: "Product not found" });
    }

    const updateOrder = await Order.findById(id);
    res.status(200).json(updateOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




// delete the product
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return res.status(404).json({ messae: error.message });
    }
    res.status(200).json({ message: "Product is deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
};
