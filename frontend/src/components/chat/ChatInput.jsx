import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../../socket/socket";
import { addRealtimeMessage } from "../../features/chatSlice";
import { getMessages } from "../../features/chatSlice";

const ChatInput = () => {
  const dispatch = useDispatch();
  //current logged in user
  const currentUser = useSelector((state) => state.auth.user);
  // selected chat user
  const { selectedUser } = useSelector((state) => state.chat);

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!selectedUser) return;

    dispatch(
      getMessages({
        senderId: currentUser._id,

        receiverId: selectedUser?.isBroadcastRoom
          ? "broadcast"
          : selectedUser._id,
      }),
    );
  }, [dispatch, currentUser, selectedUser]);

  const handleSend = () => {
    if (!message.trim()) return;

    const data = {
      sender: currentUser._id,
      receiver: selectedUser._id,
      message,
    };

    // instant ui update
    // dispatch(
    //   addRealtimeMessage({
    //     ...data,
    //     temp: true,
    //   }),
    // );

    // send to backend send to one socket
    socket.emit("sendMessage", data);
    setMessage("");
  };

  // BROADCAST
  const handleBroadcast = () => {
    if (!message.trim()) return;

    const data = {
      sender: currentUser._id,
      receiver: currentUser._id,
      message,
    };
    dispatch(addRealtimeMessage(data));
    socket.emit("broadcastMessage", data);
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (selectedUser?.isBroadcastRoom) {
        handleBroadcast();
      } else {
        handleSend();
      }
    }
  };

  return (
    <div className="chat-input-box">
      {
        // announcement room
        selectedUser?.isBroadcastRoom ? (
          currentUser?.role === "Admin" ? (
            // admin ui
            <>
              <input
                type="text"
                placeholder="Broadcast message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
              />

              <button onClick={handleBroadcast}>B</button>
            </>
          ) : (
            // for user
            <div className="announcement-notice">
              Only admin can send messages
            </div>
          )
        ) : (
          // NORMAL CHAT

          <>
            <input
              type="text"
              placeholder="Type message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
               onKeyDown={handleKeyDown}
            />

            <button onClick={handleSend}>Send</button>
          </>
        )
      }
    </div>
  );
};

export default ChatInput;
