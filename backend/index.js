const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const express = require("express");
const mongoose = require("mongoose");
const Product = require("./src/models/product.model.js");
const User = require("./src/models/user.model.js");
const Order = require("./src/models/order.model.js");
const app = express();
const ProductRoute = require("./src/routes/product.route.js");
const UserRoute = require("./src/routes/user.route.js");
const ChatRoute = require("./src/routes/chat.route.js");
const PaymentRoute = require("./src/routes/payment.route.js");
const connectDB = require("./src/config/db.js");
const cookieParser = require("cookie-parser");
const OrderRoute = require("./src/routes/order.route.js");
const cors = require("cors");
const setupSocket = require("./src/socket/socket.js");
const http = require("http");

//dotenv.config({ path: "./.env" });

// CORS — allow requests from the Vite frontend
app.use(
  cors({
    origin:
      // process.env.CORS_ORIGIN || "https://first-project-eight-gules.vercel.app",
      process.env.CORS_ORIGIN,
    credentials: true, // needed so cookies (accessToken) are sent cross-origin
  }),
);

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/products", ProductRoute);
app.use("/api/user", UserRoute);
app.use("/api/order", OrderRoute);
app.use("/api/chat", ChatRoute);
app.use("/api/payment", PaymentRoute);
app.get("/test", (req, res) => {
  res.status(200).json({
    message: "Server is up and running",
    status: "success",
  });
});

//app.use("/uploads", express.static("uploads"));

const server = http.createServer(app);
setupSocket(server);

connectDB()
  .then(() => {
    console.log("mongoDB connected")
    server.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running at port: ${process.env.PORT || 3000}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed!!", err);
  });
