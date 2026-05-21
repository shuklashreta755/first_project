
const Message = require("../models/message.model");
const User = require("../models/user.model");

// const sendMessage = async (req, res) => {
//   try {
//     const { sender, receiver, message } = req.body;

//     const newMessage = await Message.create({
//       sender,
//       receiver,
//       message,
//     });

//     res.status(201).json(newMessage);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };








// const getMessages = async (req, res) => {
//   try {
//     const { senderId, receiverId } = req.params;

//     const messages = await Message.find({
//       $or: [
//         {
//           sender: senderId,
//           receiver: receiverId,
//         },
//         {
//           sender: receiverId,
//           receiver: senderId,
//         },
//       ],
//     }).sort({ createdAt: 1 });

//     res.json(messages);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };








     const getMessages = async (req, res) => {
  try {

    const { senderId, receiverId } = req.params;

    let messages = [];

    // =========================
    // BROADCAST ROOM
    // =========================

    if (receiverId === "broadcast") {

      messages = await Message.find({
        isBroadcast: true,
      })
      .sort({ createdAt: 1 });

    }

   
    // NORMAL CHAT
   

    else {

      messages = await Message.find({
        $or: [
          {
            sender: senderId,
            receiver: receiverId,
          },
          {
            sender: receiverId,
            receiver: senderId,
          },
        ],
      })
      .sort({ createdAt: 1 });

    }

    res.json(messages);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};




























// const broadcastMessage = async (
//   req,
//   res
// ) => {

//   try {

//     const { sender, message } =
//       req.body;

//     // ADMIN CHECK

//    const admin = await User.findById(
//       sender
//     );

//     if (admin.role !== "Admin") {

//       return res.status(403).json({
//         message:
//           "Only admin can broadcast",
//       });
//     }

//     // SAVE MESSAGE

//     const newMessage =
//       await Message.create({

//         sender,

//         message,

//         isBroadcast: true,
//       });

//     // SOCKET.IO GLOBAL EMIT

//     global.io.emit(
//       "receiveBroadcast",
//       newMessage
//     );

//     res.status(201).json(newMessage);

//   } catch (error) {

//     res.status(500).json({
//       message: error.message,
//     });

//   }
// };





















// module.exports={ sendMessage , getMessages ,broadcastMessage }

module.exports={ getMessages  }