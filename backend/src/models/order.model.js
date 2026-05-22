const mongoose = require("mongoose");
const Product = require("./product.model.js");

const orderSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    quantity: {
      type: Number,
      default: 1,
      required: true,
    },

    orderDate: {
      type: Date,
      Default: Date.now(),
    },
    payment: {
      type: String,
      enum: ["SUCCESS", "PENDING", "FAILED"],
      default: SUCCESS,
    },
  },
  { timestamps: true },
);

orderSchema.pre("save", async function () {
  const product = await Product.findById(this.productId);

  if (!product) {
    throw new Error("Product not found");
  }

  this.totalPrice = product.price * this.quantity;
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
