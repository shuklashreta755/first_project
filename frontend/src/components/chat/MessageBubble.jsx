const MessageBubble = ({ msg, currentUser }) => {
  const isMe =
    msg.sender?._id === currentUser?._id || msg.sender === currentUser?._id;

  return (
    <div className={`message-row ${isMe ? "right" : "left"}`}>
      <div className={`message ${isMe ? "me" : "other"}`}>
        {msg.isBroadcast && "📢 "}

        {msg.message}
      </div>
    </div>
  );
};

export default MessageBubble;
