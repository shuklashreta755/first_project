// const socketIO = require("socket.io");

// let users = {};

// const setupSocket = (server) => {
//   const io = socketIO(server, {
//     cors: {
//       origin: "http://localhost:5173",
//       methods: ["GET", "POST"],
//     },
//   });

//    global.io = io;

//   io.on("connection", (socket) => {
//     console.log("User Connected:", socket.id);

//     socket.on("join", (userId) => {
//       users[userId] = socket.id;
//     });

//     socket.on("sendMessage", (data) => {
//       const receiverSocketId = users[data.receiver];

//       if (receiverSocketId) {
//         io.to(receiverSocketId).emit("receiveMessage", data);
//       }
//     });

//     socket.on(
//       "broadcastMessage",
//       (data) => {

//         io.emit(
//           "receiveBroadcast",
//           data
//         );
//       }
//     );

//     socket.on("disconnect", () => {
//       console.log("User disconnected");
//     });
//   });
// };

// module.exports = setupSocket;

const socketIO = require("socket.io");
const Message = require("../models/message.model");

let users = {};

const setupSocket = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: "https://first-project-git-main-shreta-shukla-s-projects.vercel.app",
      methods: ["GET", "POST"],
    },
  });

  global.io = io;

  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    socket.on("join", (userId) => {
      users[userId] = socket.id;
      socket.join(userId);
    });

    // it will save in db
    socket.on("sendMessage", async (data) => {
      try {
        const newMessage = await Message.create({
          sender: data.sender,
          receiver: data.receiver,
          message: data.message,
        });

        const savedMessage = await Message.findById(newMessage._id)
          .populate("sender")
          .populate("receiver");

        console.log("message have come after send", savedMessage);

        const receiverSocketId = users[data.receiver];

        if (receiverSocketId) {
          io.to(receiverSocketId).emit("receiveMessage", savedMessage);
        }

        io.to(users[data.sender]).emit("receiveMessage", savedMessage);
      } catch (error) {
        console.log(error.message);
      }
    });

    // socket.on("broadcastMessage", (data) => {
    //   io.emit("receiveBroadcast", data);
    // });

    socket.on("broadcastMessage", async (data) => {
      try {
        console.log("darrrrrrrrrrrrrr");
        console.log("Broadcast Data:", data);

        const newMessage = await Message.create({
          sender: data.sender,
          receiver: data.receiver,
          message: data.message,
          isBroadcast: true,
        });

        console.log("Saved Message:", newMessage);

        io.emit("receiveBroadcast", newMessage);
      } catch (error) {
        console.log("Broadcast Error:", error.message);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

module.exports = setupSocket;
