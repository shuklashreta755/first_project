import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import socket from "../../socket/socket";

import MessageBubble from "./MessageBubble";

import { addRealtimeMessage } from "../../features/chatSlice";

const ChatMessages = () => {
  const dispatch = useDispatch();

  const { messages, broadcasts, selectedUser } = useSelector(
    (state) => state.chat,
  );

  const { user: currentUser } = useSelector((state) => state.auth);

  // join chat

  useEffect(() => {
    socket.emit("join", currentUser?._id);
    console.log(`user switched to ${selectedUser?.name}`);
  }, [selectedUser]);

   // receive normal msg
  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      console.log("data come from user", data);
      dispatch(addRealtimeMessage(data));
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [dispatch]);

  // receive broadcast msg
  useEffect(() => {
    socket.on("receiveBroadcast", (data) => {
      console.log("data come from broadcast", data);
      dispatch(addRealtimeMessage(data));
    });

    return () => {
      socket.off("receiveBroadcast");
    };
  }, [dispatch]);

  const filteredMessages = selectedUser?.isBroadcastRoom
    ? // BROADCASTS

      messages.filter((msg) => msg.isBroadcast)
    : // NORMAL CHAT

      messages.filter((msg) => {
        const senderId = msg.sender?._id || msg.sender;

        const receiverId = msg.receiver?._id || msg.receiver;

        return (
          (senderId === currentUser._id && receiverId === selectedUser?._id) ||
          (senderId === selectedUser?._id && receiverId === currentUser._id)
        );
      });

  return (
    <div className="chat-messages">
      {/* NORMAL CHAT */}

      {filteredMessages.map((msg, index) => (
        <MessageBubble key={index} msg={msg} currentUser={currentUser} />
      ))}
    </div>
  );
};

export default ChatMessages;
