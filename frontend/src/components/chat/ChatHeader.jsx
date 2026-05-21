import { useSelector } from "react-redux";

import { FiPhone, FiVideo } from "react-icons/fi";

const ChatHeader = () => {
  const { selectedUser } = useSelector((state) => state.chat);

  if (!selectedUser) {
    return (
      <div className="chat-header">
        <h2>Select User</h2>
      </div>
    );
  }

  return (
    <div className="chat-header">
      <div className="header-left">
        {/* <img
          src={selectedUser.profilePic || "https://i.pravatar.cc/150?img=3"}
          alt="avatar"
          className="avatar"
        /> */}

          {selectedUser.profilePic ? (
  <img
    src={selectedUser.profilePic}
    alt="avatar"
    style={{
      width: "45px",
      height: "45px",
      borderRadius: "50%",
      objectFit: "cover",
    }}
  />
) : (
  <div
    style={{
      width: "45px",
      height: "45px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#555",
      color: "white",
      fontSize: "18px",
      fontWeight: "bold",
    }}
  >
    {selectedUser.name?.charAt(0).toUpperCase()}
  </div>
)}




        <div>
          <h3>{selectedUser.name}</h3>

          <p>{selectedUser.email}</p>
        </div>
      </div>

      <div className="header-icons">
        <FiPhone />
        <FiVideo />
      </div>
    </div>
  );
};

export default ChatHeader;
