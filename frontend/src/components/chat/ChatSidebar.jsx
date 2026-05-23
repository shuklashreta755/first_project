import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import UserCard from "./UserCard";
import { fetchUsers } from "../../features/userSlice";

import { setSelectedUser } from "../../features/chatSlice";

const ChatSidebar = () => {
  const dispatch = useDispatch();

  const { items: users, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="chat-sidebar">
      <div className="sidebar-search">
        <input type="text" placeholder="Search" />
      </div>

      <div className="sidebar-users">
        {loading && <p>Loading...</p>}

        {error && <p>{error}</p>}

        <div
          className="broadcast-room"
          onClick={() =>
            dispatch(
              setSelectedUser({
                _id: "broadcast-room",
                name: "Announcements",
                isBroadcastRoom: true,
              }),
            )
          }
        >
          📢 Announcements
        </div>

        {users?.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;
