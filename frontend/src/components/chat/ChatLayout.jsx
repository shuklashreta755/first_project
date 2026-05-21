import ChatSidebar from "./ChatSidebar";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import "./chat.css";

const ChatLayout = () => {
  return (
    <div className="chat-container">
      <ChatSidebar />

      <div className="chat-main">
        <ChatHeader />
        <ChatMessages />
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatLayout;