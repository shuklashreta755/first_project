import { useDispatch, useSelector } from "react-redux";

import { setSelectedUser, getMessages } from "../../features/chatSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();

  const { user: currentUser } = useSelector((state) => state.auth);

  const handleSelectUser = () => {
    // select chat user
    dispatch(setSelectedUser(user));

    // fetch old messages
    dispatch(
      getMessages({
        senderId: currentUser._id,
        receiverId: user._id,
        //receiverId: currentUser._id,
      }),
    );
  };

  return (
    <div className="user-card" onClick={handleSelectUser}>
      {/* <img src={user.profilePic} alt="" className="avatar" /> */}

      {user.profilePic ? (
        <img
          src={user.profilePic}
          alt={user.name}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      ) : (
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            backgroundColor: "#555",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: "bold",
          }}
        >
          {user.name?.charAt(0).toUpperCase()}
        </div>
      )}

      <div>
        <h4>{user.name}</h4>
      </div>
    </div>
  );
};

export default UserCard;
