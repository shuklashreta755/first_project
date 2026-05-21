const express = require("express");
const Chat = require("../models/chat.model.js");
const router = express.Router();
const verifyJWT = require("../middlewares/auth.middleware.js");

const { sendMessage,getMessages,broadcastMessage} =require("../controllers/chat.controller.js");



//router.post("/sendMessage",verifyJWT,sendMessage);
router.get("/:senderId/:receiverId", verifyJWT, getMessages);


// router.post(
//   "/broadcast",
//   broadcastMessage
// );



module.exports = router;
