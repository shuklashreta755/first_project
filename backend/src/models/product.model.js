const mongoose = require("mongoose");


const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please enter product name"],
    },

    description: {
        type:String,
    },

    quantity: {
      type: Number,
      required: true,
      default: 0,
    },

    price: {
      type: Number,
      required: true,
      default: 0,
    },
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    },


    image: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
