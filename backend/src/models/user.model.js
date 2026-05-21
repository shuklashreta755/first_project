const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
//import jwt from "jsonwebtoken";
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please enter user name"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      validate: {
        validator: validator.isEmail,
        message: "{VALUE} is not a valid email",
      },
    },
    password: {
      type: String,
      required: true,
      default: 0,
    },

    age: {
      type: Number,
      required: [true, "Age is required"],
      min: [18, "Must be atleast 18 years old"],
      max: [100, "Age can not exceed 100"],
    },
    number: {
      type: Number,
      required: false,
      match: [/^\d{10}$/, "Please fill a valid 10-digit phone number"],
    },
    address: {
      type: String,
    },
    role: {
      type: String,
      enum: ["Admin", "User"],
      default: "User",
    },

    refreshToken: {
      type: String,
    },

    image: {
      type:String,
      required:true,
      default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",

    },
  },
  { timestamps: true },
);

// hash password before save
userSchema.pre("save", async function () {
  // this is the middleware-> pre("save")
  if (!this.isModified("password")) {
    return;
  }
  const salt = await bcrypt.genSalt(10); // salt is random data which added to password before hashing
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.generateAccessToken = function () {
  console.log(process.env.ACCESS_TOKEN_SECRET);
  console.log(process.env.ACCESS_TOKEN_EXPIRY);

  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    },
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    },
  );
};

const User = mongoose.model("User", userSchema);

module.exports = User;
