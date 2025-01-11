import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NEW_DISCUSSION, GET_DISCUSSION } from "../util/Event";
import { io } from "socket.io-client";
import { server } from "../../constants/config";
import { useSelector } from "react-redux";

const Discussion = () => {
  const socket = io(`${server}`, {
    withCredentials: true,
  });

  const [content, setContent] = useState("");
  const { id } = useParams();
  const [discussions, setDiscussions] = useState([]);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [ShowLoginPopup, setShowLoginPopup] = useState(!isAuthenticated);


  const [contextMenu, setContextMenu] = useState({
    position: { x: 0, y: 0 },
    visible: false,
    selectedMessageId: null,
  });

  useEffect(() => {
    socket.emit(GET_DISCUSSION, { id });
    socket.on(GET_DISCUSSION, (discussionData) => {
      setDiscussions(discussionData);
    });

    return () => {
      socket.off(GET_DISCUSSION);
      socket.disconnect();
    };
  }, [id, socket]);

  const handleSendMessage = () => {
    if (content.trim() === "") {
      alert("Message cannot be empty.");
      return;
    }
    socket.emit(NEW_DISCUSSION, { content, id }, (error) => {
      if (error) {
        alert("Failed to send message. Please try again.");
      } else {
        setContent("");
      }
    });
  };


  const handleOnContextMenu = (e, messageId) => {
    e.preventDefault();
    setContextMenu({
      position: { x: e.clientX, y: e.clientY-125},
      visible: true,
      selectedMessageId: messageId,
    });
  };

  const handleCloseContextMenu = () => {
    setContextMenu({ ...contextMenu, visible: false });
  };

  

  const handleDeleteMessage = () => {
    alert(`Deleting message: ${contextMenu.selectedMessageId}`);
    handleCloseContextMenu();
  };

  return (
    <div
      className="flex flex-col h-[550px] bg-gray-50 relative rounded-xl dark:bg-gray-800"
      onClick={handleCloseContextMenu}
    >
      {ShowLoginPopup && (
        <div className="absolute inset-0 flex justify-center items-center bg-gray-400 bg-opacity-50 dark:bg-gray-900">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center dark:bg-gray-700">
            <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-100">
              Login Required
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              You must be logged in to join the discussion.
            </p>
            <button
              onClick={() => (window.location.href = "/login")}
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 dark:hover:bg-blue-400"
            >
              Go to Login
            </button>
          </div>
        </div>
      )}
      {isAuthenticated && (
        <>
          <div className="flex-grow overflow-auto p-4 bg-gray-100 dark:bg-gray-900">
            <h1 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
              Welcome to the discussion
            </h1>
            <ul className="space-y-4">
              {discussions.map((item, index) => (
                <li
                  key={index}
                  className="bg-white shadow-md rounded-md p-4 dark:bg-gray-700"
                  onContextMenu={(e) => handleOnContextMenu(e, item._id)}
                >
                  <div>
                    <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                      {item.user_name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      {item.content}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4 bg-gray-100 shadow-md sticky bottom-0 dark:bg-gray-800">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-grow border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-400"
                placeholder="Type your message..."
                aria-label="Type your message"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-500"
              >
                Send
              </button>
            </div>
          </div>
          {contextMenu.visible && (
            <div
              className="absolute bg-white shadow-md rounded-md p-2 dark:bg-gray-700"
              style={{
                top: `${contextMenu.position.y}px`,
                left: `${contextMenu.position.x}px`,
              }}
            >
              <button
                className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-200 dark:hover:bg-gray-600"
                onClick={handleDeleteMessage}
              >
                Delete
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Discussion;
